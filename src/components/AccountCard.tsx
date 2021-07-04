import React, { memo, useContext } from "react";

import { StyleSheet, View, Text, Alert } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import FiIcon from "@expo/vector-icons/Feather";

import { Account, AccountContext } from "../context/AccountContext";

export interface AccountCardProps {
  account: Account;
}

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  const { deleteAccount } = useContext(AccountContext);

  function handleDelete() {
    deleteAccount(account.id, (err) => {
      if (err) {
        Alert.alert("Erro", "Ocorreu um erro ao salvar os dados");

        console.log(err);
      }
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={[styles.infoText, styles.infoTitle]}>{account.name}</Text>
        <Text style={styles.infoText}>R$ {account.amount}</Text>
      </View>

      <RectButton
        style={[styles.button, styles.deleteButton]}
        onPress={handleDelete}
      >
        <FiIcon name="trash" size={18} color="#ffffff" />
      </RectButton>
    </View>
  );
};

export default memo(AccountCard);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginVertical: 5,
    backgroundColor: "#ffffff",
    borderRadius: 4,
  },
  info: {
    flex: 1,
    marginRight: 20,
  },
  infoTitle: {
    fontWeight: "bold",
  },
  infoText: {
    color: "#555555",
    fontSize: 15,
  },
  button: {
    padding: 8,
    borderRadius: 6,
    opacity: 0.9,
  },
  deleteButton: {
    backgroundColor: "#f83a63",
  },
  chartButton: {
    backgroundColor: "#3a8cf8",
  },
});
