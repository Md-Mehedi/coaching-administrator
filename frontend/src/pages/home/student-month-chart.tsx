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

export function StudentMonthChart() {
  let temp = [
    { month: "September", count: 2 },
    { month: "October", count: 3 },
    { month: "November", count: 4 },
    { month: "December", count: 7 },
    { month: "January", count: 15 },
    { month: "February", count: 14 },
    { month: "March", count: 8 },
    { month: "April", count: 10 },
    { month: "May", count: 11 },
    { month: "June", count: 11 },
    { month: "July", count: 15 },
    { month: "August", count: 20 },
  ];

  useEffect(() => {}, []);

  return (
    <Card className="chart">
      <CardContent style={{ textAlign: "center" }}>
        <Chart palette="Violet" dataSource={temp}>
          <CommonSeriesSettings argumentField="month" type="line" />
          {/* {energySources.map((item) => ( */}
          <Series valueField="count" name="Count" />
          {/* ))} */}
          <ValueAxis>
            <Title text="Count" />
          </ValueAxis>
          <Margin bottom={20} />
          <ArgumentAxis
            valueMarginsEnabled={false}
            discreteAxisDivisionMode="crossLabels"
          >
            <Grid visible={true} />
          </ArgumentAxis>
          <Legend
            visible={false}
            verticalAlignment="bottom"
            horizontalAlignment="center"
            itemTextPosition="bottom"
          />
          <Export enabled={true} />
          <Title text="Students" />
          <Tooltip enabled={true} />
        </Chart>
      </CardContent>
    </Card>
  );
}
