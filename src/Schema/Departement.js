import { gql } from "@apollo/client";

export const CREATE_DEPARTEMENT = gql`
  mutation CreateAffair($input: AffairInput) {
    createAffair(input: $input) {
      status
      message
    }
  }
`;

export const GET_QUERY_DEPARTMENT = gql`
  query GetAffair($keyword: String!) {
    getAffair(keyword: $keyword) {
      _id
      affair_name
      affair_description
      head {
        _id
        khmer_name {
          first_name
          last_name
        }
        latin_name {
          first_name
          last_name
        }
        image {
          src
          name
        }
      }
      image {
        src
        name
      }
      total_emp
      total_office
      created_at
    }
  }
`;

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateAffair($input: AffairUpdate) {
    updateAffair(input: $input) {
      status
      message
    }
  }
`;

export const DELETE_DEPARTMENT = gql`
  mutation DeleteAffair($deleteAffairId: ID) {
    deleteAffair(id: $deleteAffairId) {
      status
      message
    }
  }
`;
