import React from "react";

import { useNavigation } from "@react-navigation/native";

import FiIcon from "@expo/vector-icons/Feather";

import { StyleSheet, View, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <RectButton style={styles.button} onPress={goBack}>
        <FiIcon name="chevron-left" size={30} color="#ffffff" />
      </RectButton>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "#21d1c8",
  },
  button: {
    padding: 5,
  },
  title: {
    flex: 1,
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 15,
  },
});
