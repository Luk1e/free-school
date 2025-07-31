import { z } from "zod";
import { DispatchType } from "../../../store/store";
import { createClassroom } from "../../../toolkit/classroom/createSlice";
import { enrollClassroom } from "../../../toolkit/classroom/enrollSlice";

export const initialValues = {
  name: "",
};

export const validationSchema = z.object({
  name: z.string(),
});

export type FormValues = z.infer<typeof validationSchema>;

interface FormProps {
  values: { name: string };
  status: number;
  dispatch: DispatchType;
}

export const onSubmit = ({ values, status, dispatch }: FormProps) => {
  // create classroom if status is 0 else enroll student in the classroom
  status === 0
    ? dispatch(createClassroom(values))
    : dispatch(enrollClassroom(values));
};
