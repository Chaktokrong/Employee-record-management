import { gql } from "@apollo/client";

export const CREATE_JOB_TITLE = gql`
  mutation CreateJobTitle($name: String!, $description: String) {
    createJobTitle(name: $name, description: $description) {
      status
      message
    }
  }
`;

export const DELETE_JOB_TITLE = gql`
  mutation DeleteJobTitle($deleteJobTitleId: String!) {
    deleteJobTitle(id: $deleteJobTitleId) {
      status
      message
    }
  }
`;

export const UPDATE_JOB_TITLE = gql`
  mutation UpdateJobTitle(
    $updateJobTitleId: String!
    $name: String!
    $description: String
  ) {
    updateJobTitle(
      id: $updateJobTitleId
      name: $name
      description: $description
    ) {
      status
      message
    }
  }
`;

export const GET_JOB_TITLE_WITH_PAGINATION = gql`
  query GetJobTitlesPagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
  ) {
    getJobTitlesPagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
    ) {
      jobTitles {
        _id
        name
        description
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
