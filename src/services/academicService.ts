import { MockAPI } from "@/lib/mockData";
import type { Exam } from "@/types";

export const academicService = {
  async getExams(): Promise<Exam[]> {
    return MockAPI.academic.getExams();
  },
};
