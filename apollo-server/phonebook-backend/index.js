const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

let persons = [
  {
    name: 'Arto Hellas',
    phone: '040-123543',
    street: 'Tapiolankatu 5 A',
    city: 'Espoo',
    id: '3d594650-3436-11e9-bc57-8b80ba54c431',
  },
  {
    name: 'Matti Luukkainen',
    phone: '040-432342',
    street: 'Malminkaari 10 A',
    city: 'Helsinki',
    id: '3d599470-3436-11e9-bc57-8b80ba54c431',
  },
  {
    name: 'Venla Ruuska',
    street: 'Nallemäentie 22 C',
    city: 'Helsinki',
    id: '3d599471-3436-11e9-bc57-8b80ba54c431',
  },
]

const typeDefs = /*GraphQL*/ `

type Address{street: String!
city: String!
}

type Person {
name: String!
address: Address!
phone: String
id: ID!
}


enum YesNo { 
YES
NO
}

type Query {
personCount: Int!
allPersons(phone: YesNo): [Person!]!
findPerson(name: String!): Person
}

type Mutation{

changeNumber(
  
  
name: String!
phone: String!
): Person


addPerson(
 name: String!
phone: String
street: String!
city: String!
): Person
}
`

const throwError = (message, code, invalidArgs) => {
  throw new GraphQLError(message, {
    extensions: {
      code,
      invalidArgs,
    },
  })
}

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      return !args.phone
        ? persons
        : persons.filter((p) => (args.phone === 'YES' ? p.phone : !p.phone))
    },
    findPerson: (root, args) => persons.find((p) => p.name === args.name),
  },
  Person: {
    address: (root) => ({ city: root.city, street: root.street }),
  },
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find((p) => p.name === args.name)) {
        throw new GraphQLError('Name must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
          },
        })
      }
      persons = persons.concat({ ...args, id: uuid() })
      return persons[persons.length - 1]
    },
    changeNumber: (root, args) => {
      const person = persons.find((p) => p.name === args.name)
      if (!person) {
        throwError('User name cannot be found', 'SERVER_ERROR', args.name)
      }
      const editedPerson = { ...person, phone: args.phone }

      persons = persons.map((p, i) => (p.name === args.name ? editedPerson : p))
      return editedPerson
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`server ready at ${url}`)
})
