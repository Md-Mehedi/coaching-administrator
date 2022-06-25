export interface IProgram {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  admissionFees: number;
}

export interface ISubject {
  id: number;
  name: string;
  openingDate: Date;
}
export interface IBatch {
  id: number;
  program?: IProgram;
  subject?: ISubject;
  name: string;
  monthlyFees?: number;
  studentCount: number;
  assignedTeachers: string[];
}
export const programs: IProgram[] = [
  {
    id: 1,
    name: "HSC-23",
    startDate: new Date(),
    endDate: new Date(),
    admissionFees: 300,
  },
  {
    id: 2,
    name: "HSC-22",
    startDate: new Date(),
    endDate: new Date(),
    admissionFees: 300,
  },
  {
    id: 3,
    name: "SSC-22",
    startDate: new Date(),
    endDate: new Date(),
    admissionFees: 250,
  },
  {
    id: 4,
    name: "SSC-23",
    startDate: new Date(),
    endDate: new Date(),
    admissionFees: 250,
  },
  {
    id: 5,
    name: "SSC-24",
    startDate: new Date(),
    endDate: new Date(),
    admissionFees: 250,
  },
];

export const subjects: ISubject[] = [
  {
    id: 1,
    name: "Physics",
    openingDate: new Date(),
  },
  {
    id: 2,
    name: "Chemistry",
    openingDate: new Date(),
  },
  {
    id: 3,
    name: "Math",
    openingDate: new Date(),
  },
  {
    id: 4,
    name: "Higher Math",
    openingDate: new Date(),
  },
  {
    id: 5,
    name: "Biology",
    openingDate: new Date(),
  },
  {
    id: 6,
    name: "ICT",
    openingDate: new Date(),
  },
];

export const teachers = [
  {
    id: 1,
    name: "Mehedi",
  },
  {
    id: 2,
    name: "Mijan",
  },
  {
    id: 3,
    name: "Lutfur",
  },
  {
    id: 4,
    name: "Ratul",
  },
  {
    id: 5,
    name: "Ali",
  },
];

export const rooms = [
  { id: 1, name: 101 },
  { id: 2, name: 102 },
  { id: 3, name: 103 },
  { id: 4, name: 201 },
  { id: 5, name: 202 },
  { id: 6, name: 203 },
];

export const batches: IBatch[] = [
  {
    id: 1,
    name: "12 Physics",
    studentCount: 10,
    assignedTeachers: ["Mehedi", "Ali"],
    program: programs[0],
    subject: subjects[0],
  },
  {
    id: 2,
    name: "11 Physics 1",
    studentCount: 26,
    assignedTeachers: ["Mehedi", "Ali"],
  },
  {
    id: 3,
    name: "11 Physics 2",
    studentCount: 22,
    assignedTeachers: ["Mehedi", "Ratul"],
  },
  {
    id: 4,
    name: "11 Chemistry",
    studentCount: 18,
    assignedTeachers: ["Mijan"],
  },
  {
    id: 5,
    name: "11 Biology",
    studentCount: 16,
    assignedTeachers: ["Ali"],
  },
  {
    id: 6,
    name: "11 ICT",
    studentCount: 17,
    assignedTeachers: ["Mijan"],
  },
  {
    id: 7,
    name: "10 Physics",
    studentCount: 30,
    assignedTeachers: ["Mehedi"],
  },
  {
    id: 8,
    name: "10 Chemistry",
    studentCount: 23,
    assignedTeachers: ["Mijan"],
  },
  {
    id: 9,
    name: "10 Biology",
    studentCount: 28,
    assignedTeachers: ["Mijan"],
  },
  {
    id: 10,
    name: "10 Math",
    studentCount: 7,
    assignedTeachers: ["Ratul"],
  },
  {
    id: 11,
    name: "9 Physics",
    studentCount: 31,
    assignedTeachers: ["Mehedi"],
  },
  {
    id: 12,
    name: "9 Chemistry",
    studentCount: 31,
    assignedTeachers: ["Mijan"],
  },
  {
    id: 13,
    name: "9 Biology",
    studentCount: 22,
    assignedTeachers: ["Ali"],
  },
  {
    id: 14,
    name: "9 Math",
    studentCount: 16,
    assignedTeachers: ["Ratul"],
  },
];

