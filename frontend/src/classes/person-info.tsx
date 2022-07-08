export class Division {
  id: number;
  name: string;
}
export class District {
  id: number;
  name: string;
  division: Division;
}
export class Thana {
  id: number;
  name: string;
  district: District;
}
export class Address {
  id: number;
  village: string;
  thana: Thana;
}

export class Person {
  id: number | null;
  email: string;
  password: number;
  permanentAdrsId?: number;
  presentAdrsId?: number;
  fatherOcptnId?: number;
  motherOcptnId?: number;
  religionId?: number;
  fullName?: string;
  nickName?: string;
  gender?: string;
  fatherName?: string;
  motherName?: string;
  dateOfBirth?: Date | null = null;
  joiningDate?: Date | null = null;
  bloodGroup?: string;
  nationality?: string;
  personType?: string;
  activated?: string;
  image?: string[];
}
