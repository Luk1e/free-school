import { z } from "zod";
import { DispatchType } from "../../../store/store";
import { createHomework } from "../../../toolkit/homework/createSlice";

export const initialValues = {
  title: "",
  instruction: "",
  totalGrade: 0,
  file: undefined,
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
  values: {
    title: string;
    instruction: string;
    totalGrade: number;
    file: File | undefined;
  };
  dispatch: DispatchType;
}

export const onSubmit = ({ classroomId, values, dispatch }: FormProps) => {
  dispatch(createHomework({ ...values, classroomId }));
};
