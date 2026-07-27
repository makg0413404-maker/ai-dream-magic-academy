# AI 圓夢魔法學院 · Sprint 3 Planning Report

> 文件版本：V1.0
> 製訂日期：2026 年 7 月 28 日
> Sprint：3/4
> 主題：Membership System MVP

---

## A. 系統架構

```
┌────────────────────────────────────────────────────────────┐
│                     Supabase Auth                          │
│  Email/Password Signup · Magic Link · OAuth (Google)       │
│  Session Management · Password Reset                       │
└─────────────────────┬──────────────────────────────────────┘
                      │
                      ▼
┌────────────────────────────────────────────────────────────┐
│               src/middleware.ts (Route Guard)               │
│  · Check session on every request                          │
│  · Redirect unauthenticated users to /auth/login           │
│  · Protect /member/* routes                                │
│  · Protect /api/* routes                                   │
└─────────────────────┬──────────────────────────────────────┘
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
┌──────────────────┐  ┌────────────────────────┐
│ Auth Pages       │  │ Member Pages           │
│ /auth/login     │  │ /member/dashboard      │
│ /auth/register  │  │ /member/profile        │
│ /auth/forgot-pw │  │ /member/registrations  │
│ /auth/callback  │  │ /member/gallery        │
└──────────────────┘  └────────────────────────┘
          │                       │
          └───────────┬───────────┘
                      ▼
┌────────────────────────────────────────────────────────────┐
│              Database (Supabase PostgreSQL)                │
│  profiles · memberships · user_roles                       │
│  event_registrations · gallery_items                       │
└────────────────────────────────────────────────────────────┘
```

---

## B. Database Schema

### 新增表格

```sql
-- =============================================
-- 1. Profiles (extends Supabase auth.users)
-- =============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  bio TEXT,
  membership_tier TEXT DEFAULT 'free' CHECK (membership_tier IN ('free', 'basic', 'premium')),
  membership_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =============================================
-- 2. user_roles (for future RBAC)
-- =============================================
CREATE TABLE user_roles (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('member', 'instructor', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);
```sql
-- =============================================
-- 3. media_items (unified media: images & YouTube videos)
-- =============================================
CREATE TABLE media_items (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'youtube')),
  -- For images: direct URL or Supabase Storage URL
  image_url TEXT,
  -- For YouTube: embed URL or video ID
  youtube_url TEXT,
  -- For both: thumbnail preview
  thumbnail_url TEXT,
  category TEXT DEFAULT 'uncategorized',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT media_has_content CHECK (
    (media_type = 'image' AND image_url IS NOT NULL) OR
    (media_type = 'youtube' AND youtube_url IS NOT NULL)
  )
);

-- =============================================
-- RLS Policies
-- =============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own profile only
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- User roles: users can read own roles
CREATE POLICY "Users can view own roles" ON user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Media: anyone can view published items, creator can manage own
CREATE POLICY "Anyone can view published media" ON media_items
  FOR SELECT USING (is_published = true);
CREATE POLICY "Users can manage own media" ON media_items
  FOR ALL USING (auth.uid() = user_id);
```

---

## C. API 規劃

### Server Actions (src/app/actions/auth.ts)

| Action | Method | 用途 | 需登入 |
|:-------|:------:|:-----|:------:|
| `signUp(email, password, name)` | Supabase Auth | 註冊新帳號 | ❌ |
| `signIn(email, password)` | Supabase Auth | 登入 | ❌ |
| `signOut()` | Supabase Auth | 登出 | ✅ |
| `getSession()` | Supabase Auth | 取得當前 session | ❌ |
| `getProfile()` | DB SELECT | 取得使用者 profile | ✅ |
| `updateProfile(data)` | DB UPDATE | 更新個人資料 | ✅ |
| `getUserRole()` | DB SELECT | 取得角色權限 | ✅ |

### Server Actions (src/app/actions/member.ts)

| Action | Method | 用途 | 需登入 |
|:-------|:------:|:-----|:------:|
| `getMyRegistrations()` | DB SELECT | 查詢我的報名記錄 | ✅ |
| `getMyGallery()` | DB SELECT | 查詢我的作品 | ✅ |
| `addMediaItem(data)` | DB INSERT | 新增作品（圖片/影片） | ✅ |
| `deleteMediaItem(id)` | DB DELETE | 刪除作品 | ✅ |

---

## D. UI 流程圖

```
訪客 (未登入)
  │
  ├── / → 首頁（公開）
  ├── /courses → 課程列表（公開，標示「會員限定」）
  ├── /events → 活動列表（公開，可報名）
  ├── /blog → 文章列表（公開）
  ├── /gallery → 作品藝廊（公開，僅看發表作品）
  │
  ├── /auth/login → 登入
  │     │
  │     └── 成功 → 導向 /member/dashboard
  │
  ├── /auth/register → 註冊
  │     │
  │     └── 成功 → 導向 /member/dashboard
  │
  └── /auth/forgot-password → 忘記密碼

