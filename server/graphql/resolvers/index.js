const Portfolio = require('../../database/models/Portfolio.model')

exports.portfolioQueries = {
  hello: () => {
    return 'Boooo!!!!!'
  },
  portfolio: async (root, { id }, ctx) => {
    return ctx.models.Portfolio.getById(id)
    // return await Portfolio.findById(id)
  },
  portfolios: async (root, args, ctx) => {
    return ctx.models.Portfolio.getAll({})
    // return await Portfolio.find({})
  },
}

exports.portfolioMutations = {
  createPortfolio: async (root, { portfolio }, ctx) => {
    return ctx.models.Portfolio.create(portfolio)
    // const newPortfolio = await Portfolio.create(portfolio)
    // return newPortfolio
  },
  updatePortfolio: async (root, { id, portfolio }, ctx) => {
    return ctx.models.Portfolio.findAndUpdate(id, portfolio)
    // const newPortfolio = await Portfolio.findOneAndUpdate(
    //   { _id: id },
    //   portfolio,
    //   { new: true }
    // )
    // return newPortfolio
  },
  deletePortfolio: async (root, { id }, ctx) => {
    const deletedPortfolio = await ctx.models.Portfolio.findAndDelete(
      id
    )
    return deletedPortfolio._id
    // const deletedPortfolio = await Portfolio.findOneAndRemove(
    //   { _id: id }
    // )
    // return deletedPortfolio._id
  },
}
