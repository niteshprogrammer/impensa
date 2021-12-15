import React, { useState } from "react";
import {
  ArchiveContainer,
  H3,
  HeaderContainer,
  Select,
  Option,
  Icon,
  ExpenseCategoryCentered,
  Container,
  AlterExpense,
  IconContainer,
} from "./style";
import { Table, Colgroup, Col, Thead, Tr, Th, Tbody, Td } from "./style";
import moment from "moment";
import ExcelExport from "./excelExport";
import { Button } from "../../components/Button";
import ModalService from "../../components/Modal/ModalService";
import NewExpenseEdit from "../../components/Modal/NewExpenseEdit.js";
// Wraps Sidebar Nav and Main-Conent

const Archive = ({ expenses }) => {
  const [value, setValue] = useState("Recent first");

  let newobj;
  switch (value) {
    case "Recent first":
      newobj = expenses;
      break;
    case "Oldest first":
      newobj = [...expenses].reverse();
      break;
    case "Last expense":
      newobj = [expenses[0]];
      break;
    default:
      break;
  }

  const addModal = () => {
    ModalService.open(NewExpenseEdit);
  };

  async function deleteExpense(expense_id) {
    try {
      const res = await fetch("http://localhost:5000/dashboard/expense", {
        method: "DELETE",
        headers: { jwtToken: localStorage.token },
        body: expense_id,
      });

      console.log("Expense was deleted!");
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <ArchiveContainer>
      <HeaderContainer>
        <H3>Archive</H3>
        <Select value={value} onChange={(e) => setValue(e.target.value)}>
          <Option value="Recent first">Recent first</Option>
          <Option value="Oldest first">Oldest first</Option>
          <Option value="Last expense">Last expense</Option>
        </Select>
        <ExcelExport expenses={expenses} />
      </HeaderContainer>
      <Table>
        <Colgroup>
          <Col style={{ width: "10%", minWidth: "auto" }} />
          <Col style={{ width: "50%", minWidth: "auto" }} />
          <Col style={{ width: "17%", minWidth: "auto" }} />
          <Col style={{ width: "15%", minWidth: "auto" }} />
          <Col style={{ width: "5%", minWidth: "auto" }} />
        </Colgroup>
        <Thead>
          <Tr>
            <Th>Amount</Th>
            <Th>Description</Th>
            <Th>Category</Th>
            <Th>Date</Th>
            <Th>Modify</Th>
          </Tr>
        </Thead>
        <Tbody>
          {newobj.map((expense) => (
            <Tr key={expense.expense_id}>
              <Td>{expense.expense_amount}</Td>
              <Td>
                {expense.expense_description.length === 0
                  ? "No description provided"
                  : expense.expense_description}
              </Td>
              <Td>
                <ExpenseCategoryCentered>
                  {expense.expense_category}
                </ExpenseCategoryCentered>
              </Td>
              <Td>{moment.utc(expense.expense_date).format("MMM Do, YYYY")}</Td>
              <Td>
                <IconContainer>
                  {/* <Icon className="far fa-trash-alt" onClick={deleteExpense} /> */}
                  <Icon className="far fa-edit" onClick={addModal} />
                </IconContainer>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </ArchiveContainer>
  );
};

export default Archive;
