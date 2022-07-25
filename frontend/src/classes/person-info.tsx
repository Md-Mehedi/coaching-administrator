export class Division {
  id: number;
  name: string;
}
export class District {
  id: number;
  name: string;
  division: Division;
}
export class Upazila {
  id: number;
  name: string;
  district: District;
}
export class Address {
  id: number;
  village: string;
  upazila: Upazila | null;
}
export class Occupation {
  id: number;
  name: string;
}
export class Religion {
  id: number;
  name: string;
}
export class Board {
  id: number;
  name: string;
}
export class Institution {
  id: number;
  name: string;
  type: string;
  board: Board | null;
}
export class Coaching {
  id: number;
  name: string;
  email: string;
  description: string;
  address: Address;
  contactNo: string;
  registrationTime: Date;
  whatsappNo: Date;
  facebookLink: string;
  youtubeLink: string;
  image: string;
}
export class Person {
  id?: number | null;
  password?: number;
  permanentAddress?: Address;
  presentAddress?: Address;
  fatherOccupation?: Occupation;
  motherOccupation?: Occupation;
  religion?: Religion;
  coaching?: Coaching;
  fullName?: string;
  nickName?: string;
  gender?: string;
  email?: string;
  fatherName?: string;
  motherName?: string;
  dateOfBirth?: Date | null = null;
  joiningDate?: Date | null = null;
  bloodGroup?: string;
  nationality?: string;
  personType?: string;
  image?: string;
}
export class Admin {
  person_id: number;
  person?: Person = new Person();
  salary?: number;
}
export class Student {
  person_id?: number;
  person?: Person;
  registrationNo?: number;
  classNo?: number;
  classRollNo?: number;
  institution?: Institution;
}
export class Teacher {
  person_id?: number;
  person?: Person;
  salary?: string;
}
export function getGender(gender: string | undefined | null) {
  if (gender == "M") return "Male";
  if (gender == "F") return "Female";
  if (gender == "O") return "Other";
  return "";
}
