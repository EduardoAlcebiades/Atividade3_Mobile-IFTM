import React, { useContext } from "react";

import { StatusBar, SafeAreaView, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { AccountContext } from "../context/AccountContext";

import AccountCard from "../components/AccountCard";
import FormAccount from "../components/FormAccount";

function Home() {
  const { accounts } = useContext(AccountContext);

  return (
    <SafeAreaView style={styles.container}>
      <FormAccount />

      <ScrollView style={[styles.list]}>
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#f0f0f7",
  },
  list: {
    flex: 1,
    paddingHorizontal: 25,
    marginVertical: 25,
  },
});
