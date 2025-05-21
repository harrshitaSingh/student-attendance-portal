export interface signUpModel {
    name: string;
    email: string;
    password: string;
    phone: string;
    school: string;
    subjects: string[] | string;
    role: "TEACHER" | "ADMIN" | string;
  }
  