import React, { useCallback, useState, useContext } from "react";

import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Keyboard,
  Alert,
} from "react-native";

import { AccountContext, AccountForm } from "../context/AccountContext";

const FormAccount: React.FC = () => {
  const { saveAccount } = useContext(AccountContext);
  const { navigate } = useNavigation();

  const [form, setForm] = useState<AccountForm>({ name: "", amount: "" });

  const amountMask = useCallback((value: string) => {
    const parsedValue = value.replace(/[ -]/g, "").replace(",", ".");

    return parsedValue;
  }, []);

  const handleInputChange = useCallback(
    (name: keyof AccountForm, value: string) => {
      if (name === "amount") value = amountMask(value);

      setForm((prev) => ({ ...prev, [name]: value }));
    },

    [setForm, amountMask]
  );

  const handleSubmit = useCallback(() => {
    Keyboard.dismiss();

    saveAccount(form, (err) => {
      if (err) {
        Alert.alert("Erro", "Ocorreu um erro ao salvar os dados");

        console.log(err);
      } else setForm({ name: "", amount: "" });
    });
  }, [form, setForm]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.inputText}
        placeholder="Nome da conta"
        value={form.name}
        onChangeText={(value) => handleInputChange("name", value)}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Valor"
        keyboardType="number-pad"
        maxLength={15}
        value={form.amount}
        onChangeText={(value) => handleInputChange("amount", value)}
      />

      <View style={styles.groupButtons}>
        <RectButton style={styles.button} onPress={() => navigate("Chart")}>
          <Text style={styles.buttonText}>Gráfico</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Salvar</Text>
        </RectButton>
      </View>
    </View>
  );
};

export default FormAccount;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#21d1c8",
    paddingHorizontal: 50,
    paddingTop: 25,
    paddingBottom: 15,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },
  inputText: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    height: 50,
    padding: 15,
    borderRadius: 4,
  },
  groupButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
  },
});
