import { gql } from "@apollo/client";

export const CREATE_SECTION = gql`
  mutation CreateSection($input: SectoinInput) {
    createSection(input: $input) {
      status
      message
    }
  }
`;

export const UPDATE_SECTION = gql`
  mutation UpdateSection($input: sectoinUpdate) {
    updateSection(input: $input) {
      status
      message
    }
  }
`;

export const DELETE_SECTION = gql`
  mutation DeleteSection($deleteSectionId: ID!) {
    deleteSection(id: $deleteSectionId) {
      status
      message
    }
  }
`;

export const GET_QUERY_SECTION = gql`
  query GetSection {
    getSection {
      _id
      name
      office_id {
        _id
        name
        affair_id
        description
        image {
          src
          name
        }
        created_at
      }
      description
      image {
        src
        name
      }
    }
  }
`;

export const GET_SECTION = gql`
  query GetSection {
    getSection {
      status
      message
      data {
        _id
        name
        description
        image {
          src
          name
        }
        created_At
      }
    }
  }
`;

export const GET_SECTION_IN_OFFICE = gql`
  query GetSectionInOffice($inOffice: ID!) {
    getSectionInOffice(in_office: $inOffice) {
      _id
      section_name
      in_office {
        _id
        office_name
        affair_id
      }
      section_description
      created_at
    }
  }
`;
