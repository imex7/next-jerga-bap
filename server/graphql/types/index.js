exports.portfolioTypes = `
	type Portfolio {
		_id: ID,
		title: String,
		company: String,
		comapanyWebsite: String,
		location: String,
		jobTitle: String,
		description: String,
		startDate: String,
		endDate: String
	}
	input PortfolioInput {
		title: String,
		company: String,
		comapanyWebsite: String,
		location: String,
		jobTitle: String,
		description: String,
		startDate: String,
		endDate: String
	}
`
