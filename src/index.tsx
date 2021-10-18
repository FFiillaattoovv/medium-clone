import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Routes} from "./pages/Routes";
import {TopBar} from "./components/TopBar";

const App = () => {
  return(
      <div>
          <BrowserRouter>
              <TopBar/>
              <Routes/>
          </BrowserRouter>
      </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
