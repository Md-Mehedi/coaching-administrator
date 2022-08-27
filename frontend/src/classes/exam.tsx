import { Program, Subject } from "./coaching";
import { Student } from "./person-info";

export class Exam {
  id?: number;
  name?: string;
  program?: Program; // Program
  resultDate?: Date | null;
  examSubjects?: ExamSubject[];
  constructor() {
    let subject = new ExamSubject();
    this.examSubjects = [];
    this.examSubjects.push(subject);
  }
}
export class ExamSubject {
  id?: number;
  description?: string;
  subject?: Subject;
  examMarks?: ExamMark[];
  constructor() {
    let mark = new ExamMark();
    this.examMarks = [];
    this.examMarks.push(mark);
  }
}
export class ExamMark {
  id?: number;
  examType?: string;
  examSubjectMark?: number;
  // examSubject: ExamSubject;
  // resultList: Result[];
}
export class Result {
  id?: number;
  obtainedMark?: number;
  highestMark?: number;
  examMark?: ExamMark;
  student?: Student;
}

// const examData: ExamMark[] = [
//   {
//     id: 1,
//     examSubject: {
//       id: 1,
//       exam: {
//         id: 1,
//         name: "Final Model Test",
//         programId: 2,
//         resultDate: null,
//       },
//       subjectId: 1,
//       syllabus: "apatoto kisui nai",
//     },
//     examType: "CQ",
//     mark: 10,
//   },
// ];
