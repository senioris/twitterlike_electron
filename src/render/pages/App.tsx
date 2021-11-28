import * as React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import theme from '../theme'
import LoginPage from './LoginPage'
import { CssBaseline } from '@material-ui/core';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import RegisterPage from './RegisterPage';
import { LaunchPage } from './LaunchPage';
import { MainPage } from './MainPage';

export const App = (): JSX.Element => {


  return (
    <HashRouter>
      <MaterialThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LaunchPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/main" element={<MainPage />} />
          </Routes>
        </StyledThemeProvider>
      </MaterialThemeProvider>
    </HashRouter>
  )
}