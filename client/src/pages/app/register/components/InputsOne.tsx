import { styled } from "styled-components";
import { respondTo } from "../../../../utils/helpers/_respondTo";
import FormikControl from "../../../../components/formik/FormikControl";

const Container = styled.div`
  width: 350px;

  ${respondTo.mobile`
    width:300px;
  `};

  & > div {
    margin: 10px 0;

    /* color for error message */
    & div {
      color: var(--white);

      ${respondTo.mobile`
        color: var(--error);
      `};
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
function InputsOne({ t }: any) {
  return (
    <Container className="w3-animate-left">
      <FormikControl
        control="input"
        type="text"
        label="First Name"
        name="firstName"
        placeholder={t("registerPage.First Name")}
        required
      />

      <FormikControl
        control="input"
        type="text"
        label="Last Name"
        name="lastName"
        placeholder={t("registerPage.Last Name")}
        required
      />

      <FormikControl
        control="input"
        type="email"
        label="Email"
        name="email"
        placeholder={t("validation.email")}
        required
      />
    </Container>
  );
}

export default InputsOne;
