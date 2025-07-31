import { styled } from "styled-components";
import { respondTo } from "../../../../utils/helpers/_respondTo";
import FormikControl from "../../../../components/formik/FormikControl";
import RadioInputs from "./RadioInputs";

const Container = styled.div`
  width: 350px;

  ${respondTo.mobile`
      width:300px;
  `};

  & > div {
    margin: 10px 0;

    /* color for error message */
    &:not(:first-child) {
      & div {
        color: var(--white);

        ${respondTo.mobile`
        color: var(--error);
      `};
      }
    }
  }

  input {
    width: 350px;
    padding: 5px 20px;

    font-size: var(--small-m);
  }

  ${respondTo.mobile`
    input {
      width:300px;
      color: var(--magenta);
    }
  `}
`;

// Export login inputs
function InputsTwo({ formik, t }: any) {
  return (
    <Container className="w3-animate-right">
      <RadioInputs formik={formik} t={t} />
      <FormikControl
        control="input"
        type="password"
        label="password"
        name="password"
        placeholder={t("validation.password")}
        required
      />

      <FormikControl
        control="input"
        type="password"
        label="confirmPassword"
        name="confirmPassword"
        placeholder={t("validation.Confirm Password")}
        required
      />
    </Container>
  );
}

export default InputsTwo;
