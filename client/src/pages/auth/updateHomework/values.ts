import { z } from "zod";
import { DispatchType } from "../../../store/store";
import { updateHomework } from "../../../toolkit/homework/getHomeworkSlice";
import { HomeworkType } from "../../../toolkit/homework/getHomeworkSlice";

interface InitialValuesProps {
  homework: HomeworkType;
}
export const initialValues = ({ homework }: InitialValuesProps) => {
  return {
    title: homework ? homework?.title : "",
    instruction: homework?.instruction ? homework?.instruction : "",
    totalGrade: homework?.totalGrade ? homework?.totalGrade : 0,
    file: undefined,
  };
};

const MAX_UPLOAD_SIZE = 1024 * 1024 * 100; // 100MB

export const validationSchema = (t: any) =>
  z.object({
    title: z.string().min(1, t("validation.Title is required")),
    instruction: z
      .string()
      .min(1, t("validation.Instruction is required"))
      .max(255, t("validation.Instruction must be at most 255 characters")),
    totalGrade: z.number().int(t("validation.Points is required")),
    file: z
      .instanceof(File)
      .optional()
      .refine((file) => {
        return !file || file.size <= MAX_UPLOAD_SIZE;
      }, t("validation.File size must be less than 3MB")),
  });

export type FormValues = z.infer<ReturnType<typeof validationSchema>>;

interface FormProps {
  classroomId: string | undefined;
  homeworkId: string | undefined;
  title: string;
  instruction: string;
  totalGrade: number;
  file: File | undefined;

  dispatch: DispatchType;
}

export const onSubmit = ({
  classroomId,
  title,
  instruction,
  totalGrade,
  file,
  homeworkId,
  dispatch,
}: FormProps) => {
  dispatch(
    updateHomework({
      title,
      instruction,
      totalGrade,
      file,
      classroomId,
      homeworkId,
    })
  );
};
