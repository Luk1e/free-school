import { styled } from "styled-components";
import { respondTo } from "../../../../utils/helpers/_respondTo";
import FormikControl from "../../../../components/formik/FormikControl";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  & > div:not(:first-child) {
    margin: 10px 0;

    /* color for error message */
    & div {
      color: var(--white);

      ${respondTo.mobile`
        color: var(--error);
      `};

      ${respondTo.smallTablet`
        color: var(--error);
      `};
    }
  }

  input {
    width: 300px;
    padding: 5px 20px;
    border: none;
    font-size: var(--small-m);
  }

  ${respondTo.mobile`
    input {
      width:100%;
      color: var(--magenta);
    }
  `}

  ${respondTo.smallTablet`
    input {
      width:200px;
      color: var(--magenta);
    }
  `}
`;

// Export classroom name input
function Input() {
  const { t } = useTranslation(["auth"]);
  return (
    <Container>
      <FormikControl
        control="input"
        type="text"
        label="name"
        name="name"
        placeholder={t("classroomsPage.classroom name")}
        required
      />
    </Container>
  );
}

export default Input;
