import { z } from "zod";
import { DispatchType } from "../../../store/store";
import { register } from "../../../toolkit/auth/registerSlice";

export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  status: "student",
  password: "",
  confirmPassword: "",
};

export const validationSchema = (t: any) =>
  z
    .object({
      firstName: z
        .string()
        .regex(
          new RegExp(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/),
          t("validation.First name must contain only letters and numbers")
        )
        .min(1, "First name is required"),
      lastName: z
        .string()
        .regex(
          new RegExp(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/),
          t("validation.Last name must contain only letters and numbers")
        )
        .min(1, t("validation.Last name is required")),
      email: z
        .string()
        .email(t("validation.Invalid email format"))
        .min(1, t("validation.Email is required")),
      status: z.string().min(1, t("validation.Status is required")),
      password: z
        .string()
        .regex(
          new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
          t(
            "validation.Password must contain at least eight characters, at least one number and both lower and uppercase letters"
          )
        )
        .min(8, t("validation.Password is required")),
      confirmPassword: z
        .string()
        .min(1, t("validation.Confirm password is required")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("validation.Passwords don't match"),
      path: ["confirmPassword"], // path of error
    });

export type FormValues = z.infer<ReturnType<typeof validationSchema>>;

interface FormProps {
  values: {
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    password: string;
    confirmPassword: string;
  };

  dispatch: DispatchType;
}

export const onSubmit = ({ values, dispatch }: FormProps) => {
  const data = { ...values, status: null };
  const status = values.status == "student" ? 1 : 0;

  dispatch(register({ data, status }));
};
