import styled from "styled-components";
import { respondTo } from "../../../utils/helpers/_respondTo";
import { useParams } from "react-router-dom";
import { NavBar, Homework } from "./components";
import { useSelector } from "react-redux";
import { DispatchType, StateType } from "../../../store/store";
import { Loader } from "../../../components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getHomeworks, reset } from "../../../toolkit/homework/getAllSlice";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  width: 90%;
  display: flex;
  margin: 10vh 0;
  max-width: 1400px;
  flex-grow: 1;
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

const NavContainer = styled.div``;

const Label = styled.div`
  display: flex;
  margin: 40px 0 0 0;
`;

const Text = styled.p`
  font-weight: 500;
  font-style: italic;
  color: var(--black);
  font-size: var(--small-l);

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

function ClassroomPage() {
  const { id } = useParams();
  const dispatch: DispatchType = useDispatch();
  const { user } = useSelector((state: StateType) => state.authentication);
  const { t } = useTranslation(["auth"]);

  const { isLoading, homeworkList, error } = useSelector(
    (state: StateType) => state.getHomeworks
  );

  useEffect(() => {
    dispatch(getHomeworks({ classroomId: id }));

    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <Container>
      {user && user.status === "TEACHER" && (
        <NavContainer className="w3-animate-left">
          <NavBar id={id} />
        </NavContainer>
      )}

      {isLoading && <Loader color="darkmagenta" />}

      {!isLoading && (
        <Label className="w3-animate-left">
          <Text>{t("global.Homeworks")}</Text>
          {user && user.status === "TEACHER" ? (
            <Text>{t("global.Submitted")}</Text>
          ) : (
            <Text>{t("global.Status")}</Text>
          )}
        </Label>
      )}

      {!isLoading && (error || (homeworkList && homeworkList?.length == 0)) && (
        <ErrorText className="w3-animate-left">
          {t("classroomPage.There are no homeworks")}
        </ErrorText>
      )}

      <AnimatedContainer className="w3-animate-left">
        {!isLoading &&
          homeworkList &&
          homeworkList.length > 0 &&
          homeworkList.map((homework) => (
            <Homework
              key={homework.homeworkId}
              classroomId={id}
              isTeacher={user ? user.status === "TEACHER" : false}
              homework={homework}
            />
          ))}
      </AnimatedContainer>
    </Container>
  );
}

export default ClassroomPage;
