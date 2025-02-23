import React, { useState } from "react";

import {
  ArchiveContainer,
  H3,
  HeaderContainer,
  Icon,
  ExpenseCategoryCentered,
  IconContainer,
  Input,
  TableWrapper,
} from "./style";
import { Table, Colgroup, Col, Thead, Tr, Th, Tbody, Td } from "./style";
import moment from "moment";
import ExcelExport from "./excelExport";
// Wraps Sidebar Nav and Main-Conent

const Archive = ({ expenses, currency }) => {
  document.title = "Dashboard - Archive";

  const [sort, setSort] = useState(false);
  const [sortedExpenses, setSortedExpenses] = useState([...expenses].reverse());
  const [disabled, setDisabled] = useState(true);
  const [selectedExpense, setSelectedExpense] = useState({});
  async function deleteExpense(expense_id) {
    try {
      console.log(`Expense id is ${expense_id}`);
      const res = await fetch(`/dashboard/expense/${expense_id}`, {
        method: "DELETE",
        headers: { jwtToken: localStorage.token },
      });

      window.location = "/dashboard/archive";
      console.log(`Expense was deleted! Response is ${res}`);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function sortElements() {
    try {
      sort
        ? setSortedExpenses(expenses)
        : setSortedExpenses([...expenses].reverse());
      setSort(!sort);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function makeExpenseEditable(expense) {
    try {
      setSelectedExpense(expense);
      setDisabled(!disabled);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function onSubmitForm(e) {
    e.preventDefault();
    try {
      const body = selectedExpense;
      const response = await fetch("/dashboard/expense", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          jwtToken: localStorage.token,
        },
        body: JSON.stringify(body),
      });

      setDisabled(!disabled);
      window.location = "/dashboard/overview";
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  }

  const updateField = (e) => {
    setSelectedExpense({
      ...selectedExpense,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ArchiveContainer>
      <HeaderContainer>
        <H3>Archive</H3>
        <ExcelExport expenses={expenses} />
      </HeaderContainer>
      <TableWrapper>
        <Table>
          <Colgroup>
            <Col style={{ width: "10%", minWidth: "auto" }} />
            <Col style={{ width: "20%", minWidth: "auto" }} />
            <Col style={{ width: "40%", minWidth: "auto" }} />
            <Col style={{ width: "10%", minWidth: "auto" }} />
            <Col style={{ width: "30%", minWidth: "auto" }} />
          </Colgroup>
          <Thead>
            <Tr>
              <Th>Modify</Th>
              <Th>Amount</Th>
              <Th>Description</Th>
              <Th>Category</Th>
              <Th onClick={() => sortElements()}>
                Date <Icon className="fas fa-sort"></Icon>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {disabled ? (
              sortedExpenses.map((expense) => (
                <Tr key={expense.expense_id}>
                  <Td>
                    <IconContainer>
                      <Icon
                        className="far fa-edit"
                        onClick={() => makeExpenseEditable(expense)}
                      />
                    </IconContainer>
                  </Td>
                  <Td>
                    {`${currency} ${parseFloat(expense.expense_amount).toFixed(
                      2
                    )}`}
                  </Td>
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
                  <Td>
                    {moment.utc(expense.expense_date).format("MMM Do, YYYY")}
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr key={selectedExpense.expense_id}>
                <Td>
                  <IconContainer>
                    <Icon
                      className="fas fa-times"
                      onClick={() => setDisabled(!disabled)}
                    />
                    <Icon className="fas fa-check" onClick={onSubmitForm} />
                    <Icon
                      className="far fa-trash-alt"
                      onClick={() => deleteExpense(selectedExpense.expense_id)}
                    />
                  </IconContainer>
                </Td>
                <Td>
                  <Input
                    required
                    type="number"
                    name="expense_amount"
                    min="0.01"
                    step="0.01"
                    value={selectedExpense.expense_amount}
                    onChange={(e) => updateField(e)}
                  />
                </Td>
                <Td>
                  <Input
                    required
                    name="expense_description"
                    type="text"
                    value={selectedExpense.expense_description}
                    onChange={(e) => updateField(e)}
                  />
                </Td>
                <Td>
                  <Input
                    required
                    name="expense_category"
                    type="text"
                    value={selectedExpense.expense_category}
                    onChange={(e) => updateField(e)}
                    // options={GeneralCategories}
                    // className="basic-multi-select"
                    // classNamePrefix="select"
                  />
                </Td>
                <Td>
                  {moment
                    .utc(selectedExpense.expense_date)
                    .format("MMM Do, YYYY")}
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableWrapper>
    </ArchiveContainer>
  );
};
export default Archive;
