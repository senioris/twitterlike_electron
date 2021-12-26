import { Button, Link, TextField, TextFieldProps, Typography } from '@mui/material';
import * as React from 'react'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signup } from '../api/ServerApi';

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

const Title = styled(Typography)`
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

const InputField = styled(TextField)`
  width: 100%;
  margin-bottom: 5px;
`

const SigninButton = styled(Button)`
  width: 100%;
  background-color: green;
`

export const RegisterPage = (): JSX.Element => {
  const userIdRef = useRef<TextFieldProps>(null)
  const passwordRef = useRef<TextFieldProps>(null)

  const navigate = useNavigate();

  const [error, setError] = React.useState<string>("")

  const onSigninClicked = React.useCallback(
    () => {
      if (!userIdRef.current?.value || !passwordRef.current?.value) {
        setError("Incorrect username or password.")
        return
      }

      const userId = userIdRef.current.value as string
      const password = passwordRef.current.value as string

      signup(userId, password).then((response) => {
        navigate("/login", { replace: true })
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
        <Title variant="h4">Signup in to MihoTwitter</Title>
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
            onKeyPress={e => {
              if (e.key === 'Enter') {
                onSigninClicked()
              }
            }}
          />
          <SigninButton onClick={onSigninClicked}>
            Sign up
          </SigninButton>
        </LoginContainer>
      </MainContainer>
    </Root>
  );
}

export default RegisterPage