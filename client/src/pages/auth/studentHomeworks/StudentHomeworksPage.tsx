import styled from "styled-components";
import { respondTo } from "../../../utils/helpers/_respondTo";
import { useParams } from "react-router-dom";
import { Homework, NavBar } from "./components";
import { useSelector } from "react-redux";
import { DispatchType, StateType } from "../../../store/store";
import { Loader } from "../../../components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStudentHomeworks, reset } from "../../../toolkit/homework/getSlice";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  width: 90%;
  display: flex;
  margin: 10vh 0;
  flex-grow: 1;
  max-width: 1400px;
  flex-direction: column;

  ${respondTo.mobile`
      margin: 5vh 0;
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

const Label = styled.div`
  display: flex;
  margin: 40px 0 0 0;

  font-weight: 500;
  font-style: italic;
  color: var(--black);
  font-size: var(--small-m);
`;

const NavContainer = styled.div``;

const Text = styled.p`
  color: var(--black);
  font-weight: 500;
  font-size: var(--small-l);
  text-transform: capitalize;

  &:not(:first-of-type) {
    margin-left: auto;
  }
`;

const AnimatedContainer = styled.div``;

const ErrorText = styled.div`
  margin: 20px 10px;
  font-style: italic;
  color: var(--primary);
  font-size: var(--small-m);
`;

function StudentHomeworksPage() {
  const { id, homeworkId } = useParams();
  const dispatch: DispatchType = useDispatch();
  const { t } = useTranslation("auth");
  const { isLoading, studentHomeworkList, error } = useSelector(
    (state: StateType) => state.getStudentHomeworks
  );

  useEffect(() => {
    dispatch(getStudentHomeworks({ classroomId: id, homeworkId: homeworkId }));

    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <Container>
      {isLoading && <Loader color="darkmagenta" />}

      {!isLoading && (
        <>
          <NavContainer className="w3-animate-left">
            <NavBar classroomId={id} homeworkId={homeworkId} />
          </NavContainer>
          <Label className="w3-animate-left">
            <Text>{studentHomeworkList?.title}</Text>
            <Text>{t("global.Status")}</Text>
          </Label>
        </>
      )}

      {!isLoading &&
        (error ||
          (studentHomeworkList &&
            studentHomeworkList.studentHomeworkDTOS?.length == 0)) && (
          <ErrorText className="w3-animate-left">
            {t("studentHomeworksPage.There are no homeworks")}
          </ErrorText>
        )}

      <AnimatedContainer className="w3-animate-left">
        {!isLoading &&
          studentHomeworkList &&
          studentHomeworkList.studentHomeworkDTOS?.length > 0 &&
          studentHomeworkList.studentHomeworkDTOS?.map((homework, index) => (
            <Homework
              key={index}
              classroomId={id}
              homework={homework}
              homeworkId={homeworkId}
              totalGrade={studentHomeworkList.totalGrade}
            />
          ))}
      </AnimatedContainer>
    </Container>
  );
}
export default StudentHomeworksPage;
