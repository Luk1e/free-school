import styled from "styled-components";
import { Formik, Form } from "formik";
import FileInput from "./FileInput";

import {
  fileInitialValues,
  fileValidationSchema,
  FileFormvalues,
  onFileSubmit,
} from "../values";
import { ZodError } from "zod";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../../../store/store";
import { respondTo } from "../../../../utils/helpers/_respondTo";
import { HomeworkType } from "../../../../toolkit/homework/homeworkSlice";
import { removeSolution } from "../../../../toolkit/homework/homeworkActions";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;

    input {
      padding-left: 10px;
      background: transparent;
    }
  }
`;

const Text = styled.p``;

const Label = styled.p`
  margin: 10px 0;

  color: var(--primary);
  font-weight: 500;
  font-style: italic;
  font-size: var(--small-l);
  text-transform: capitalize;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  cursor: pointer;
  padding: 5px 20px;
  margin-left: auto;

  border: none;
  border-radius: 0;
  background-color: var(--magenta);

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

const RemoveButton = styled.p`
  cursor: pointer;
  text-align: end;
  font-weight: 500;
  color: var(--red);
  font-size: var(--small-m);
  text-transform: capitalize;
  transition: all 0.4s ease 0s;

  &:hover {
    color: var(--redWithOpacity);
  }
`;

interface StudentButtonProps {
  homework: HomeworkType;
  isLoading: boolean;
  idObject: {
    classroomId: string | undefined;
    homeworkId: string | undefined;
  };
}

function StudentButton({ homework, idObject, isLoading }: StudentButtonProps) {
  const dispatch: DispatchType = useDispatch();
  const { t } = useTranslation(["auth"]);

  const validateForm = (values: FileFormvalues) => {
    try {
      fileValidationSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };
  return (
    <Container>
      <Formik
        initialValues={fileInitialValues}
        validate={validateForm}
        onSubmit={(values) =>
          onFileSubmit({ values: { file: values.file, idObject }, dispatch })
        }
      >
        {(formik) => {
          return (
            <Form>
              {homework &&
                !homework.solutionFile &&
                homework.status !== "GRADED" && (
                  <FileInput
                    formik={formik}
                    isUploaded={homework?.homeworkFile}
                  />
                )}

              {homework && homework.solutionFile && (
                <RemoveButton
                  onClick={() => dispatch(removeSolution(idObject))}
                >
                  {t("validation.remove")}
                </RemoveButton>
              )}

              <Label> {t("global.Grade")}</Label>

              <ButtonContainer>
                <Text>
                  {homework && homework.grade + " / " + homework.totalGrade}
                </Text>
                {homework && homework.status !== "GRADED" && (
                  <Button disabled={isLoading}>{t("global.submit")}</Button>
                )}
              </ButtonContainer>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}

export default StudentButton;
