const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const Person = require('./models/person')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const config = require('./utils/config')

const pubsub = new PubSub()

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
      ''
    )
  }
}

const resolvers = {
  Query: {
    personCount: async () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      console.log('Person.find')

      return !args.phone
        ? Person.find({}).populate('friendOf')
        : Person.find({ phone: args.phone }).populate('friendOf')
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
          (f) => f._id.toString() === personToAdd._id.toString()
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
          args.name
        )
      }
      const newPerson = new Person({ ...args })
      currentUser.friends = currentUser.friends.concat(newPerson)
      await trySave(currentUser, 'current user')
      pubsub.publish('PERSON_ADDED', { personAdded: newPerson })
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
        }
      )
    },
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterableIterator('PERSON_ADDED'),
    },
  },
}

module.exports = resolvers
