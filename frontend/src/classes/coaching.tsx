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

export class Program {
  id?: number;
  name?: string;
  coaching?: Coaching;
  description?: string;
  startDate?: Date;
  endDate?: Date;
}
export class Subject {
  id?: number;
  name?: string;
  openingDate?: Date;
  coaching?: Coaching;
}
export class Room {
  id?: number;
  name?: string;
  studentCapacity?: number;
  coaching?: Coaching;
}
export class Batch {
  id?: number;
  name?: string;
  monthlyFees?: number;
  program?: Program;
  subject?: Subject;
}
