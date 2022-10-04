import { Box, Stack, Typography } from "@mui/material";
import "./payrollemployee.scss";
import ReactApexChart from "react-apexcharts";

export default function PayrollEmployee() {
  const state = {
    series: [
      {
        name: "Revenue",
        data: [44, 21, 57, 56, 10, 58],
      },
      {
        name: "Expense",
        data: [23, 55, 76, 30, 61, 34],
      },
    ],

    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "65%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["January", "Februay", "March", "April", "May", "June"],
      },
      fill: {
        opacity: 1,
        colors: ["#26A0FC", "#7CDBA8"],
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val;
          },
        },
      },
    },
  };

  return (
    <>
      <Box className="payroll-employee">
        <Typography className="employee-overview-header">
          Payroll Per Month
        </Typography>

        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={320}
        />
      </Box>
    </>
  );
}
