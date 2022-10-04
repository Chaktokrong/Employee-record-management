import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation AddProject($input: inputProject!) {
    addProject(input: $input) {
      status
      message
    }
  }
`;

export const GET_PROJECT_WITH_PAGINAION = gql`
  query GetProjectWithPagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
  ) {
    getProjectWithPagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
    ) {
      data {
        _id
        title
        description
        asign_to {
          _id
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
        labels {
          _id
          image {
            src
            name
          }
          created_at
          affair_name
          affair_description
          total_emp
          total_office
        }
        progress
        priority
        start_date
        end_date
        tasks {
          _id
          title
          complete
          created_at
        }
        task_progress
        activities {
          _id
          action_by {
            _id
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
          description
          created_at
        }
        created_by {
          _id
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
        updated_by {
          _id
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

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($input: inputProjectUpdate!) {
    updateProject(input: $input) {
      status
      message
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($deleteProjectId: String!) {
    deleteProject(id: $deleteProjectId) {
      status
      message
    }
  }
`;
