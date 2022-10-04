import { gql } from "@apollo/client";

export const CREATE_SHIFT = gql`
  mutation CreateShift($input: ShiftInput) {
    createShift(input: $input) {
      status
      message
    }
  }
`;

export const GET_SHIFT_WITH_PAGINATION = gql`
  query GetShiftPagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
    $requestType: String
    $status: String
  ) {
    getShiftPagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
      request_type: $requestType
      status: $status
    ) {
      shift {
        _id
        request_type
        all_day
        type_of_timeoff {
          _id
          type_name
          limit
          male_use_able
          female_use_able
          remark
          created_at
        }
        start_date
        end_date
        start_time
        end_time
        reason
        status
        status_date
        reply {
          text
          character {
            _id
            national_id
            employee_id
            khmer_name {
              first_name
              last_name
            }
          }
        }
        created_by {
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
        }
        approved_by {
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
        }
        created_at
      }
      Paginator {
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

export const UPDATE_SHIFT = gql`
  mutation UpdateShift($id: ID!, $input: ShiftInput) {
    updateShift(_id: $id, input: $input) {
      status
      message
    }
  }
`;

export const DELETE_SHIFT = gql`
  mutation DeleteShift($deleteShiftId: ID!) {
    deleteShift(id: $deleteShiftId) {
      status
      message
    }
  }
`;
