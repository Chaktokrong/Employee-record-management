import { gql } from "@apollo/client";

export const MAKE_EMPLOYEE_CONTRACT = gql`
  mutation MakeEmployeeContract($input: ContractInput!) {
    makeEmployeeContract(input: $input) {
      status
      message
    }
  }
`;

export const UPDATE_EMPOYEE_CONTRACT = gql`
  mutation EditEmployeeContract($input: editContractInput!) {
    editEmployeeContract(input: $input) {
      message
      status
    }
  }
`;

export const UPDATE_CONTRACT = gql`
  mutation MakeEmployeeContract($input: ContractInput!) {
    makeEmployeeContract(input: $input) {
      status
      message
    }
  }
`;

export const GET_CONTRACT_BY_EMPLOYEEID = gql`
  query GetContractByEmployeeId($getContractByEmployeeIdId: ID!) {
    getContractByEmployeeId(id: $getContractByEmployeeIdId) {
      _id
      title
      job_title {
        name
        _id
      }
      department {
        _id
        affair_name
      }
      office {
        _id
        office_name
      }
      section {
        _id
        section_name
      }
      schedule
      base_salary
      branch {
        _id
        branch_name
      }
      leave {
        _id
        type_name
        limit
        male_use_able
        female_use_able
        deduct_option
        deduct
        remark
        created_at
      }
      reference_file_src
      reference_file_name
      start_date
      end_date
      expire_status
      created_at
    }
  }
`;
