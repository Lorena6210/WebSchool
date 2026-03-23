import { useEffect, useState } from "react";
import type { Exam } from "@/types";
import { academicService } from "@/services";

export function useExams() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExams = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await academicService.getExams();
        setExams(data);
      } catch (err) {
        console.error("Erro ao carregar provas:", err);
        setError("Falha ao carregar provas.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExams();
  }, []);

  return {
    exams,
    isLoading,
    error,
  };
}
