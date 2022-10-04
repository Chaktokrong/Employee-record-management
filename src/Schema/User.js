import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: userInput) {
    createUser(input: $input) {
      status
      message
    }
  }
`;

export const GET_USER = gql`
  query GetUser {
    getUser {
      status
      message
      data {
        _id
        first_name
        last_name
        email
        role
        created_At
        image {
          src
          name
        }
      }
    }
  }
`;

export const GET_USER_WITH_PAGINATION = gql`
  query GetUserPagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
  ) {
    getUserPagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
    ) {
      users {
        _id
        first_name
        last_name
        email
        role
        created_at
        image {
          src
          name
        }
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

export const UPDATE_USER = gql`
  mutation UpdateUser($input: userUpdate) {
    updateUser(input: $input) {
      status
      message
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID) {
    deleteUser(id: $deleteUserId) {
      status
      message
    }
  }
`;

export const GET_USER_LOGIN = gql`
  query GetUserLogin {
    getUserLogin {
      _id
      first_name
      last_name
      email
      role
      image {
        src
        name
      }
    }
  }
`;
