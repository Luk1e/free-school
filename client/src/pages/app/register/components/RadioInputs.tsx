import { styled } from "styled-components";
import { respondTo } from "../../../../utils/helpers/_respondTo";
import FormikControl from "../../../../components/formik/FormikControl";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const InnerContainer = styled.div`
  display: flex;

  input[type="radio"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
    display: none;
  }

  input[type="radio"]:checked + label {
    background-color: var(--magenta);
    color: var(--white);
  }
`;

const Label = styled.label`
  cursor: pointer;
  display: flex;
  width: 100%;
  padding: 5px 20px;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  font-size: var(--small-m);
  text-transform: capitalize;

  outline: none;
  border: none;
  border-color: transparent;

  background-color: whitesmoke;
  transition: all 0.1s ease-in-out;

  &:last-of-type {
    margin-left: 1rem;
  }

  &:hover {
    color: var(--white);
    background: transparent;
  }

  ${respondTo.mobile`
    background-color:var(--whiteWithOpacity);

    &:hover {
      color: var(--black);
    }
  `}

  ${respondTo.smallTablet`
    background-color:var(--whiteWithOpacity);

    &:hover {
      color: var(--black);
    }
  `}
`;

const ErrorContainer = styled.div``;

const ErrorText = styled.p`
  margin-left: 1rem;

  color: var(--red);
  font-size: var(--small-s);
  text-transform: capitalize;
`;

const Text = styled.p`
  text-align: center;
`;

// Export radio container
function RadioInputs({ formik, t }: any) {
  const radioOptions = [
    {
      key: "teacher",
      value: "teacher",
      label: (
        <>
          <Label htmlFor="teacher">
            <Text>{t("registerPage.teacher")}</Text>
          </Label>
        </>
      ),
    },
    {
      key: "student",
      value: "student",
      label: (
        <>
          <Label htmlFor="student">
            <Text>{t("registerPage.student")}</Text>
          </Label>
        </>
      ),
    },
  ];

  return (
    <Container>
      <InnerContainer>
        <FormikControl control="radio" name="status" options={radioOptions} />
      </InnerContainer>

      {/* display errors for radio inputs,
        There should not be errors
        css is not optimized for radio inputs
      */}
      <ErrorContainer>
        <ErrorText>{formik.errors["status"]}</ErrorText>
      </ErrorContainer>
    </Container>
  );
}

export default RadioInputs;
