import React from "react";
import App from "./App";
import "./styles/index.css";
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import store from './app/store'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // Importation du store avec Provider, le store est importé depuis ./app/store
  <Provider store={store}>
    <App tab="home" />
  </Provider>
);
