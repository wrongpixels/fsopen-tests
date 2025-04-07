const { ApolloServer } = require('@apollo/server')
const jwt = require('jsonwebtoken')
const { expressMiddleware } = require('@apollo/server/express4')
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')

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

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()
  app.use(cors())
  app.use(express.json())
  app.use(
    '/',
    expressMiddleware(server, {
      context: async ({ req }) => {
        const decodedToken = req?.headers?.authorization?.includes('Bearer ')
          ? jwt.verify(req.headers.authorization.substring(7), config.SECRET)
          : null
        if (decodedToken) {
          const currentUser = await User.findById(decodedToken.id).populate(
            'friends',
          )
          return { currentUser }
        }
      },
    }),
  )
  httpServer.listen(config.PORT, () =>
    console.log(`Server is really running on http://localhost:${config.PORT}`),
  )
}
start()
