import { styled } from "styled-components";
import { respondTo } from "../../../../utils/helpers/_respondTo";
import FormikControl from "../../../../components/formik/FormikControl";
import { useState } from "react";
import { AttachFileSVG } from "../../../../static/svg";
import FileInput from "./FileInput";
import { DispatchType } from "../../../../store/store";
import { removeHomeworkFile } from "../../../../toolkit/homework/getHomeworkSlice";
import downloadFile from "../../../../utils/helpers/downloadFile";
import { useDispatch } from "react-redux";
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

const FileDetails = styled.div`
  cursor: pointer;
  display: flex;
  margin: 8px 0;
  align-items: center;

  transition: all 0.4s ease 0s;
  background-color: var(--secondary);

  &:hover {
    background-color: var(--secondaryWithOpacity);
    & h4 {
      color: var(--whiteWithOpacity);
    }
  }
`;

const FileName = styled.h4`
  margin: 5px 10px;
  font-style: italic;
  color: var(--white);
  font-size: var(--small-m);
`;

const FileSize = styled.p`
  margin: 5px 10px;
  font-style: italic;
  color: var(--white);
  font-size: var(--small-m);
  margin-left: auto;
`;

const RemoveButton = styled.p`
  cursor: pointer;
  text-align: end;
  font-weight: 500;
  color: var(--white);
  font-size: var(--small-m);
  text-transform: capitalize;
  transition: all 0.4s ease 0s;

  &:hover {
    color: var(--whiteWithOpacity);
  }

  ${respondTo.mobile`
     color: var(--red);
  `}

  ${respondTo.smallTablet`
     color: var(--red);
  `}
`;

function Inputs({ formik, homework, idObject }: any) {
  const dispatch: DispatchType = useDispatch();
  const { t } = useTranslation(["auth"]);

  const [isOpen, setIsOpen] = useState(false);
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

      {homework && homework.homeworkFile && (
        <FileDetails
          className="w3-animate-left"
          onClick={() =>
            downloadFile(
              homework.homeworkFile?.downloadUrl,
              homework.homeworkFile?.name
            )
          }
        >
          <FileName>{homework.homeworkFile?.name}</FileName>
          <FileSize>
            {(homework.homeworkFile?.size &&
              (homework.homeworkFile?.size < 1024 * 1024
                ? (homework.homeworkFile?.size * 0.001).toFixed(2) + " KB"
                : (homework.homeworkFile?.size * 0.000001).toFixed(2) +
                  " MB")) ||
              "Unknown"}
          </FileSize>
        </FileDetails>
      )}
      <InputContainer>
        <FormikControl
          control="input"
          type="number"
          label="totalGrade"
          name="totalGrade"
          placeholder={t("validation.points")}
          required
        />

        {homework && homework.homeworkFile && (
          <RemoveButton onClick={() => dispatch(removeHomeworkFile(idObject))}>
            {t("validation.remove")}
          </RemoveButton>
        )}

        {homework && !homework.homeworkFile && (
          <FileButtonContainer onClick={() => setIsOpen(!isOpen)}>
            <FileButton type="button">
              <AttachFileSVG />
            </FileButton>
          </FileButtonContainer>
        )}
      </InputContainer>

      {homework && !homework.homeworkFile && isOpen && (
        <FileInput formik={formik} />
      )}
    </Container>
  );
}

export default Inputs;
