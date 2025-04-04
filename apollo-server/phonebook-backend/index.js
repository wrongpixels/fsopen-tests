const { ApolloServer } = require('@apollo/server')
const jwt = require('jsonwebtoken')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const config = require('./utils/config')
const mongoose = require('mongoose')
const Person = require('./models/person')
const User = require('./models/user')

const MONGODB_URI = config.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to Mongoose'))
  .catch((e) => console.log('error', e.message))

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

type User {
  username: String!,
  friends: [Person!]!,
  id: ID!
}

type Token {
  value: String!
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
  me: User
}

type Mutation{  
  addUser(username: String!    
  ): User
  
  login(username: String!
    password: String!
  ): Token

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

const throwError = (message, code, invalidArgs, error = null) => {
  throw new GraphQLError(message, {
    extensions: {
      code,
      invalidArgs,
      error,
    },
  })
}

const trySave = async (person, value = 'value') => {
  try {
    await person.save()
    return person
  } catch (e) {
    throwError(`Saving ${value} failed`, 'BAD_USER_INPUT', value, e)
  }
}

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      return !args.phone ? Person.find({}) : Person.find({ phone: args.phone })
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
  },
  Person: {
    address: (root) => ({ city: root.city, street: root.street }),
  },
  Mutation: {
    createUser: async (root, { username, password = null }) => {
      if (!username) {
        throwError('Missing username', 'MISSING_DATA', username)
      }
      if (await User.findOne({ username })) {
        throwError('Username already exists!', 'BAD_USER_INPUT', username)
      }
      return trySave(new Person({ username }), 'user')
    },

    addPerson: async (root, args) => {
      const existing = await Person.findOne({ name: args.name })
      if (existing) {
        throwError('Person already exists!', 'BAD_USER_INPUT', args.name)
      }
      const newPerson = new Person({ ...args })
      return trySave(newPerson, 'person')
    },
    changeNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name })
      if (!person) {
        throwError('User name cannot be found', 'SERVER_ERROR', args.name)
      }

      return Person.findOneAndUpdate(
        { name: args.name },
        { phone: args.phone },
        {
          new: true,
          runValidators: true,
          context: 'query',
        }
      )
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: config.PORT },
}).then(({ url }) => {
  console.log(`server ready at ${url}`)
})
