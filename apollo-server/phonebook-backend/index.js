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
  createUser(username: String!    
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

  addAsFriend(
    name: String!
  ): User
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
    throwError(e.message, 'BAD_USER_INPUT', value, e)
  }
}

const checkLogged = (currentUser) => {
  if (!currentUser) {
    throwError(
      'You need to be logged in in order to add friends!',
      'AUTHENTICATION_ERROR',
      '',
    )
  }
}

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      return !args.phone ? Person.find({}) : Person.find({ phone: args.phone })
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
    me: (root, args, { currentUser }) => currentUser,
  },
  Person: {
    address: (root) => ({ city: root.city, street: root.street }),
  },
  Mutation: {
    addAsFriend: async (root, { name }, { currentUser }) => {
      checkLogged(currentUser)
      const personToAdd = await Person.findOne({ name })
      if (!personToAdd) {
        throwError('No user found with provided name', 'INPUT_ERROR', 'name')
      }
      if (
        currentUser.friends.find(
          (f) => f._id.toString() === personToAdd._id.toString(),
        )
      ) {
        throwError('User is already a friend!', 'INPUT_ERROR', 'name')
      }
      currentUser.friends = currentUser.friends.concat(personToAdd)
      await trySave(currentUser)
      return currentUser
    },

    createUser: async (root, { username, password = null }) => {
      if (!username) {
        throwError('Missing username', 'MISSING_DATA', username)
      }
      if (await User.findOne({ username })) {
        throwError('Username already exists!', 'BAD_USER_INPUT', username)
      }
      return trySave(new User({ username }), 'user')
    },

    login: async (root, { username, password }) => {
      const user = await User.findOne({ username })
      if (!user || password !== 'secret') {
        throwError('Login data is so wrong!', 'WRONG_CREDENTIALS', '')
      }
      const tokenData = { username, id: user._id }
      return { value: jwt.sign(tokenData, config.SECRET) }
    },

    addPerson: async (root, args, { currentUser }) => {
      checkLogged(currentUser)
      const existing = currentUser.friends.find((f) => f.name === args.name)
      if (existing) {
        throwError(
          'Friend with same name already exists!',
          'BAD_USER_INPUT',
          args.name,
        )
      }
      const newPerson = new Person({ ...args })
      currentUser.friends = currentUser.friends.concat(newPerson)
      await trySave(currentUser, 'current user')
      return trySave(newPerson, 'new person')
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
        },
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
  context: async ({ req, res }) => {
    const decodedToken = req?.headers?.authorization?.startsWith('Bearer ')
      ? jwt.verify(req.headers.authorization.substring(7), config.SECRET)
      : null
    const currentUser = decodedToken
      ? await User.findById(decodedToken.id).populate('friends')
      : null
    return { currentUser }
  },
}).then(({ url }) => {
  console.log(`server ready at ${url}`)
})
