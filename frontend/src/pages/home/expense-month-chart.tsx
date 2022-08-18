import { Card, CardContent, Select, MenuItem } from "@mui/material";
import axios from "axios";
import {
  Grid,
  ArgumentAxis,
  Border,
  Chart,
  CommonSeriesSettings,
  Export,
  Legend,
  Margin,
  ScrollBar,
  Series,
  Title,
  Tooltip,
  ValueAxis,
  ZoomAndPan,
  // @ts-ignore
} from "devextreme-react/chart";
import React, { useEffect, useState } from "react";

export function ExpenseMonthChart() {
  let temp = [
    { month: "September", count: 200 },
    { month: "October", count: 100 },
    { month: "November", count: 2000 },
    { month: "December", count: 1200 },
    { month: "January", count: 1500 },
    { month: "February", count: 1000 },
    { month: "March", count: 500 },
    { month: "April", count: 300 },
    { month: "May", count: 500 },
    { month: "June", count: 600 },
    { month: "July", count: 400 },
    { month: "August", count: 700 },
  ];

  useEffect(() => {}, []);

  return (
    <Card className="chart">
      <CardContent style={{ textAlign: "center" }}>
        <Chart palette="Violet" dataSource={temp}>
          <CommonSeriesSettings argumentField="month" type="line" />
          {/* {energySources.map((item) => ( */}
          <Series valueField="count" name="Amount (in TK)" />
          {/* ))} */}
          <Margin bottom={20} />
          <ArgumentAxis
            valueMarginsEnabled={false}
            discreteAxisDivisionMode="crossLabels"
          >
            <Grid visible={true} />
          </ArgumentAxis>
          <Legend
            verticalAlignment="bottom"
            horizontalAlignment="center"
            itemTextPosition="bottom"
          />
          <Export enabled={true} />
          <Title text="Expense" />
          <Tooltip enabled={true} />
        </Chart>
      </CardContent>
    </Card>
  );
}
