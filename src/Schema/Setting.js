import { gql } from "@apollo/client";

export const CREATE_PUBLIC_HOLIDAY = gql`
  mutation Mutation($input: PublicHolidayInput) {
    createPublicHoliday(input: $input) {
      status
      message
    }
  }
`;

export const UPDATE_PUBLIC_HOLIDAY = gql`
  mutation Mutation($input: PublicHolidayUpdate) {
    updatePublicHoliday(input: $input) {
      status
      message
    }
  }
`;

export const DELETE_PUBLIC_HOLIDAY = gql`
  mutation Mutation($deletePublicHolidayId: ID) {
    deletePublicHoliday(id: $deletePublicHolidayId) {
      status
      message
    }
  }
`;

export const GET_PUBLIC_HOLIDAY = gql`
  query Query {
    getPublicHoliday {
      _id
      holiday_name
      holiday_date
      in_month
      remark
      created_at
    }
  }
`;

export const GET_TYPE_OF_TIMEOFF = gql`
  query GetTypeOfTimeOff {
    getTypeOfTimeOff {
      _id
      type_name
      limit
      male_use_able
      female_use_able
      remark
      created_at
    }
  }
`;

export const GET_BRANCH = gql`
  query Query($page: Int, $limit: Int, $keyword: String, $pagination: Boolean) {
    getBranchPagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
    ) {
      branch {
        _id
        branch_name
        description
        longitude
        latitude
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

export const CREATE_BRANCH = gql`
  mutation Mutation($input: BranchInput) {
    createBranch(input: $input) {
      status
      message
    }
  }
`;

export const UPDATE_BRANCH = gql`
  mutation UpdateBranch($updateBranchId: ID!, $input: BranchInput) {
    updateBranch(id: $updateBranchId, input: $input) {
      status
      message
    }
  }
`;

export const DELETE_BRANCH = gql`
  mutation Mutation($deleteBranchId: ID!) {
    deleteBranch(id: $deleteBranchId) {
      status
      message
    }
  }
`;

export const CREATE_TYPE_OF_TIME_OFF = gql`
  mutation CreateTypeOfTimeOff($input: TypeOfTimeOffInput) {
    createTypeOfTimeOff(input: $input) {
      message
      status
    }
  }
`;

export const UPDATE_TYPE_OF_TIME_OFF = gql`
  mutation Mutation($id: ID!, $input: TypeOfTimeOffInput) {
    updateTypeOfTimeOff(_id: $id, input: $input) {
      message
      status
    }
  }
`;

export const DELETE_TYPE_OF_TIME_OFF = gql`
  mutation DeleteTypeOfTimeOff($deleteTypeOfTimeOffId: ID) {
    deleteTypeOfTimeOff(id: $deleteTypeOfTimeOffId) {
      message
      status
    }
  }
`;

export const GET_TYPE_OF_TIME_OFF = gql`
  query Query {
    getTypeOfTimeOff {
      _id
      type_name
      limit
      male_use_able
      female_use_able
      remark
      created_at
      deduct_option
      deduct
    }
  }
`;
