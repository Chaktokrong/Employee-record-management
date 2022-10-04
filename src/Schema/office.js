import { gql } from "@apollo/client";

//====Create Office=====//
export const CREATE_OFFICE = gql`
  mutation CreateOffice($input: OfficeInput) {
    createOffice(input: $input) {
      status
      message
    }
  }
`;

export const UPDATE_OFFICE = gql`
  mutation Mutation($input: OfficeUpdate) {
    updateOffice(input: $input) {
      status
      message
    }
  }
`;
export const DELETE_OFFICE = gql`
  mutation Mutation($deleteOfficeId: ID) {
    deleteOffice(id: $deleteOfficeId) {
      status
      message
    }
  }
`;

export const GET_OFFICE = gql`
  query GetOffice {
    getOffice {
      _id
      name
      affair_id
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
      }
      description
      image {
        src
        name
      }
      created_at
    }
  }
`;

export const GET_OFFICE_IN_OFFAIR = gql`
  query GetOfficeInAffair($affairId: ID) {
    getOfficeInAffair(Affair_id: $affairId) {
      _id
      office_name
      affair_id
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
      }
      image {
        src
        name
      }
      office_description
      created_at
    }
  }
`;
