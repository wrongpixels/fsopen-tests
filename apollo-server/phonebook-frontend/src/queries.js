import { gql } from '@apollo/client'

const basic = `
  name
phone
id
`
const address = `address {
street
city
}`

const regularSchema = (full = false) => {
  return !full ? basic : basic + address
}

export const ALL_PERSONS = gql`
  query {
    allPersons {
      ${regularSchema()}
    }
  }
`

export const FIND_PERSON = gql`
  query  findByName($personToFind: String!) {
    findPerson(name: $personToFind) {
      ${regularSchema(true)}
    }
  }
`

export const ADD_PERSON = gql`
mutation addByName ($name: String!, $phone: String, $city: String!, $street: String!) {
  addPerson(name: $name, phone: $phone, street: $street, city: $city){
     ${regularSchema(true)}
  }
}
`
export const EDIT_NUMBER = gql`
  mutation replaceNumber($name: String!, $phone: String!){
    changeNumber(name: $name, phone: $phone){
      ${regularSchema()}
    }
  } 
`
