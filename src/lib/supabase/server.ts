import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createServerSupabase() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component render context: Next.js forbids writing cookies
            // outside a Server Action / Route Handler. This is expected and
            // safe — session refresh/cookie writing is handled by middleware
            // (src/middleware.ts) on the next request. Only reading is allowed
            // here, and reading never throws, so we simply drop the write.
          }
        },
      },
    }
  );
}

/**
 * Server-only Supabase client using service_role key.
 * Can bypass RLS. Only use in Server Actions / Route Handlers.
 * NEVER expose to client-side code.
 */
export async function createAdminSupabase() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {
          // Admin client doesn't set cookies
        },
      },
    }
  );
}
