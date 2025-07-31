import { Formik, Form } from "formik";
import ErrorSVG from "../../../../static/svg/ErrorSVG";
import { useEffect } from "react";
import styled from "styled-components";
import Inputs from "./Inputs";
import Buttons from "./Buttons";
import {
  initialValues,
  validationSchema,
  onSubmit,
  FormValues,
} from "../values";
import { useNavigate } from "react-router-dom";
import { respondTo } from "../../../../utils/helpers/_respondTo";
import { ZodError } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, StateType } from "../../../../store/store";
import { reset } from "../../../../toolkit/auth/loginSlice";
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

// Export login component
function LoginForm() {
  const navigate = useNavigate();
  const dispatch: DispatchType = useDispatch();
  const { t } = useTranslation(["app"]);

  const { isLoading, error } = useSelector((state: StateType) => state.login);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

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
        onSubmit={(values) => onSubmit({ values, t, dispatch })}
      >
        {() => {
          return (
            <Form className="w3-animate-left">
              <HeaderText>FreeSchool</HeaderText>

              {/* Display login error */}
              {error && !isLoading && (
                <ErrorContainer>
                  <IconContainer>
                    <ErrorSVG />
                  </IconContainer>
                  {error}
                </ErrorContainer>
              )}
              <Inputs />
              <Buttons navigate={navigate} isLoading={isLoading} />
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}

export default LoginForm;
