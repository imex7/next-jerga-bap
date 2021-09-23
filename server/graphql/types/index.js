const commonPortfolioFields = `
		title: String,
		company: String,
		comapanyWebsite: String,
		location: String,
		jobTitle: String,
		description: String,
		startDate: String,
		endDate: String
`

exports.portfolioTypes = `
	type Portfolio {
		_id: ID,
		${commonPortfolioFields}
	}
	input PortfolioInput {
		${commonPortfolioFields}
	}
`
