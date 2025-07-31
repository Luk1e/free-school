import styled from "styled-components";
import { respondTo } from "../../../../utils/helpers/_respondTo";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteClassroom } from "../../../../toolkit/classroom/deleteSlice";
import { DispatchType, StateType } from "../../../../store/store";
import { useEffect } from "react";
import { reset } from "../../../../toolkit/classroom/deleteSlice";
import { PlusSVG } from "../../../../static/svg";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  display: flex;
`;

const Button = styled.button`
  cursor: pointer;
  padding: 0px 10px;

  border: none;
  background-color: var(--magenta);

  color: var(--white);
  font-size: var(--small-m);
  transition: all 0.4s ease 0s;

  ${respondTo.desktop`
    &:hover{
      background-color: var(--magentaWithOpacity);
      color:var(--whiteWithOpacity);
    }
  `};

  ${respondTo.tv`
    &:hover{
      background-color: var(--magentaWithOpacity);

      color:var(--whiteWithOpacity);
    }
  `};
`;

const IconButton = styled.button`
  cursor: pointer;
  display: flex;
  margin-right: 10px;
  padding: 5px;
  align-items: center;
  justify-content: center;

  border: none;
  background-color: green;
  transition: all 0.4s ease 0s;

  svg {
    height: 20px;
    width: 20px;
    fill: var(--white);
    transition: all 0.4s ease 0s;
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
  id: string | undefined;
}

function NavBar({ id }: NavBarProps) {
  const navigate = useNavigate();
  const { success } = useSelector((state: StateType) => state.deleteClassroom);
  const dispatch: DispatchType = useDispatch();
  const { t } = useTranslation(["auth"]);

  useEffect(() => {
    if (success) {
      navigate("/classroom");
    }
    return () => {
      dispatch(reset());
    };
  }, [success]);

  return (
    <Container>
      <IconButton onClick={() => navigate(`/classroom/${id}/homeworks/create`)}>
        <PlusSVG />
      </IconButton>

      <Button onClick={() => navigate(`/classroom/${id}/students`)}>
        {t("global.students")}
      </Button>

      <Text onClick={() => dispatch(deleteClassroom({ id }))}>
        {t("classroomPage.delete classroom")}
      </Text>
    </Container>
  );
}

export default NavBar;
