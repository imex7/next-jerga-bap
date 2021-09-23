const data = require('../../data')

exports.portfolioQueries = {
  hello: () => {
    return 'Boooo!!!!!'
  },
  portfolio: (root, { id }) => {
    const portfolio = data.portfolios.find((p) => p._id === id)
    return portfolio
  },
  portfolios: () => {
    return data.portfolios
  },
}

exports.portfolioMutations = {
  createPortfolio: (root, { portfolio }) => {
    const _id = require('crypto').randomBytes(10).toString('hex')
    const newPortfolio = { ...portfolio }
    newPortfolio._id = _id
    data.portfolios.push(newPortfolio)
    return newPortfolio
  },
  updatePortfolio: (root, { id, portfolio }) => {
    const index = data.portfolios.findIndex((el) => {
      return el._id === id
    })
    const oldPortfolio = data.portfolios[index]
    const newPortfolio = { ...oldPortfolio, ...portfolio }
    data.portfolios[index] = newPortfolio
    return newPortfolio
  },
  deletePortfolio: (root, { id }) => {
    const index = data.portfolios.findIndex((el) => {
      return el._id === id
    })
    data.portfolios.splice(index, 1)
    const newPortfolios = [...data.portfolios]
    return newPortfolios
  },
}
