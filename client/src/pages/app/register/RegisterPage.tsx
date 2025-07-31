import styled from "styled-components";
import { respondTo } from "../../../utils/helpers/_respondTo";
import RegisterForm from "./components/RegisterForm";
import { useEffect } from "react";
import { StateType } from "../../../store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  margin: 20vh;
  flex-direction: column;
  max-width: 1400px;

  ${respondTo.mobile`
    padding: 50px 0;
    margin:5vh;
  `}
  ${respondTo.desktop`
    width: 70%;
  `}

  ${respondTo.tv`
    width: 60%;
    margin: 10vh;
  `}
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-evenly;

  ${respondTo.tablet`
    flex-direction: column;
    gap:20px;
  `}

  ${respondTo.smallTablet`
    flex-direction: column;
    gap:20px;
  `}

  ${respondTo.mobile`
    flex-direction: column;
    gap:20px;
  `}
`;

function RegisterPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state: StateType) => state.authentication);

  // If user is already authenticated navigate to main page
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <Container>
      <InnerContainer>
        <RegisterForm />
      </InnerContainer>
    </Container>
  );
}

export default RegisterPage;
