import styled from "styled-components";
import { respondTo } from "../../../utils/helpers/_respondTo";
import { CreateClassroom, JoinClassroom, Classroom } from "./components";
import { Loader } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, StateType } from "../../../store/store";
import { useEffect } from "react";
import { getClassrooms, reset } from "../../../toolkit/classroom/getAllSlice";
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

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-evenly;

  ${respondTo.tablet`
    flex-direction: column;
  `}

  ${respondTo.smallTablet`
    flex-direction: column;
  `}

  ${respondTo.mobile`
    flex-direction: column;
  `}
`;

const ClassroomContainer = styled.div`
  display: grid;
  margin: 40px 0;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  ${respondTo.desktop`
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  `}

  ${respondTo.tv`
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  `}
`;

const Label = styled.p`
  margin: 40px 0 0 0;

  font-weight: 500;
  font-style: italic;
  color: var(--black);
  font-size: var(--small-l);
`;

const ErrorText = styled.p`
  margin: 20px 10px;
  font-style: italic;
  color: var(--primary);
  font-size: var(--small-m);
`;

function ClassroomsPage() {
  const dispatch: DispatchType = useDispatch();
  const authSlice = useSelector((state: StateType) => state.authentication);
  const { user } = authSlice;
  const { t } = useTranslation(["auth"]);
  const classroomSlice = useSelector((state: StateType) => state.getClassrooms);
  const { classroomList, isLoading, error } = classroomSlice;

  useEffect(() => {
    dispatch(getClassrooms());
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <Container>
      <HeaderContainer>
        {/* Join | Create classroom component */}
        {user && user.status === "TEACHER" ? (
          <CreateClassroom />
        ) : (
          <JoinClassroom />
        )}
      </HeaderContainer>

      <Label className="w3-animate-left">
        {t("classroomsPage.Classrooms")}
      </Label>
      {/* Error component */}
      {error && !isLoading && (
        <ErrorText className="w3-animate-left">{error}</ErrorText>
      )}
      <ClassroomContainer className="w3-animate-left">
        {/* Loader | Classroom list component */}
        {isLoading ? (
          <Loader color={"darkmagenta"} />
        ) : classroomList ? (
          classroomList.map((classroom) => (
            <Classroom
              key={classroom.classroomId}
              id={classroom.classroomId}
              name={classroom.name}
            />
          ))
        ) : (
          <></>
        )}
      </ClassroomContainer>
    </Container>
  );
}

export default ClassroomsPage;
