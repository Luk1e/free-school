import styled from "styled-components";
import { NotificationType } from "../../../../toolkit/notification/notificationSlice";
import parseBoldText from "../../../../utils/helpers/parseBoldText";
const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  color: var(--black);
`;

const TextLeft = styled.h4`
  margin: 0;
  font-size: var(--small-m);
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif !important;
  color: var(--blackWithOpacity);
  font-weight: 200 !important;
  & strong {
    color: var(--black);
  }
`;

const TextRight = styled.h4`
  display: flex;
  margin: 0;
  margin-left: auto;
  font-size: var(--small-m);
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif !important;
`;

interface NotificationProps {
  key: number;
  notification: NotificationType;
}

function Notification({ notification }: NotificationProps) {
  const { text, dateTime } = notification;

  return (
    <Container>
      <TextLeft>{parseBoldText(text)}</TextLeft>
      <TextRight>
        {dateTime.length > 24
          ? dateTime.slice(-15, -10)
          : dateTime.slice(-8, -3)}
      </TextRight>
    </Container>
  );
}

export default Notification;
