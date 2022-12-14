import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./components/Contact";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./redux/contact";
import allContactsReducer from "./redux/allContacts";
import favoriteContactsReducer from "./redux/favoriteContacts";

const store = configureStore({
  reducer: {
    contact: contactReducer,
    allContacts: allContactsReducer,
    favoriteContacts: favoriteContactsReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
