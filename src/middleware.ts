import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Middleware refreshes the Supabase auth session cookies on every request.
 *
 * This is the ONLY place that must write auth cookies for a plain (GET) render,
 * because Next.js forbids modifying cookies during a Server Component render
 * ("Cookies can only be modified in a Server Action or Route Handler").
 * Server Component clients must only READ cookies via getAll(); the refresh in
 * middleware writes them to the response on the next request.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;


  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
          // Responses that write auth cookies must not be cached by CDNs/proxies.
          Object.entries(headers).forEach(([key, value]) =>
            response.headers.set(key, value)
          );
        },
      },
    }
  );

  // Refresh the session token if it is close to expiring, and write the
  // refreshed cookies to the response (safe here: middleware is mutable).
  // getUser() is preferred over getSession() as it validates the token with
  // the auth server instead of trusting a possibly-expired token in cookies.
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // Allow static files and Next.js internals through early.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico"
  ) {
    return response;
  }

  // Guard protected /member/* routes.
  if (pathname.startsWith("/member") && (error || !user)) {
    const redirectUrl = new URL("/auth/login", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

