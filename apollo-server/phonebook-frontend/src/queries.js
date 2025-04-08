import { gql } from '@apollo/client'

const PERSON_DETAILS = gql`
  fragment PersonDetails on Person {
    name
    phone
    id
  }
`
const FULL_PERSON_DETAILS = gql`
  fragment FullPersonDetails on Person {
    name
    phone
    id
    address {
      street
      city
    }
  }
`

export const ALL_PERSONS = gql`
  query {
    allPersons {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`

export const FIND_PERSON = gql`
  query findByName($personToFind: String!) {
    findPerson(name: $personToFind) {
      ...FullPersonDetails
    }
  }
  ${FULL_PERSON_DETAILS}
`

export const LOGIN = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
export const PERSON_ADDED = gql`
  subscription {
    personAdded {
      ...FullPersonDetails
    }
  }
  ${FULL_PERSON_DETAILS}
`

export const ADD_PERSON = gql`
  mutation addByName(
    $name: String!
    $phone: String
    $city: String!
    $street: String!
  ) {
    addPerson(name: $name, phone: $phone, street: $street, city: $city) {
      ...FullPersonDetails
    }
  }
  ${FULL_PERSON_DETAILS}
`
export const EDIT_NUMBER = gql`
  mutation replaceNumber($name: String!, $phone: String!) {
    changeNumber(name: $name, phone: $phone) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`
