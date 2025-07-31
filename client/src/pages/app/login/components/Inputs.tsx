import { styled } from "styled-components";
import { respondTo } from "../../../../utils/helpers/_respondTo";
import FormikControl from "../../../../components/formik/FormikControl";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  width: 350px;
  min-width: 100%;
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
    min-width: 100%;

    font-size: var(--small-m);
  }

  ${respondTo.mobile`
    width: 300px;
    input {
      width: 300px;
      color: var(--magenta);
    }
  `};
`;

// Export login inputs
function Inputs() {
  const { t } = useTranslation(["app"]);
  return (
    <Container>
      <FormikControl
        control="input"
        type="email"
        label="email"
        name="email"
        placeholder={t("validation.email")}
        required
      />

      <FormikControl
        control="input"
        type="password"
        label="password"
        name="password"
        placeholder={t("validation.password")}
        required
      />
    </Container>
  );
}

export default Inputs;