會員 (已登入)
  │
  ├── /member/dashboard → 會員首頁（報名記錄、快速連結）
  ├── /member/profile → 個人資料編輯
  ├── /member/registrations → 我的報名（已報名活動）
  └── /member/gallery → 我的作品（上傳/管理）
```

### 登入流程

```
1. 訪客點「登入」
2. 輸入 Email + Password
3. Supabase Auth 驗證
4. 成功 → cookies 儲存 session → 導向 /member/dashboard
5. 失敗 → 顯示錯誤訊息
```

### 註冊流程

```
1. 訪客點「免費註冊」
2. 輸入 Name + Email + Password + Confirm Password
3. Supabase Auth 建立使用者
4. Database Trigger 自動建立 profile
5. 自動登入 → 導向 /member/dashboard
```

---

## E. 開發任務拆解

### Task 1：Supabase Auth 設定
- **目標**：啟用 Supabase Auth Email/Password 登入
- **內容**：在 Supabase Dashboard 啟用 Email auth、設定 Site URL、關閉「Confirm email」
- **驗收**：可以透過 API 註冊/登入
- **工時**：15min

### Task 2：Auth Server Actions
- **目標**：建立 src/app/actions/auth.ts
- **內容**：signUp / signIn / signOut / getSession / getProfile / updateProfile
- **驗收**：所有 Action 可正常呼叫
- **工時**：2h

### Task 3：Profile + Media Schema
- **目標**：在 Supabase SQL Editor 執行 Schema
- **內容**：profiles / user_roles / media_items + RLS + Trigger
- **驗收**：表格建立成功，新註冊自動建立 profile
- **工時**：15min

### Task 4：Middleware 路由守衛
- **目標**：建立 src/middleware.ts
- **內容**：檢查 session、保護 /member/* 路由、未登入導向 /auth/login
- **驗收**：未登入訪問 /member/* 時被 redirect
- **工時**：1h

### Task 5：登入頁面重構
- **目標**：修改 /auth/login/page.tsx
- **內容**：串接 signIn Server Action、顯示錯誤、成功導向
- **驗收**：Email+Password 可正常登入
- **工時**：1h

### Task 6：註冊頁面重構
- **目標**：修改 /auth/register/page.tsx
- **內容**：串接 signUp Server Action、表單驗證、成功自動登入
- **驗收**：註冊成功後自動建立 profile
- **工時**：1h

### Task 7：忘記密碼頁面
- **目標**：修改 /auth/forgot-password/page.tsx
- **內容**：串接 Supabase Auth resetPasswordForEmail
- **驗收**：輸入 Email 後收到密碼重設信
- **工時**：30min

### Task 8：會員 Dashboard
- **目標**：建立 /member/dashboard/page.tsx
- **內容**：顯示會員資訊、報名記錄摘要、快速連結
- **驗收**：已登入可看到個人資訊
- **工時**：2h

### Task 9：會員個人資料頁
- **目標**：建立 /member/profile/page.tsx
- **內容**：顯示/編輯 display_name、phone、bio、avatar
- **驗收**：可更新個人資料並儲存
- **工時**：1.5h

### Task 10：會員報名記錄頁
- **目標**：建立 /member/registrations/page.tsx
- **內容**：顯示已報名活動、取消報名
- **驗收**：顯示正確的報名記錄
- **工時**：1h

### Task 11：會員作品藝廊（圖片＋YouTube）
- **目標**：建立 /member/gallery/page.tsx
- **內容**：支援上傳圖片（URL）/嵌入 YouTube、分類、刪除
- **驗收**：可新增（圖片或影片）/刪除作品
- **工時**：2h

### Task 12：Navbar 登入/登出狀態
- **目標**：修改 Navbar 顯示登入狀態
- **內容**：已登入顯示會員名稱＋登出按鈕；未登入顯示登入/註冊
- **驗收**：登入/登出後 Navbar 正確切換
- **工時**：1h

### Task 13：最終 Build + Lint 驗證
- **目標**：確認全部正常
- **驗收**：0 errors, 0 warnings
- **工時**：15min

---

## F. 預估 Sprint 3 工期

| Task | 工時 | 相依性 |
|:----|:----:|:------:|
| T1: Supabase Auth 設定 | 15min | 無 |
| T2: Auth Server Actions | 2h | T1 |
| T3: Profile Schema | 15min | T1 |
| T4: Middleware | 1h | T2 |
| T5: 登入頁面 | 1h | T2 |
| T6: 註冊頁面 | 1h | T2 |
| T7: 忘記密碼 | 30min | T2 |
| T8: 會員 Dashboard | 2h | T2, T3 |
| T9: 個人資料頁 | 1.5h | T2, T3 |
| T10: 報名記錄頁 | 1h | T2, T3 |
| T11: 作品藝廊 | 2h | T2, T3 |
| T12: Navbar 狀態 | 1h | T2 |
| T13: Build + Lint | 15min | 全部 |
| **總計** | **13h 45min** | — |

---

## G. 風險分析

| 風險 | 等級 | 影響 | 緩解方式 |
|:----|:----:|:-----|:---------|
| Supabase Auth email confirmation | 🟡 中 | 使用者註冊後無法登入 | 初期關閉「Confirm email」，上線前再開啟 |
| Service role key 錯誤 | 🟡 中 | Profile 無法自動建立 | 已在 Sprint 2 設定完成 |
| Middleware cookie 處理 | 🟡 中 | SSG 頁面可能出現快閃登入狀態 | 使用 Supabase SSR helper 處理 cookie |
| 忘記密碼郵件送達率 | 🟢 低 | 使用者收不到重設信 | Supabase 預設使用 Resend，穩定度高 |
| Gallery 圖片上傳 | 🟢 低 | 需要儲存空間 | MVP 階段用 URL 輸入代替檔案上傳 |

---

## H. 驗收標準（Acceptance Criteria）

| # | 項目 | PASS 條件 |
|:-:|:-----|:---------|
| 1 | 註冊 | 訪客可以填寫 Email + Password + 姓名完成註冊 |
| 2 | 自動建立 Profile | 註冊成功後 profiles 表自動產生對應記錄 |
| 3 | 登入 | 已註冊使用者可透過 Email + Password 登入 |
| 4 | 登出 | 已登入使用者可登出，session 清除 |
| 5 | 路由保護 | 未登入訪問 /member/* 時自動導向 /auth/login |
| 6 | 會員 Dashboard | 已登入可看到個人資訊和報名記錄 |
| 7 | 個人資料編輯 | 可更新 display_name、phone 並儲存 |
| 8 | 報名記錄 | 顯示當前使用者已報名的活動清單 |
| 9 | 作品藝廊 | 可新增圖片或 YouTube 作品，並檢視自己的作品列表 |
| 10 | Navbar | 已登入顯示姓名/登出，未登入顯示登入/註冊 |
| 11 | Build | npm run build 0 errors |
| 12 | Lint | npm run lint 0 errors |

---

## CTO 建議

### 執行順序

```
Day 1:  T1(15min) → T3(15min) → T2(2h) → T4(1h) 
Day 2:  T5(1h) → T6(1h) → T7(30min) → T12(1h)
Day 3:  T8(2h) → T9(1.5h) → T10(1h) → T11(2h)
Day 4:  T13(15min) → E2E 測試 → 修正 bug
```

### 不包含在本 Sprint 的項目

- ❌ 第三方 OAuth（Google/Facebook/LINE）— 留待 Sprint 4
- ❌ 會員分級付費（basic/premium）— 未來擴充
- ❌ 金流串接 — 未來擴充
- ❌ 課程權限鎖定（訪客 vs 會員）— 需等課程模組完成
- ❌ 管理後台 — Sprint 4 或之後
