export interface ReservationPayload {
  carId: string;
  carSlug: string;
  fullName: string;
  email: string;
  phone: string;
  preferredContactMethod: "email" | "phone" | "whatsapp";
  message?: string;
  financingInterest: boolean;
  tradeInInterest: boolean;
  preferredVisitDate?: string;
}

export interface ReservationResult {
  success: boolean;
  referenceId: string;
  submittedAt: string;
}

export interface ContactPayload {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactResult {
  success: boolean;
  referenceId: string;
  submittedAt: string;
}
