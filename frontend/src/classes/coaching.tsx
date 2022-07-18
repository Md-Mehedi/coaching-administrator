import { Address } from "./person-info";

export class Coaching {
  id?: number;
  name?: string;
  email?: string;
  description?: string;
  address?: Address;
  contactNo?: number;
  registrationTime?: Date | null = null;
  whatsappNo?: string;
  facebookLink?: string;
  youtubeLink?: string;
  image?: string;
}
