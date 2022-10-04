import { gql } from "@apollo/client";

export const GET_PAYROLL_BY_MONTH = gql`
  query GetPayrollReview($annual: Int, $monthly: Int) {
    getPayrollReview(annual: $annual, monthly: $monthly) {
      emp_id
      salary
      work_day
      absence
      late
      fine
      total_salary
      ot
      bonus
      emp_name
      _id
      emp_image
    }
  }
`;

export const CREATE_PAYROLL_BY_MONTH = gql`
  mutation CreateSalary(
    $annual: Int
    $monthly: Int
    $data: [PayrollReviewInput]
  ) {
    createSalary(annual: $annual, monthly: $monthly, data: $data) {
      message
      status
    }
  }
`;
