import type { ContactPayload, ContactResult, ReservationPayload, ReservationResult } from "@/types";
import { simulateNetworkDelay } from "./shared/delay";

/**
 * MOCK: "submits" by resolving after a delay with a fake reference id.
 * The future Strapi version POSTs to `${STRAPI_URL}/api/reservations` with
 * `{ data: payload }` and keeps this exact signature — consumer code (the
 * RHF onSubmit handler) does not change.
 */
export async function submitReservation(payload: ReservationPayload): Promise<ReservationResult> {
  await simulateNetworkDelay(600);
  const carRef = payload.carSlug.slice(0, 6).toUpperCase();
  return {
    success: true,
    referenceId: `RES-${carRef}-${Date.now().toString(36).toUpperCase()}`,
    submittedAt: new Date().toISOString(),
  };
}

/** MOCK: same pattern as `submitReservation`, targeting `${STRAPI_URL}/api/contact-submissions` later. */
export async function submitContactForm(payload: ContactPayload): Promise<ContactResult> {
  await simulateNetworkDelay(600);
  const subjectRef = payload.subject.replace(/\s+/g, "").slice(0, 6).toUpperCase();
  return {
    success: true,
    referenceId: `MSG-${subjectRef}-${Date.now().toString(36).toUpperCase()}`,
    submittedAt: new Date().toISOString(),
  };
}
