import React from "react";

import { StatusBar } from "expo-status-bar";

import Routes from "./src/routes";
import AccountProvider from "./src/context/AccountProvider";

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#0fb9b1" />

      <AccountProvider>
        <Routes />
      </AccountProvider>
    </>
  );
}
