import React from "react";
import styled from "styled-components";
import theme from "../../theme/Index";
import { MidContainer } from "../../components/ContentContainer/Index";
import { SpentBtn } from "../../components/Button/index.jsx";
import Categories from "../../components/NewExpense/Categories";
import ToggleNewExpense from "../../components/ModalTemplates/NewExpense";
// Wraps Sidebar Nav and Main-Conent
export const Wrapper = styled.div`
  z-index: -1;
  margin-top: 75px;
  margin-right: 20px;
  margin-left: 20px;
  z-index: 100;
  width: 100%;
  background-color: ${theme.bg.semiBlue};
  min-height: 100vh;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;
// Has all Main-block elements
export const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: 0.7fr 1fr;
  gap: 20px;
  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

export const Heading = styled.h3`
padding:0;
margin:0;
  }
`;
const Main = ({ expenses }) => {
  return (
    <Wrapper>
      <Container>
        <MidContainer>
          <Heading>Recently spent</Heading>

          {expenses.map((expense) => (
            <p key={expense.expense_id}>{expense.expense_amount}</p>
          ))}
          <ToggleNewExpense />
        </MidContainer>
        <MidContainer></MidContainer>
      </Container>
    </Wrapper>
  );
};

export default Main;
