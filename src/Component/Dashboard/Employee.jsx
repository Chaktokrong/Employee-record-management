import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { textAlign, textTransform } from "@mui/system";
import { updateWith, upperCase } from "lodash";

import {
  GET_TOTAL_EMP,
  GET_STAFF_AMNISTRACTIVE,
  GET_ACADEMIC_STAFF,
  GET_TEACHING_STAFF,
  GET_INTERN_STAFF,
} from "../../Schema/Dashbord";
import { useQuery } from "@apollo/client";

export default function Employee() {
  let colorBar = ["red", "blue"];

  const [totalEmp, setTotalEmp] = useState();
  const { refecth: RFtotal } = useQuery(GET_TOTAL_EMP, {
    onCompleted: ({ getTotalEmp }) => {
      setTotalEmp(getTotalEmp[0]?.total);
      // console.log("getTotalEmp", getTotalEmp[0]?.total);
    },
  });

  const [adminstativeStaff, setAdminstative] = useState();
  const { refecth: RFadmin } = useQuery(GET_STAFF_AMNISTRACTIVE, {
    onCompleted: ({ getStaffInDepartmentAdminstrative }) => {
      setAdminstative(getStaffInDepartmentAdminstrative[0]?.total);
      // console.log("getStaffInDepartmentAdminstrative", getStaffInDepartmentAdminstrative);
    },
  });

  const [academicStaff, setAcademicStaff] = useState();
  const { refecth: RFacademic } = useQuery(GET_ACADEMIC_STAFF, {
    onCompleted: ({ getStaffInDepartmentAcademic }) => {
      setAcademicStaff(getStaffInDepartmentAcademic[0]?.total);
      // console.log("getStaffByStaff", getStaffByStaff);
    },
  });

  const [teachingStaff, setTeachingStaff] = useState();
  const { refecth: RFTeaching } = useQuery(GET_TEACHING_STAFF, {
    onCompleted: ({ getStaffByTeaching }) => {
      setTeachingStaff(getStaffByTeaching[0]?.total);
      // console.log("getStaffByTeaching", getStaffByTeaching);
    },
  });

  const [internStaff, setInternStaff] = useState();
  const { refecth: RFIntern } = useQuery(GET_INTERN_STAFF, {
    onCompleted: ({ getStaffByInternship }) => {
      setInternStaff(getStaffByInternship[0]?.total);
      // console.log("getStaffByInternship", getStaffByInternship);
    },
  });

  var options = {
    series: [
      {
        data: [
          totalEmp + 196,
          adminstativeStaff + 20,
          academicStaff + 50,
          teachingStaff + 67,
          internStaff + 10,
        ],
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
      categories: [
        ["Total staffs"],
        ["Adminstrative & Finance"],
        ["Academic Staffs"],
        ["Teaching Staffs"],
        ["Intern Ship"],
      ],
      labels: {
        rotate: 0,
      },
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <Typography sx={{}}>Employee Count By Position</Typography>
      <ReactApexChart
        options={options}
        series={options?.series}
        type="bar"
        height={300}
      />
    </Box>
  );
}
