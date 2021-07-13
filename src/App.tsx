import React from 'react';
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { useAppStore } from "./state/app";

const StyleBackdrop = styled(Backdrop)`
    z-index: 10;
    color: #fff;
`
function App() {
  const state = useAppStore()
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route exact path="/">
            <MainPage/>
          </Route>
        </Switch>
      </Router>
      <StyleBackdrop open={state.loading}>
        <CircularProgress color="inherit" />
      </StyleBackdrop>
    </QueryClientProvider>
  );
}

export default App;