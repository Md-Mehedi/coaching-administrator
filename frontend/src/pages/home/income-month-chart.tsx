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

export function IncomeMonthChart() {
  let temp = [
    { month: "September", count: 22000 },
    { month: "October", count: 10000 },
    { month: "November", count: 32000 },
    { month: "December", count: 12200 },
    { month: "January", count: 17000 },
    { month: "February", count: 25000 },
    { month: "March", count: 12000 },
    { month: "April", count: 30000 },
    { month: "May", count: 15000 },
    { month: "June", count: 26000 },
    { month: "July", count: 19500 },
    { month: "August", count: 17000 },
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
          <Title text="Income" />
          <Tooltip enabled={true} />
        </Chart>
      </CardContent>
    </Card>
  );
}
