import { styled } from "styled-components";
import { respondTo } from "../../../../utils/helpers/_respondTo";
import FormikControl from "../../../../components/formik/FormikControl";
import { useState } from "react";
import { AttachFileSVG } from "../../../../static/svg";
import FileInput from "./FileInput";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  width: 350px;

  & > div {
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

  input,
  textarea {
    width: 350px;
    padding: 5px 10px;
    font-size: var(--small-m);

    &[type="number"] {
      width: 90px;
      display: flex;
      text-align: center;
      padding: 5px 10px;
    }
  }

  ${respondTo.mobile`
    width: 300px;

    input,textarea {
      width: 300px;

      color: var(--magenta);
    }
  `};
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FileButtonContainer = styled.div`
  display: flex;
`;

const FileButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px 10px;

  color: var(--white);
  font-size: var(--small-m);
  text-transform: capitalize;

  border: none;
  background-color: var(--secondary);
  transition: all 0.4s ease 0s;
  border-radius: 99px;

  svg {
    transition: all 0.4s ease 0s;
    fill: var(--white);
  }

  ${respondTo.desktop`
    &:hover{
      background-color: var(--secondaryWithOpacity);
      svg {
        fill: var(--whiteWithOpacity);
      }
    }
  `}

  ${respondTo.tv`
    &:hover{
      background-color: var(--secondaryWithOpacity);
      svg {
        fill: var(--whiteWithOpacity);
      }
    }
  `}
`;

function Inputs({ formik }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("auth");
  return (
    <Container>
      <FormikControl
        control="input"
        type="string"
        label="title"
        name="title"
        placeholder={t("validation.title...")}
        required
      />

      <FormikControl
        control="textarea"
        type="string"
        label="instruction"
        name="instruction"
        rows="3"
        placeholder={t("validation.instruction...")}
        required
      />

      <InputContainer>
        <FormikControl
          control="input"
          type="number"
          label="totalGrade"
          name="totalGrade"
          placeholder={t("validation.points")}
          required
        />

        <FileButtonContainer onClick={() => setIsOpen(!isOpen)}>
          <FileButton type="button">
            <AttachFileSVG />
          </FileButton>
        </FileButtonContainer>
      </InputContainer>

      {isOpen && <FileInput formik={formik} />}
    </Container>
  );
}

export default Inputs;
