import React, { useCallback, useEffect, useState } from "react";

import { Alert } from "react-native";

import { accountsDB } from "../services/firebase";
import { Account, AccountContext, AccountForm } from "./AccountContext";

const AccountProvider: React.FC = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const saveAccount = useCallback(
    (data: AccountForm, callback?: (err: Error | null) => void) => {
      if (!data.name || Number(data.amount) < 0) {
        Alert.alert("Atenção", "Preencha todos os dados");

        return;
      }

      data.amount = parseFloat(data.amount).toFixed(2);

      accountsDB.push(data, (err) => callback && callback(err));
    },
    []
  );

  const deleteAccount = useCallback(
    (accountId: string, callback?: (err: Error | null) => void) => {
      accountsDB.child(accountId).remove((err) => callback && callback(err));
    },
    []
  );

  useEffect(() => {
    accountsDB.on("value", (accounts) => {
      const data: Account[] = [];

      accounts.forEach((account) => {
        data.push({
          id: String(account.key),
          name: account.val().name,
          amount: account.val().amount,
        });
      });

      setAccounts(data);
    });
  }, [setAccounts]);

  return (
    <AccountContext.Provider value={{ accounts, saveAccount, deleteAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
