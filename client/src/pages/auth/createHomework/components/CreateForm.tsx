import { Formik, Form } from "formik";
import ErrorSVG from "../../../../static/svg/ErrorSVG";
import { useEffect } from "react";
import styled from "styled-components";
import Inputs from "./Inputs";
import Button from "./Button";
import {
  initialValues,
  validationSchema,
  onSubmit,
  FormValues,
} from "../values";
import { useNavigate, useParams } from "react-router-dom";
import { respondTo } from "../../../../utils/helpers/_respondTo";
import { ZodError } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, StateType } from "../../../../store/store";
import { reset } from "../../../../toolkit/homework/createSlice";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(240, 46, 170, 0.4) -5px 5px,
    rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px,
    rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px;

  padding: 20px 30px;
  background-color: var(--primary);

  ${respondTo.mobile`
    border:none;
    box-shadow: none;
    background:transparent;
  `};
`;

const HeaderText = styled.h2`
  display: flex;
  text-align: center;
  align-items: center;
  padding: 0;
  margin: 0;
  margin-bottom: 20px;
  justify-content: center;

  color: var(--white);
  font-size: 35px;

  ${respondTo.mobile`
    color: var(--magenta);
  `}
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  color: var(--white);
  font-size: var(--small-m);

  ${respondTo.mobile`
    width:300px;
    color: var(--error);

    & svg{
      stroke: var(--error);
    }
  `};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  margin-bottom: 0.1rem;
`;

function CreateForm() {
  const navigate = useNavigate();
  const dispatch: DispatchType = useDispatch();
  const { id } = useParams();
  const { t } = useTranslation("auth");

  const { isLoading, homeworkId, error } = useSelector(
    (state: StateType) => state.createHomework
  );

  useEffect(() => {
    if (homeworkId) {
      navigate(`/classroom/${id}`, { replace: true });
    }
    return () => {
      dispatch(reset());
    };
  }, [homeworkId]);

  const validateForm = (values: FormValues) => {
    try {
      validationSchema(t).parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  return (
    <Container className="w3-animate-left">
      <Formik
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={(values) => onSubmit({ classroomId: id, values, dispatch })}
      >
        {(formik) => {
          return (
            <Form className="w3-animate-left">
              <HeaderText> {t("global.Homework")}</HeaderText>
              {/* Display error message */}
              {error && !isLoading && (
                <ErrorContainer>
                  <IconContainer>
                    <ErrorSVG />
                  </IconContainer>
                  {error}
                </ErrorContainer>
              )}
              <Inputs formik={formik} />
              <Button isLoading={isLoading} />
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}

export default CreateForm;