export const students = [
  {
    id: 1,
    fullName: "Rafin Hossain",
    nickname: "Rafin",
    gender: "Male",
    email: "rafin@gmail.com",
    fatherName: "Alom Hossain",
    motherName: "Maliha Begum",
    bloodGroup: "O+",
    fees: 1200,
  },
  {
    id: 2,
    fullName: "Zunayed Hasan",
    nickname: "Zunayed",
    gender: "Male",
    email: "zunayed@gmail.com",
    fatherName: "Alom Hossain",
    motherName: "Maliha Begum",
    bloodGroup: "O+",
    fees: 800,
  },
  {
    id: 3,
    fullName: "Akib Iqbal",
    nickname: "Akib",
    gender: "Male",
    email: "rafin@gmail.com",
    fatherName: "Alom Hossain",
    motherName: "Maliha Begum",
    bloodGroup: "O+",
    fees: 1200,
  },
  {
    id: 4,
    fullName: "Rakibul Islam",
    nickname: "Rakib",
    gender: "Male",
    email: "rafin@gmail.com",
    fatherName: "Alom Hossain",
    motherName: "Maliha Begum",
    bloodGroup: "O+",
    fees: 0,
  },
];

export const studentsHistory = [
  {
    student: students[0],
    history: [
      {
        startDate: new Date("2022/01/03"),
        endDate: new Date("2022/02/05"),
      },
      {
        startDate: new Date("2022/03/03"),
        endDate: new Date("2022/05/06"),
      },
    ],
  },
  {
    student: students[1],
    history: [
      {
        startDate: new Date("2022/01/03"),
        endDate: null,
      },
    ],
  },
  {
    student: students[2],
    history: [
      {
        startDate: new Date("2022/01/03"),
        endDate: null,
      },
    ],
  },
  {
    student: students[3],
    history: [
      {
        startDate: new Date("2022/01/03"),
        endDate: new Date("2022/02/05"),
      },
      {
        startDate: new Date("2022/03/03"),
        endDate: null,
      },
    ],
  },
];

export const examTypes = [
  { id: 1, name: "CQ" },
  { id: 2, name: "MCQ" },
  { id: 3, name: "Short Question" },
  { id: 4, name: "Other" },
];

export const exams = [
  {
    id: 1,
    name: "Chapter 1",
    syllabus: "Chapter 1 full. 10 CQ from test paper",
    resultDate: new Date("2022/06/28"),
    mark: [
      { examType: "CQ", mark: 30 },
      { examType: "MCQ", mark: 20 },
    ],
  },
  {
    id: 2,
    name: "Chapter 2",
    syllabus: "Chapter 2 full.",
    resultDate: new Date("2022/06/28"),
    mark: [
      { examType: "CQ", mark: 30 },
      { examType: "MCQ", mark: 20 },
    ],
  },
  {
    id: 3,
    name: "Chapter 3",
    syllabus: "Chapter 3 full. Solve MCQ from sheet",
    resultDate: new Date("2022/06/28"),
    mark: [{ examType: "MCQ", mark: 20 }],
  },
  {
    id: 4,
    name: "Chapter 4",
    syllabus: "Chapter 4 MCQ Test",
    resultDate: new Date("2022/06/28"),
    mark: [{ examType: "Short Question", mark: 20 }],
  },
  {
    id: 5,
    name: "Chapter 5",
    syllabus: "Chapter 5 full. 15 CQ from guide",
    resultDate: new Date("2022/06/28"),
    mark: [
      { examType: "CQ", mark: 30 },
      { examType: "Other", mark: 20 },
    ],
  },
];

export type PaymentType = {
  type: string;
  details: {
    id: number;
    name: string;
    amount: number;
  }[];
};

var a: string;
const b = 6;

a = "8";

export const payment: PaymentType[] = [
  {
    type: "Monthly fees",
    details: [
      { id: 1, name: "12 Physics Batch", amount: 800 },
      { id: 2, name: "12 Chemistry Batch", amount: 1200 },
      { id: 3, name: "12 Biology Batch", amount: 400 },
      { id: 4, name: "12 ICT Batch", amount: 600 },
    ],
  },
  {
    type: "Admission fees",
    details: [
      { id: 1, name: "HSC=23", amount: 800 },
      { id: 2, name: "Biology Booster 2023", amount: 1200 },
    ],
  },
  {
    type: "Sheet fees",
    details: [
      { id: 5, name: "Physics 1st Paper : Chapter 1", amount: 30 },
      { id: 6, name: "Physics 1st Paper : Chapter 2", amount: 40 },
      { id: 7, name: "Physics 1st Paper : Chapter 3", amount: 20 },
      { id: 8, name: "Physics 1st Paper : Chapter 4", amount: 50 },
      { id: 9, name: "Physics 1st Paper : Chapter 1", amount: 10 },
      { id: 10, name: "Physics 1st Paper : Chapter 2", amount: 20 },
      { id: 11, name: "Physics 1st Paper : Chapter 3", amount: 30 },
      { id: 12, name: "Physics 1st Paper : Chapter 4", amount: 40 },
    ],
  },
];
