import styled from "styled-components";
import { respondTo } from "../../../utils/helpers/_respondTo";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DispatchType, StateType } from "../../../store/store";
import { Loader } from "../../../components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getStudentHomework,
  reset,
} from "../../../toolkit/homework/homeworkSlice";
import { TeacherButton, StudentButton } from "./components";
import downloadFile from "../../../utils/helpers/downloadFile";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  width: 90%;
  display: flex;
  margin: 10vh 0;
  flex-grow: 1;
  max-width: 1400px;
  flex-direction: column;

  ${respondTo.mobile`
    padding: 50px 0;
  `};

  ${respondTo.tablet`
    width: 80%;
  `};

  ${respondTo.laptop`
    width: 80%;
  `};

  ${respondTo.desktop`
    width: 70%;
  `};

  ${respondTo.tv`
    width: 60%;
  `};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: center;
`;

const TitleText = styled.h3`
  color: var(--black);
  font-weight: 500;
  padding: 0 !important;
  margin: 0 !important;
  font-size: var(--medium-s);
  text-transform: capitalize;
`;

const StatusText = styled.p`
  color: var(--primary);
  font-weight: 500;
  font-size: var(--small-m);
  text-transform: capitalize;
  margin-left: auto;
`;

const Label = styled.p`
  font-style: italic;
  color: var(--primary);
  font-size: var(--small-l);
  text-transform: capitalize;

  &:first-of-type {
    margin-top: 10px;
  }
`;

const Text = styled.p`
  margin: 10px;
  font-size: var(--small-m);
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
  margin: 10px;
  padding-left: 10px;

  font-weight: 500;
  font-style: italic;
  color: var(--white);
  font-size: var(--small-m);
`;

const FileSize = styled.p`
  margin: 10px;
  font-weight: 500;
  margin-left: auto;

  font-style: italic;
  color: var(--white);
  font-size: var(--small-m);
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorText = styled.div`
  margin: 20px 10px;
  font-style: italic;
  color: var(--black);
  font-size: var(--small-m);
`;

function HomeworkPage() {
  const { id, homeworkId } = useParams();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation(["auth"]);

  const dispatch: DispatchType = useDispatch();
  const { user } = useSelector((state: StateType) => state.authentication);

  const { isLoading, homework, success, error } = useSelector(
    (state: StateType) => state.homework
  );

  useEffect(() => {
    dispatch(
      getStudentHomework({
        classroomId: id,
        homeworkId: homeworkId,
        studentId: user?.status === "TEACHER" ? searchParams.get("id") : "0",
      })
    );

    return () => {
      dispatch(reset());
    };
  }, [success]);

  return (
    <Container>
      {isLoading && <Loader color="darkmagenta" />}

      {!isLoading && (
        <TitleContainer className="w3-animate-left">
          <TitleText>{homework?.title}</TitleText>
          <StatusText>{homework ? homework.status : "Status"}</StatusText>
        </TitleContainer>
      )}

      {!isLoading && !error && homework && (
        <InnerContainer className="w3-animate-left">
          <Label> {t("homeworkPage.instruction")}</Label>
          <Text>{homework.instruction}</Text>

          <Label> {t("homeworkPage.Task file")}</Label>
          {homework.homeworkFile ? (
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
          ) : (
            <ErrorText> {t("homeworkPage.File not uploaded")} </ErrorText>
          )}

          <Label> {t("homeworkPage.Solution file")}</Label>
          {homework.solutionFile && (
            <FileDetails
              className="w3-animate-left"
              onClick={() =>
                downloadFile(
                  homework.solutionFile?.downloadUrl,
                  homework.solutionFile?.name
                )
              }
            >
              <FileName>{homework.solutionFile?.name}</FileName>
              <FileSize>
                {(homework.solutionFile?.size &&
                  (homework.solutionFile?.size < 1024 * 1024
                    ? (homework.solutionFile?.size * 0.001).toFixed(2) + " KB"
                    : (homework.solutionFile?.size * 0.000001).toFixed(2) +
                      " MB")) ||
                  "Unknown"}
              </FileSize>
            </FileDetails>
          )}

          {!homework.solutionFile &&
            (homework.status === "GRADED" || user?.status === "TEACHER") && (
              <ErrorText> {t("homeworkPage.File not uploaded")} </ErrorText>
            )}

          {user?.status === "TEACHER" ? (
            <TeacherButton
              isLoading={isLoading}
              homework={homework}
              idObject={{
                classroomId: id,
                homeworkId,
                studentId: searchParams.get("id"),
              }}
            />
          ) : (
            <StudentButton
              isLoading={isLoading}
              homework={homework}
              idObject={{
                classroomId: id,
                homeworkId,
              }}
            />
          )}
        </InnerContainer>
      )}
    </Container>
  );
}

export default HomeworkPage;
