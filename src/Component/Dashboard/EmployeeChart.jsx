import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { textAlign, textTransform } from "@mui/system";
import { updateWith, upperCase } from "lodash";
import "./employeechart.scss";
import { GET_EMPLOYEE_COUNT_BY_OFFICE } from "../../Schema/Dashbord";
import { useQuery } from "@apollo/client";
import LoadingPage from "../Include/LoadingPage";

import {
  GET_TOTAL_EMP,
  GET_STAFF_AMNISTRACTIVE,
  GET_ACADEMIC_STAFF,
  GET_TEACHING_STAFF,
  GET_INTERN_STAFF,
} from "../../Schema/Dashbord";

export default function EmployeeChart() {
  //
  const [loading, setLoading] = useState(true);
  const [dataLabels, setDataLabels] = useState([]);
  const [dataValues, setDataValues] = useState([]);

  const { data, refetch } = useQuery(GET_EMPLOYEE_COUNT_BY_OFFICE, {
    onCompleted: ({ getEmployeeCountByOffice }) => {
      setDataLabels(getEmployeeCountByOffice?.labels);
      setDataValues(getEmployeeCountByOffice?.values);
      setLoading(false);
    },
    onError: (error) => {
      console.log(error.message);
      setLoading(true);
    },
  });

  let colorBar = ["red", "blue"];

  var options = {
    series: [
      {
        data: dataValues,
      },
    ],
    chart: {
      labelDisplay: "none",
      height: 350,
      type: "bar",
      colors: colorBar,
      events: {
        click: function (chart, w, e) {},
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: dataLabels,
      labels: {
        rotate: 0,
      },
    },
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Box className="employee-chart">
      <Typography className="employee-overview-header">
        Employee Count By Office
      </Typography>
      {loading ? (
        <LoadingPage />
      ) : (
        <ReactApexChart
          options={options}
          series={options?.series}
          type="bar"
          height={300}
        />
      )}
    </Box>
  );
}
