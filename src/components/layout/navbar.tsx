import { getSession, getProfile } from "@/app/actions/auth";
import NavbarClient from "./navbar-client";

export async function Navbar() {
  const session = await getSession();
  let userName: string | undefined;
  if (session) {
    const profile = await getProfile();
    userName =
      (profile && (profile.display_name as string)) || session.user.email || undefined;
  }

  return (
    <NavbarClient
      isLoggedIn={Boolean(session)}
      userName={userName}
    />
  );
}
