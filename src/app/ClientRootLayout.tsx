"use client";

import React from "react";

// third party
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// project imports

import AuthProvider from "@/app/auth/AuthProvider";
import reducer from "@/app/store/reducer";

// assets
import QueryClientProvider from "./QueryClientProvider";

export const store = configureStore({ reducer });

const ClientRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default ClientRootLayout;
