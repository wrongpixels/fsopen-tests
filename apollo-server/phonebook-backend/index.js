const { ApolloServer } = require('@apollo/server')
const jwt = require('jsonwebtoken')
const { startStandaloneServer } = require('@apollo/server/standalone')
const config = require('./utils/config')
const mongoose = require('mongoose')
const User = require('./models/user')
const resolvers = require('./resolvers')
const typeDefs = require('./schema')

const MONGODB_URI = config.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to Mongoose'))
  .catch((e) => console.log('error', e.message))

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: config.PORT },
  context: async ({ req }) => {
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
