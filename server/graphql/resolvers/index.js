const data = require('../../data')

exports.portfolioResolvers = {
  hello: () => {
    return 'Boooo!!!!!'
  },
  portfolio: ({ id }) => {
    const portfolio = data.portfolios.find((p) => p._id === id)
    return portfolio
  },
  portfolios: () => {
    return data.portfolios
  },
  createPortfolio: ({ portfolio }) => {
    const _id = require('crypto').randomBytes(10).toString('hex')
    const newPortfolio = { ...portfolio }
    newPortfolio._id = _id
    data.portfolios.push(newPortfolio)
    return newPortfolio
  },
}
