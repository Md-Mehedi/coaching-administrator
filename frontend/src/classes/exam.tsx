export class Exam {
  id: number;
  name: string;
  programId: number; // Program
  resultDate: Date | null;
}
export class ExamSubject {
  id: number;
  exam: Exam;
  subjectId: number; // Subject
  syllabus: string;
}
export class ExamMark {
  id: number;
  examSubject: ExamSubject;
  examType: string;
  mark: number;
}
export class Result {
  id: number;
  examMark: ExamMark;
  studentId: number; // Student
  mark: number;
}

const examData: ExamMark[] = [
  {
    id: 1,
    examSubject: {
      id: 1,
      exam: {
        id: 1,
        name: "Final Model Test",
        programId: 2,
        resultDate: null,
      },
      subjectId: 1,
      syllabus: "apatoto kisui nai",
    },
    examType: "CQ",
    mark: 10,
  },
];
