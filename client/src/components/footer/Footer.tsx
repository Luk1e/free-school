import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 150px;
  z-index: 100;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
`;

const InnerContainer = styled.div`
  width: 90vw;
  display: flex;
  padding: 15px 10px;
  align-items: center;
  justify-content: center;

  text-align: center;
  color: var(--white);
  border-radius: 0.625rem;
  background-color: var(--primary);

  max-width: 1600px;
`;

function Footer() {
  return (
    <Container>
      <InnerContainer>
        Copyright © 2024 FreeSchool. All rights reserved.
      </InnerContainer>
    </Container>
  );
}

export default Footer;
