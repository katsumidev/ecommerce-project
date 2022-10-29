import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  LoginWrapper,
  LoginInput,
  CreateAccountButton,
  LoginButton,
} from "./styles";

function UserLogin() {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");

  const authenticateUser = (e) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/authenticate`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPass,
      }),
    }).then(async (res) => {
      let data = await res.json();

      switch (res.status) {
        case 404:
          console.log("Usuário não encontrado");
          break;
        case 403:
          console.log("Senha inválida");
          break;
        case 200:
          if (data.token) {
            userLogin(data.token);
          }
          break;
      }
    });

    e.preventDefault();
  }

  function userLogin(token) {
    localStorage.setItem("access_token", token);

    window.location.href = "/";
  }

  return (
    <Container>
      <LoginWrapper onSubmit={authenticateUser}>
        <h2>Hi 👋, Use your email and password to login!</h2>
        <p>Email</p>
        <LoginInput
          type="text"
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <p>Password</p>
        <LoginInput
          type="password"
          onChange={(e) => setUserPass(e.target.value)}
          required
        />
        <LoginButton
          type="submit"
          value="Login"
        />
        <CreateAccountButton
          type="button"
          value="Create an account"
          onClick={() => (window.location.href = "/register")}
        />
      </LoginWrapper>
    </Container>
  );
}

export default UserLogin;
