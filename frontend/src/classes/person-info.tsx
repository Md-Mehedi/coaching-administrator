import { API } from "../api";
import { Coaching } from "./coaching";

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
  district?: District;
}
export class Address {
  id: number;
  village: string = "";
  wardNo: string = "";
  upazila?: Upazila | null;
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
  id?: number;
  name?: string;
  type?: string;
  board?: Board | null;
}
export class QualificationExam {
  id?: number;
  name: string;
}
export class Department {
  id?: number;
  name?: string;
}
export class EduQualification {
  id?: number;
  qualificationExam?: QualificationExam;
  institution?: Institution;
  passingYear?: number;
  result?: number;
  department?: Department;
}
export class ContactType {
  id: number;
  name: string;
}
export class PersonContact {
  id?: number;
  contactType?: ContactType;
  number?: string;
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
  eduQualifications?: EduQualification[];
  contacts?: PersonContact[];
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
  image?: File;
  currentQualification?: EduQualification;
  constructor() {
    // this.contacts = [];
    // this.contacts.push({ contactType: "Personal" });
    // this.contacts.push({ contactType: "Father" });
    // this.contacts.push({ contactType: "Mother" });
    // this.eduQualifications = [];
    // this.eduQualifications.push({ exam: { name: "HSC" } });
    // this.eduQualifications.push({ exam: { name: "HSC" } });
  }
}
export class Admin {
  person_id: number;
  person?: Person = new Person();
  salary?: number;
}
export class Student {
  // person_id?: number;
  person?: Person = new Person();
  registrationNo?: number;
}
export class Teacher {
  // person_id?: number;
  person?: Person = new Person();
  salary?: string;
}
export function getGender(gender: string | undefined | null) {
  if (gender == "M") return "Male";
  if (gender == "F") return "Female";
  if (gender == "O") return "Other";
  return "";
}
