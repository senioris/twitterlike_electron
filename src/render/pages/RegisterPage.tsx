import { Button, Link, TextField, Typography } from '@material-ui/core';
import * as React from 'react'
import styled from 'styled-components';

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
  return (
    <Root>
      <MainContainer>
        <Title variant="h4">Signup in to MihoTwitter</Title>
        <LoginContainer>
          <InputField
            required
            id="outlined"
            label="Email address"
          />
          <InputField
            required
            id="outlined-password-input"
            type="password"
            label="Password"
          />
          <SigninButton>
            Sign up
          </SigninButton>
        </LoginContainer>
      </MainContainer>
    </Root>
  );
}

export default RegisterPage