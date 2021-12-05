import { Button, TextField, TextFieldProps, Typography } from '@material-ui/core';
import * as React from 'react'
import { useCallback, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signin } from '../api/ServerApi';

const Root = styled.div`
  display: flex;
`

const MainContainer = styled.div`
  align-items: center;
  margin: 10px auto 0 auto;
  max-width: 600px;
  min-width: 300px;
  width: 80%;
`

const Message = styled(Typography)`
  text-align: center;
`

const LoginContainer = styled.div`
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  max-width: 400px;
  min-width: 400px;
  align-items: center;
  border:outset 1px #6b6b6b;
  border-radius:10px;
  background-color: #3b3b3b;
  flex-direction: row;
  padding: 10px;
`

const ErrorContainer = styled.div`
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  max-width: 400px;
  min-width: 400px;
  align-items: center;
  border:outset 1px #ff9494;
  border-radius:10px;
  background-color: #4d0000;
  flex-direction: row;
  padding: 10px;
`

const InputField = styled(TextField)`
  width: 100%;
  margin-bottom: 5px;
`

const SigninButton = styled(Button)`
  width: 100%;
  background-color: green;
`

const SignUpLink = styled(Link)`
  padding: 0px, auto
`

const ErrorMessage = styled(Typography)`
  padding: 0px, auto
`

const createLoginError = (error: string): JSX.Element => {
  if (!error) {
    return <div />
  }

  return (
    <ErrorContainer>
      <ErrorMessage>
        {error}
      </ErrorMessage>
    </ErrorContainer>
  )
}

export const LoginPage = (): JSX.Element => {
  const userIdRef = useRef<TextFieldProps>(null)
  const passwordRef = useRef<TextFieldProps>(null)

  const navigate = useNavigate();
  
  const [error, setError] = useState<string>("")

  const onSigninClicked = useCallback(
    () => {
      if (!userIdRef.current?.value || !passwordRef.current?.value) {
        setError("Incorrect username or password.")
        return
      }

      const userId = userIdRef.current.value as string
      const password = passwordRef.current.value as string

      signin(userId, password).then((response) => {
        navigate("/main")
      }).catch((err) => {
        setError("Incorrect username or password.")
        console.error(err)
      })
    },
    [],
  )

  return (
    <Root>
      <MainContainer>
        <Message variant="h4">Sign in to MihoTwitter</Message>
        {createLoginError(error)}
        <LoginContainer>
          <InputField
            required
            id="outlined"
            label="id"
            inputRef={userIdRef}
          />
          <InputField
            required
            id="outlined-password-input"
            type="password"
            label="Password"
            inputRef={passwordRef}
          />
          <SigninButton onClick={onSigninClicked}>
            Sign in
          </SigninButton>
        </LoginContainer>
        <LoginContainer>
          <div>
            <SignUpLink to="/signup">Create new account</SignUpLink>
          </div>
        </LoginContainer>
      </MainContainer>
    </Root>
  );
}

export default LoginPage