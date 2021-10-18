import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import Routes from "./pages/Routes";

const App = () => {
  return(
      <div>
          <h1>App</h1>
          <BrowserRouter>
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
