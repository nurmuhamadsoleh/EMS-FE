import React from "react";
import Routers from "./route";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
// import { Auth0Provider } from "@auth0/auth0-react";
// import { auth0 } from "./data/config";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import LayoutRoutes from "./route/LayoutRoutes";

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Provider store={store}>
        <LayoutRoutes />
      </Provider>
    </BrowserRouter>
  </div>
);

export default App;
