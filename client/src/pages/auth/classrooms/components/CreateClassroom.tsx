import styled from "styled-components";
import { respondTo } from "../../../../utils/helpers/_respondTo";
import { useState } from "react";
import { Formik, Form } from "formik";
import { ZodError } from "zod";
import { DispatchType, StateType } from "../../../../store/store";
import {
  initialValues,
  validationSchema,
  FormValues,
  onSubmit,
} from "../values";
import { useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../../../toolkit/classroom/createSlice";
import { ErrorSVG } from "../../../../static/svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  width: 100%;
  display: flex;

  ${respondTo.mobile`
    flex-direction: column;
  `};

  ${respondTo.smallTablet`
    flex-direction: column;
  `};

  ${respondTo.tablet`
    flex-direction: column;
  `};
`;

const InnerContainer = styled.div`
  display: flex;
  width: max-content;
  max-width: 100%;
  padding: 10px;

  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  form {
    display: flex;
    gap: 20px;
  }

  ${respondTo.tablet`
    flex-direction: column;
    gap:20px;
  `}

  ${respondTo.smallTablet`
    flex-direction: column;
    gap:20px;
  `}

  ${respondTo.mobile`
    flex-direction: column;
    gap:20px;
  `}
`;

const HeaderText = styled.h3`
  cursor: pointer;
  width: fit-content;
  font-weight: normal;

  color: var(--white);
  padding: 5px 20px;
  text-transform: capitalize;

  font-size: var(--small-m);
  background-color: var(--magenta);
  transition: all 0.4s ease 0s;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  &:hover {
    color: var(--whiteWithOpacity);
    background-color: var(--primaryWithOpacity);
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  color: var(--error);
  & svg {
    stroke: var(--error);
  }
  font-size: var(--small-m);

  width: 400px;

  ${respondTo.mobile`
    width:300px;
  `};

  ${respondTo.smallTablet`
    width:300px;
  `};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  margin-bottom: 0.1rem;
`;

function CreateClassroom() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch: DispatchType = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation(["auth"]);
  const { isLoading, error, success } = useSelector(
    (state: StateType) => state.createClassroom
  );

  useEffect(() => {
    if (success) {
      navigate(`/classroom/${success}`);
    }
    return () => {
      dispatch(reset());
    };
  }, [success]);

  const validateForm = (values: FormValues) => {
    try {
      validationSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  return (
    <Container className="w3-animate-left">
      {!isOpen ? (
        <HeaderText onClick={() => setIsOpen(!isOpen)}>
          {t("classroomsPage.create classroom")}
        </HeaderText>
      ) : (
        <InnerContainer>
          <Formik
            initialValues={initialValues}
            validate={validateForm}
            onSubmit={(values) => onSubmit({ values, status: 0, dispatch })}
          >
            {() => {
              return (
                <Form className="w3-animate-left">
                  <Input />
                  <Button isLoading={isLoading} text={t("global.create")} />
                </Form>
              );
            }}
          </Formik>
        </InnerContainer>
      )}
      {/* Display login error */}
      {error && !isLoading && (
        <ErrorContainer className="w3-animate-right">
          <IconContainer>
            <ErrorSVG />
          </IconContainer>
          {error}
        </ErrorContainer>
      )}
    </Container>
  );
}

export default CreateClassroom;
