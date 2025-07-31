import styled from "styled-components";
import { NotificationSVG } from "../../../static/svg";
import { useSelector, useDispatch } from "react-redux";
import { StateType, DispatchType } from "../../../store/store";
import {
  getLatestNotifications,
  reset,
} from "../../../toolkit/notification/latestNotificationSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 15px;
  position: relative;

  svg {
    width: 100% !important;
    height: 100% !important;
    background-color: var(--primary);
    border-radius: 50%;
    padding: 5px;
    transition: all 0.4s ease 0s;
  }

  &:hover {
    & svg {
      background-color: var(--primaryWithOpacity);
      fill: var(--whiteWithOpacity);
    }

    & p {
      color: var(--whiteWithOpacity);
      background-color: var(--redWithOpacity);
    }
  }
`;

const TextContainer = styled.p`
  font-size: var(--small-s);
  position: absolute;
  margin: 0 !important;
  top: -5px;
  right: -10px;
  height: 15px;
  width: 15px;
  padding-bottom: 3px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  color: var(--white);
  background-color: var(--error);
  transition: all 0.4s ease 0s;
`;

function Notification() {
  const dispatch: DispatchType = useDispatch();
  const navigate = useNavigate();
  const { latestNotifications } = useSelector(
    (state: StateType) => state.latestNotifications
  );

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getLatestNotifications());
    }, 30000); // 30 seconds

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLatestNotifications());
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <Container onClick={() => navigate("/notifications")}>
      <NotificationSVG />

      {latestNotifications?.numberOfUnreadNotification !== undefined &&
        latestNotifications.numberOfUnreadNotification > 0 && (
          <TextContainer>
            {latestNotifications.numberOfUnreadNotification}
          </TextContainer>
        )}
    </Container>
  );
}

export default Notification;
