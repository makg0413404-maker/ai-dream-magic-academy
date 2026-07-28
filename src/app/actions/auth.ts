"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password || !name) {
    return { error: "所有欄位皆為必填" };
  }
  if (password.length < 6) {
    return { error: "密碼長度至少 6 個字元" };
  }

  try {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    if (error) return { error: error.message };
    return { success: true };
  } catch {
    return { error: "註冊失敗，請稍後再試" };
  }
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "請輸入 Email 與密碼" };
  }

  try {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "登入失敗，請稍後再試" };
  }
}

export async function signOut() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
}

export async function getSession() {
  const supabase = await createServerSupabase();
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getCurrentUser() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getProfile() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return data;
}

export async function updateProfile(formData: FormData) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "未登入" };

  const displayName = formData.get("display_name") as string;
  const phone = formData.get("phone") as string;
  const bio = formData.get("bio") as string;

  const { error } = await supabase
    .from("profiles")
    .update({ display_name: displayName, phone, bio })
    .eq("id", user.id);

  if (error) return { error: "更新失敗" };
  revalidatePath("/member/profile", "page");
  return { success: true };
}

export async function resetPassword(formData: FormData) {
  const email = formData.get("email") as string;
  if (!email) return { error: "請輸入 Email" };
  try {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/auth/callback",
    });
    if (error) return { error: error.message };
    return { success: true };
  } catch {
    return { error: "請稍後再試" };
  }
}
