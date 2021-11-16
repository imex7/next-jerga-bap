const { Schema, model } = require('mongoose')

const PortfolioSchema = new Schema(
  {
    title: { type: String, maxlength: 128 },
    company: { type: String, maxlength: 128 },
    comapanyWebsite: { type: String, maxlength: 128 },
    location: { type: String, maxlength: 128 },
    jobTitle: { type: String, maxlength: 128 },
    description: { type: String, maxlength: 128 },
    startDate: Date,
    endDate: Date,
  },
  {
    timestamps: true,
  }
)

module.exports = model('Portfolio', PortfolioSchema)
