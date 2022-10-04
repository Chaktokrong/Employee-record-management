import { gql } from "@apollo/client";

export const GET_EMPLOYEE_OVERVIEW = gql`
  query GetEmployeeOverview {
    getEmployeeOverview {
      total
      totalFemale
    }
  }
`;

export const GET_EMPLOYEE_FOREIGNER = gql`
  query GetEmployeeForeigner {
    getEmployeeForeigner {
      total
      totalFemale
    }
  }
`;

export const GET_QUERY_NEWSTAFF = gql`
  query Query {
    getNewStaff
  }
`;

export const GET_QUERY_RESIGN_STAFF = gql`
  query GetEmpResign {
    getEmpResign {
      total
    }
  }
`;

export const GET_QUERY_ABSENCE_PERMISSION = gql`
  query Query {
    getEmpPermission
  }
`;

export const GET_QUERY_ABSENCE_NOT_PAY = gql`
  query Query {
    getEmpAbsence
  }
`;

export const GET_TOTAL_EMP = gql`
  query GetTotalEmp {
    getTotalEmp {
      total
    }
  }
`;

export const GET_STAFF_AMNISTRACTIVE = gql`
  query GetStaffInDepartmentAdminstrative {
    getStaffInDepartmentAdminstrative {
      total
    }
  }
`;

export const GET_ACADEMIC_STAFF = gql`
  query GetStaffInDepartmentAcademic {
    getStaffInDepartmentAcademic {
      total
    }
  }
`;

export const GET_TEACHING_STAFF = gql`
  query GetStaffByTeaching {
    getStaffByTeaching {
      total
    }
  }
`;

export const GET_INTERN_STAFF = gql`
  query GetStaffByInternship {
    getStaffByInternship {
      total
    }
  }
`;

export const GET_EMPLOYEE_COUNT_BY_OFFICE = gql`
  query GetEmployeeCountByOffice {
    getEmployeeCountByOffice {
      values
      labels
    }
  }
`;

export const GET_CONTRACT_REMINDER = gql`
  query GetContractReminder {
    getContractReminder {
      employee_Object_id
      title
      job_title
      branch
      department
      office
      section
      schedule
      base_salary
      leave
      reference_file_src
      reference_file_name
      start_date
      end_date
    }
  }
`;
