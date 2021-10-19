import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Routes} from "./pages/Routes";
import {TopBar} from "./components/TopBar";
import {CurrentUserProvider} from "./contexts/CurrentUser";

const App = () => {
  return(
      <CurrentUserProvider>
          <BrowserRouter>
              <TopBar/>
              <Routes/>
          </BrowserRouter>
      </CurrentUserProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
