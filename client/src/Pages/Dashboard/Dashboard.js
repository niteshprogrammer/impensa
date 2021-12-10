import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Index";
import styled from "styled-components";
import Main from "./Main.js";
import Nav from "../../components/Sidebar/Navbar";
import Banner from "./Banner";
export const Wrapper = styled.div`
  display: flex;
`;

const MainState = ({ name, firstExpense }) => {
  if (firstExpense === null) {
    return <Banner name={name} />;
  } else {
    return <Main />;
  }
};

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [firstExpense, setFirstExpense] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { jwtToken: localStorage.token },
      });

      const parseData = await res.json();

      // console.log(parseData);

      setName(parseData[0].user_name);
      setFirstExpense(parseData[0].expense_amount);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    //FCFBFD
    <>
      <Nav name={name} />
      <Wrapper>
        <Sidebar logout={logout} />
        <MainState name={name} firstExpense={firstExpense} />
      </Wrapper>
    </>
  );
};

export default Dashboard;
