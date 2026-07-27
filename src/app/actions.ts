"use server";

import { createServerSupabase, createAdminSupabase } from "@/lib/supabase/server";

export type EventInfo = {
  max: number;
  registered: number;
  remaining: number;
  deadline: string | null;
  isActive: boolean;
};

export type ActionResult = {
  success?: boolean;
  error?: string;
};

export async function registerForEvent(
  eventSlug: string,
  formData: FormData
): Promise<ActionResult> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const note = formData.get("note") as string;

  // Validate required fields
  if (!name || !email) {
    return { error: "姓名與 Email 為必填欄位" };
  }

  if (!email.includes("@")) {
    return { error: "請輸入有效的 Email 地址" };
  }

  try {
    // Use admin client (bypasses RLS) for registration checks and writes
    const admin = await createAdminSupabase();

    // Check if event exists and is active (events table is public-read, use admin for consistency)
    const { data: event, error: eventError } = await admin
      .from("events")
      .select("*")
      .eq("slug", eventSlug)
      .single();

    if (eventError || !event) {
      return { error: "找不到該活動" };
    }

    if (!event.is_active) {
      return { error: "該活動目前已停止報名" };
    }

    // Check registration deadline
    if (event.registration_deadline) {
      const deadline = new Date(event.registration_deadline);
      if (deadline < new Date()) {
        return { error: "報名已截止" };
      }
    }

    // Check remaining capacity (admin client - bypasses RLS, no SELECT policy needed for anon)
    const { count: registeredCount, error: countError } = await admin
      .from("event_registrations")
      .select("*", { count: "exact", head: true })
      .eq("event_slug", eventSlug)
      .neq("status", "cancelled");

    if (!countError && registeredCount !== null && registeredCount >= event.max_participants) {
      return { error: "此活動已額滿，無法報名" };
    }

    // Check for duplicate registration (admin client)
    const { data: existing } = await admin
      .from("event_registrations")
      .select("id")
      .eq("event_slug", eventSlug)
      .eq("email", email)
      .neq("status", "cancelled")
      .maybeSingle();

    if (existing) {
      return { error: "此 Email 已報名此活動，請勿重複報名" };
    }

    // Insert registration (admin client)
    const { error: insertError } = await admin
      .from("event_registrations")
      .insert({
        event_slug: eventSlug,
        name,
        email,
        phone: phone || null,
        note: note || null,
        status: "confirmed",
      });

    if (insertError) {
      if (insertError.code === "23505") {
        return { error: "此 Email 已報名此活動，請勿重複報名" };
      }
      return { error: "報名失敗，請稍後再試" };
    }

    return { success: true };
  } catch {
    return { error: "系統錯誤，請稍後再試" };
  }
}

export async function getEventInfo(
  eventSlug: string
): Promise<EventInfo | null> {
  try {
    // Use admin client to bypass RLS for capacity calculation
    const admin = await createAdminSupabase();

    const { data: event, error: eventError } = await admin
      .from("events")
      .select("*")
      .eq("slug", eventSlug)
      .single();

    if (eventError || !event) return null;

    const { count: registeredCount, error: countError } = await admin
      .from("event_registrations")
      .select("*", { count: "exact", head: true })
      .eq("event_slug", eventSlug)
      .neq("status", "cancelled");

    const registered = countError ? 0 : (registeredCount ?? 0);
    const remaining = Math.max(0, event.max_participants - registered);

    return {
      max: event.max_participants,
      registered,
      remaining,
      deadline: event.registration_deadline,
      isActive: event.is_active,
    };
  } catch {
    return null;
  }
}

export async function submitContact(formData: FormData): Promise<ActionResult> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  // Validate required fields
  if (!name || !email || !message) {
    return { error: "姓名、Email 與訊息為必填欄位" };
  }

  if (!email.includes("@")) {
    return { error: "請輸入有效的 Email 地址" };
  }

  try {
    // contact_messages uses public INSERT policy - anon key is sufficient
    const supabase = await createServerSupabase();

    const { error: insertError } = await supabase
      .from("contact_messages")
      .insert({
        name,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
      });

    if (insertError) {
      return { error: "訊息送出失敗，請稍後再試" };
    }

    return { success: true };
  } catch {
    return { error: "系統錯誤，請稍後再試" };
  }
}
