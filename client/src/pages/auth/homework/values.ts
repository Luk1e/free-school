import { z } from "zod";
import { DispatchType } from "../../../store/store";
import {
  submitSolution,
  gradeHomework,
} from "../../../toolkit/homework/homeworkActions";

export const gradeInitialValues = (initialGrade: number | undefined) => {
  return {
    grade: initialGrade ? initialGrade : 0,
  };
};

export const fileInitialValues = {
  file: undefined,
};

export const gradeValidationSchema = z.object({
  grade: z.number().min(0, "Grade is mandatory"),
});

const MAX_UPLOAD_SIZE = 1024 * 1024 * 100; // 100MB

export const fileValidationSchema = z.object({
  file: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 3MB"),
});

export type GradeFormValues = z.infer<typeof gradeValidationSchema>;
export type FileFormvalues = z.infer<typeof fileValidationSchema>;

interface GradeFormProps {
  values: {
    grade: number;
    idObject: {
      classroomId: string | undefined;
      homeworkId: string | undefined;
      studentId: string | null;
    };
  };

  dispatch: DispatchType;
}

export const onGradeSubmit = ({ values, dispatch }: GradeFormProps) => {
  dispatch(gradeHomework({ grade: values.grade, ...values.idObject }));
};

interface FileFormProps {
  values: {
    file: File | undefined;
    idObject: {
      classroomId: string | undefined;
      homeworkId: string | undefined;
    };
  };

  dispatch: DispatchType;
}

export const onFileSubmit = ({ values, dispatch }: FileFormProps) => {
  dispatch(submitSolution({ file: values.file, ...values.idObject }));
};
