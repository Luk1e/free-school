import styled from "styled-components";
import { respondTo } from "../../../../utils/helpers/_respondTo";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteHomework } from "../../../../toolkit/homework/deleteSlice";
import { DispatchType, StateType } from "../../../../store/store";
import { useEffect } from "react";
import { reset } from "../../../../toolkit/homework/deleteSlice";
import { UpdateSVG } from "../../../../static/svg";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  display: flex;
`;

const IconButton = styled.button`
  cursor: pointer;
  display: flex;
  margin-right: 10px;
  padding: 8px;
  align-items: center;
  justify-content: center;

  border: none;
  background-color: green;
  transition: all 0.4s ease 0s;

  svg {
    height: 16px;
    width: 16px;
    fill: var(--white);
  }

  ${respondTo.desktop`
    &:hover{
      opacity:0.8;
      svg{
        fill:var(--whiteWithOpacity);
      }
    }
  `};

  ${respondTo.tv`
    &:hover{
      opacity:0.8;
      svg{
        fill:var(--whiteWithOpacity);
      }
    }
  `};
`;

const Text = styled.p`
  cursor: pointer;
  margin-left: auto;
  align-self: center;

  color: var(--red);
  font-size: var(--small-m);
  font-style: italic;
  text-transform: capitalize;
  transition: all 0.4s ease 0s;

  ${respondTo.desktop`
    &:hover{
      color:var(--redWithOpacity);
    }
  `};

  ${respondTo.tv`
    &:hover{
        color:var(--redWithOpacity);
    }
  `};
`;

interface NavBarProps {
  classroomId: string | undefined;
  homeworkId: string | undefined;
}

function NavBar({ classroomId, homeworkId }: NavBarProps) {
  const navigate = useNavigate();
  const { t } = useTranslation(["auth"]);
  const { success } = useSelector((state: StateType) => state.deleteHomework);
  const dispatch: DispatchType = useDispatch();

  useEffect(() => {
    if (success) {
      navigate(`/classroom/${classroomId}`);
    }
    return () => {
      dispatch(reset());
    };
  }, [success]);

  return (
    <Container>
      <IconButton
        onClick={() =>
          navigate(`/classroom/${classroomId}/homeworks/${homeworkId}/update`)
        }
      >
        <UpdateSVG />
      </IconButton>

      <Text
        onClick={() => dispatch(deleteHomework({ classroomId, homeworkId }))}
      >
        {t("studentHomeworksPage.delete homework")}
      </Text>
    </Container>
  );
}

export default NavBar;
