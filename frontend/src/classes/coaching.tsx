import { Address, Person, Student, Teacher } from "./person-info";
import { DateSelectArg } from "@fullcalendar/react";

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
export class EnrolledProgram {
  id: number;
  enrolledDate?: Date;
  program?: Program;
  student?: Student;
  constructor(programId: number, studentId: number) {
    this.program = new Program();
    this.program.id = programId;
    this.student = new Student();
    this.student.person = new Person();
    this.student.person.id = studentId;
  }
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
  classTimes?: ClassTime[];
}
////////        Routine - attendance
export class Attendance {
  id?: number;
  classTaken?: ClassTaken;
  student?: Student;
}
export class ClassTaken {
  id?: number;
  date?: Date;
  classTime?: ClassTime;
}
export class ClassTime {
  id?: number;
  startDateTime?: Date | null;
  duration?: number; // in minute
  endDate?: Date;
  classType?: ClassType;
  day?: number;
  room?: Room;
  teacher?: Teacher;
  batch?: Batch;
  constructor(classTime?: ClassTime) {
    this.id = classTime?.id;
    this.startDateTime = classTime?.startDateTime
      ? new Date(classTime?.startDateTime)
      : undefined;
    this.duration = classTime?.duration;
    this.endDate = classTime?.endDate
      ? new Date(classTime?.endDate)
      : undefined;
    this.day = classTime?.day;
    this.room = classTime?.room;
    this.teacher = classTime?.teacher;
    this.batch = classTime?.batch;
  }
  // set(info: DateSelectArg) {
  //   this.startDateTime = new Date(info.startStr);
  //   let day1 = new Date(info.startStr);
  //   let day2 = new Date(info.endStr);
  //   this.duration = (day2.getTime() - day1.getTime()) / (1000 * 60);
  // }
}
export class ClassType {
  id?: number;
  type?: string;
}
