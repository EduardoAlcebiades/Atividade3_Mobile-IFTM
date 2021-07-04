import React, { useMemo, useContext } from "react";

import { LineChart } from "react-native-chart-kit";
import { ChartConfig } from "react-native-chart-kit/dist/HelperTypes";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";
import {
  StatusBar,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";

import FiIcon from "@expo/vector-icons/Feather";

import { AccountContext } from "../context/AccountContext";

import Header from "../components/Header";

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 6,
  },
};

function Chart() {
  const { accounts } = useContext(AccountContext);

  const dataChart = useMemo<LineChartData>(() => {
    const labels: string[] = [];
    const data: number[] = [];

    accounts.forEach((account) => {
      labels.push(account.name.split(" ")[0]);
      data.push(Number(account.amount) / 1000);
    });

    return {
      labels,
      datasets: [{ data }],
    };
  }, [accounts]);

  const propsForDots = useMemo<ChartConfig["propsForDots"]>(() => {
    return {
      r: dataChart.labels.length,
      strokeWidth: "2",
      stroke: "#ffa726",
    };
  }, [dataChart]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Contas cadastradas" />

      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <FiIcon name="info" size={18} color="#fb8c00" />

          <Text style={styles.text}>
            Lista com todas as contas e seus respectivos valores
          </Text>
        </View>

        <LineChart
          data={dataChart}
          style={styles.chart}
          width={Dimensions.get("window").width - 30}
          height={250}
          yAxisLabel="R$ "
          yAxisSuffix="k"
          chartConfig={{ ...chartConfig, propsForDots }}
          bezier
        />
      </View>
    </SafeAreaView>
  );
}

export default Chart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#f0f0f7",
  },
  content: {
    flex: 1,
    padding: 15,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
    marginVertical: 30,
    fontSize: 15,
    color: "#505050",
  },
  chart: {
    alignSelf: "center",
    marginVertical: 8,
    borderRadius: 6,
  },
});
