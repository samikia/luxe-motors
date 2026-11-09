import type { ContactPayload, ContactResult, ReservationPayload, ReservationResult } from "@/types";
import { strapiCreate } from "./shared/strapi-client";

export async function submitReservation(payload: ReservationPayload): Promise<ReservationResult> {
  const json = await strapiCreate<{ documentId: string }>("/api/reservations", payload);
  const carRef = payload.carSlug.slice(0, 6).toUpperCase();
  return {
    success: true,
    referenceId: `RES-${carRef}-${json.data!.documentId.slice(0, 8).toUpperCase()}`,
    submittedAt: new Date().toISOString(),
  };
}

export async function submitContactForm(payload: ContactPayload): Promise<ContactResult> {
  const json = await strapiCreate<{ documentId: string }>("/api/contact-submissions", payload);
  const subjectRef = payload.subject.replace(/\s+/g, "").slice(0, 6).toUpperCase();
  return {
    success: true,
    referenceId: `MSG-${subjectRef}-${json.data!.documentId.slice(0, 8).toUpperCase()}`,
    submittedAt: new Date().toISOString(),
  };
}
