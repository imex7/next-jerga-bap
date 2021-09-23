const express = require('express')
const next = require('next')
const { ApolloServer, gql } = require('apollo-server-express')
const {
  ApolloServerPluginDrainHttpServer,
} = require('apollo-server-core')
const {
  portfolioQueries,
  portfolioMutations,
} = require('./graphql/resolvers')
const { portfolioTypes } = require('./graphql/types')

const port = parseInt(process.env.PORT, 10) || 7005
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const typeDefs = gql`
      ${portfolioTypes}
      type Query {
        hello: String
        portfolio(id: ID): Portfolio
        portfolios: [Portfolio]
      }
      type Mutation {
        createPortfolio(portfolio: PortfolioInput): Portfolio
        updatePortfolio(id: ID, portfolio: PortfolioInput): Portfolio
        deletePortfolio(id: ID): [Portfolio]
      }
    `

    const resolvers = {
      Query: {
        ...portfolioQueries,
      },
      Mutation: {
        ...portfolioMutations,
      },
    }

    async function startApolloServer(typeDefs, resolvers) {
      const server = express()
      const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
          ApolloServerPluginDrainHttpServer({ httpServer: server }),
        ],
      })
      await apolloServer.start()
      apolloServer.applyMiddleware({ app: server })
      server.all('*', (req, res) => {
        return handle(req, res)
      })
      await new Promise((resolve) => server.listen({ port }, resolve))
      console.log(
        `>>> Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
      )
    }
    startApolloServer(typeDefs, resolvers)
  })
  .catch((err) => {
    console.log(
      `===========================================================`
    )
    console.log(err)
  })
