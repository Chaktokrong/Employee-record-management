import { gql } from "@apollo/client";

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($input: EmployeeInput) {
    createEmployee(input: $input) {
      status
      message
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($input: EmployeeUpdate) {
    updateEmployee(input: $input) {
      status
      message
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation Mutation($deleteEmployeeId: ID) {
    deleteEmployee(id: $deleteEmployeeId) {
      status
      message
    }
  }
`;

export const GET_EMPLOYEE_WITH_PAGINATION = gql`
  query GetEmployeePagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
  ) {
    getEmployeePagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
    ) {
      data {
        _id
        national_id
        employee_id
        khmer_name {
          first_name
          last_name
        }
        latin_name {
          first_name
          last_name
        }
        gender
        image {
          src
          name
        }
        date_of_birth
        place_of_birth
        nationality
        join_date
        phone
        email
        current_address
        role
        branch {
          _id
          branch_name
          description
          longitude
          latitude
        }
        insurance {
          key
          start_end_date
          title
        }
        experience {
          start_end_date
          title
          company
          key
        }
        edu_background {
          start_end_date
          title
          school
          key
        }
        working_status
        type
        marital
        work_book
        work_permit {
          work_permit_name
          expire_date
          key
        }
        taxable_salary {
          federation_and_dependent_children
          confirmation_document {
            src
            name
          }
        }
        shift
        created_at
      }
      paginator {
        slNo
        prev
        next
        perPage
        totalPosts
        totalPages
        currentPage
        hasPrevPage
        hasNextPage
        totalDocs
      }
    }
  }
`;

export const GET_EMPLOYEE_BYID = gql`
  query GetEmployeeById($getEmployeeByIdId: ID!) {
    getEmployeeById(id: $getEmployeeByIdId) {
      _id
      national_id
      employee_id
      khmer_name {
        first_name
        last_name
      }
      gender
      date_of_birth
      place_of_birth
      nationality
      join_date
      phone
      latin_name {
        first_name
        last_name
      }
      image {
        src
        name
      }
      email
      current_address
      role
      branch {
        _id
        branch_name
        description
        longitude
        latitude
        created_at
      }
      insurance {
        key
        start_end_date
        title
      }
      experience {
        start_end_date
        title
        company
        key
      }
      edu_background {
        start_end_date
        title
        school
        key
      }
      working_status
      type
      marital
      work_book
      work_permit {
        work_permit_name
        expire_date
        key
      }
      taxable_salary {
        federation_and_dependent_children
        confirmation_document {
          src
          name
        }
      }
      office
      section
      job_title
      shift
      created_at
    }
  }
`;

export const GET_EMPLOYEE_BY_SECTIONID = gql`
  query GetEmpBySectionId($sectionId: ID) {
    getEmpBySectionId(section_id: $sectionId) {
      _id
      national_id
      employee_id
      khmer_name {
        first_name
        last_name
      }
      latin_name {
        first_name
        last_name
      }
      job_title
      gender
      image {
        src
        name
      }
      date_of_birth
      place_of_birth
      nationality
      shift
      join_date
      phone
      email
      role
      branch {
        _id
        branch_name
        description
        longitude
        latitude
        created_at
      }
      department {
        key
        affair_name
        office_name
        section_name
        affair_id {
          _id
          name
          description
          image {
            src
            name
          }
          created_at
        }
        office_id {
          _id
          name
        }
        section_id {
          _id
          name
        }
      }
      insurance {
        key
        start_end_date
        title
      }
      experience {
        start_end_date
        title
        company
        key
      }
      edu_background {
        start_end_date
        title
        school
        key
      }
      working_status
      contract {
        contract_type
        start_date
        end_date
        in_position
        salary
        public_holiday
        annual_leave
        using
        key
      }
      type
      marital
      work_book
      work_permit {
        work_permit_name
        expire_date
        key
      }
      taxable_salary {
        federation_and_dependent_children
        confirmation_document {
          src
          name
        }
      }
      created_at
    }
  }
`;
