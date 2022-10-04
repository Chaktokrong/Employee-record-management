import * as React from "react";
import ReactApexChart from "react-apexcharts";
import { Box, Typography, Stack } from "@mui/material";
import "./staffattendancechart.scss";

export default function StaffAttendanceChart() {
  const state = {
    series: [44, 55, 41, 17],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Present", "Permission", "Late", "Absent"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 250,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],

      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        formatter: function (val, opts) {
          let newVal = val.toFixed(2) + "%";
          return newVal;
        },
        style: {
          fontSize: "12px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: "bold",
          colors: ["white", "blue", "black", "yellow"],
        },
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: "#000",
          opacity: 0.45,
        },
      },
      tooltip: {
        enabled: true,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          //   console.log(series, seriesIndex, w.globals.labels[dataPointIndex]);
          return (
            '<div class="arrow_box">' +
            "<span>" +
            w.globals.labels[seriesIndex] +
            ": " +
            series[seriesIndex] +
            " Peoples" +
            "</span>" +
            "</div>"
          );
        },
      },
    },
  };

  return (
    <Box className="staff-attendance-chart">
      <Typography className="employee-overview-header">
        Daily Attendance
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Stack id="chart" direction="row" justifyContent="center">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="donut"
          width={420}
        />
      </Stack>
    </Box>
  );
}
