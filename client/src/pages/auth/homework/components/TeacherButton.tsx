import styled from "styled-components";
import { Formik, Form } from "formik";
import { FormikControl } from "../../../../components";
import {
  gradeInitialValues,
  GradeFormValues,
  gradeValidationSchema,
  onGradeSubmit,
} from "../values";
import { ZodError } from "zod";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../../../store/store";
import { respondTo } from "../../../../utils/helpers/_respondTo";
import { HomeworkType } from "../../../../toolkit/homework/homeworkSlice";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  form {
    width: 100%;
    display: flex;

    div {
      width: max-content;

      &:last-child {
        display: none;
      }
    }

    input {
      width: 40px;
      padding-left: 10px;
      font-size: var(--small-m);
      text-align: end;
      background: transparent;
    }
  }
`;

const Label = styled.p`
  margin: 10px 0;

  color: var(--primary);
  font-weight: 500;
  font-style: italic;
  font-size: var(--small-l);
  text-transform: capitalize;
`;

const InputContainer = styled.div`
  display: flex;
`;

const Text = styled.p`
  padding-left: 5px;
  font-size: var(--small-m);
`;

const Button = styled.button`
  cursor: pointer;
  padding: 5px 20px;

  border: none;
  border-radius: 0;
  background-color: var(--magenta);
  height: min-content;
  margin-left: auto;

  color: white;
  font-size: var(--small-m);
  transition: all 0.4s ease 0s;

  ${respondTo.desktop`
    &:hover{
      background-color: var(--magentaWithOpacity);
      color:var(--whiteWithOpacity);
    }
  `};

  ${respondTo.tv`
    &:hover{
      background-color: var(--magentaWithOpacity);

      color:var(--whiteWithOpacity);
    }
  `};

  &:disabled {
    color: var(--whiteWithOpacity);
    background-color: var(--magentaWithOpacity);
  }
`;

interface TeacherButtonProps {
  homework: HomeworkType;
  isLoading: boolean;
  idObject: {
    classroomId: string | undefined;
    homeworkId: string | undefined;
    studentId: string | null;
  };
}
function TeacherButton({ homework, idObject, isLoading }: TeacherButtonProps) {
  const dispatch: DispatchType = useDispatch();
  const { t } = useTranslation(["auth"]);

  const validateForm = (values: GradeFormValues) => {
    try {
      gradeValidationSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  return (
    <Container>
      <Label> {t("global.Grade")}</Label>

      <Formik
        initialValues={gradeInitialValues(homework?.grade)}
        validate={validateForm}
        onSubmit={(values) =>
          onGradeSubmit({
            values: { grade: values.grade, idObject },
            dispatch,
          })
        }
      >
        {() => {
          return (
            <Form>
              <InputContainer>
                <FormikControl
                  control="input"
                  type="number"
                  label="grade"
                  name="grade"
                  placeholder={"0"}
                  required
                />
                <Text>
                  {"  / "} {homework ? homework?.totalGrade : 0}
                </Text>
              </InputContainer>
              <Button disabled={isLoading}>{t("global.submit")}</Button>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}

export default TeacherButton;
