import { createContext } from "react";

export interface Account {
  id: string;
  name: string;
  amount: string;
}

export interface AccountForm {
  name: string;
  amount: string;
}

export interface AccountContextProps {
  accounts: Account[];
  saveAccount: (data: AccountForm, callback?: (err: Error | null) => void) => void;
  deleteAccount: (accountId: string, callback?: (err: Error | null) => void) => void;
}

export const AccountContext = createContext({} as AccountContextProps);
