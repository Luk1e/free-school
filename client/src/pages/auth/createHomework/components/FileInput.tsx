import styled from "styled-components";
import { respondTo } from "../../../../utils/helpers/_respondTo";
import { useTranslation } from "react-i18next";

const Container = styled.div``;

const FileInputContainer = styled.div`
  input[type="file"] {
    display: none;
  }
`;

const FileLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px 0;
  color: var(--white);
  font-size: var(--small-m);
  transition: all 0.4s ease 0s;
  background-color: var(--secondary);

  ${respondTo.desktop`
    &:hover{
      color:var(--whiteWithOpacity);
      background-color: var(--secondaryWithOpacity);
    }
  `}

  ${respondTo.tv`
    &:hover{
      color:var(--whiteWithOpacity);
      background-color: var(--secondaryWithOpacity);
    }
  `}
`;

function FileInput({ formik }: any) {
  const { t } = useTranslation("auth");
  return (
    <Container className="w3-animate-left">
      <FileInputContainer>
        <FileLabel htmlFor="file">
          {formik.values.file?.name
            ? formik.values.file?.name
            : t("validation.Choose a file")}
        </FileLabel>
        <input
          id="file"
          type="file"
          onChange={(event) => {
            if (
              event.currentTarget.files &&
              event.currentTarget.files.length > 0
            ) {
              formik.setFieldValue("file", event.currentTarget.files[0]);
            }
          }}
        />
      </FileInputContainer>
    </Container>
  );
}

export default FileInput;
