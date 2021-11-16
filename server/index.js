const express = require('express')
const next = require('next')
const { model } = require('mongoose')
const { ApolloServer, gql } = require('apollo-server-express')
const {
  ApolloServerPluginDrainHttpServer,
} = require('apollo-server-core')
const {
  portfolioQueries,
  portfolioMutations,
} = require('./graphql/resolvers')
const { portfolioTypes } = require('./graphql/types')
const Portfolio = require('./graphql/models/Portfolio.model')

const port = parseInt(process.env.PORT, 10) || 7005
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

require('./database').connect()

app
  .prepare()
  .then(() => {
    //
    // Apollo Server Creating BEGIN
    //
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
        deletePortfolio(id: ID): ID
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
        context: () => ({
          models: {
            Portfolio: new Portfolio(model('Portfolio')),
          },
        }),
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
    //
    // Apollo Server Creating END
    //
  })
  .catch((err) => {
    console.log(
      `===========================================================`
    )
    console.log(err)
  })
