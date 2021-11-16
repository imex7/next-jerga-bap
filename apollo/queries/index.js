import { gql } from '@apollo/client'

export const GET_PORTFOLIO = gql`
  query Portfolio($ind: ID) {
    portfolio(id: $ind) {
      _id
      title
      company
      comapanyWebsite
      location
      jobTitle
      description
      startDate
      endDate
    }
  }
`

export const GET_PORTFOLIOS = gql`
  query Portfolios {
    portfolios {
      _id
      title
      company
      comapanyWebsite
      jobTitle
      description
      startDate
      endDate
    }
  }
`

export const CREATE_PORTFOLIO = gql`
  mutation createPortfolio {
    createPortfolio(
      portfolio: {
        title: "My favourite work"
        company: "Tranzit TK"
        comapanyWebsite: "www.tranzit24.ru"
        jobTitle: "Gruzchik"
        description: "Boo"
        startDate: "01/07/2007/20:00"
        endDate: "7/07/2007/13:35"
      }
    ) {
      _id
      title
      company
      comapanyWebsite
      jobTitle
      description
      startDate
      endDate
    }
  }
`

export const UPDATE_PORTFOLIO = gql`
  mutation updatePortfolio($id: ID) {
    updatePortfolio(
      id: $id
      portfolio: {
        title: "[UPDATED]"
        company: "SibLine"
        comapanyWebsite: "www.sibline.ru"
        jobTitle: "Gruzchik"
        description: "Boo"
        startDate: "01/01/1989"
        endDate: "01/01/1999"
      }
    ) {
      _id
      title
      company
      comapanyWebsite
      jobTitle
      description
      startDate
      endDate
    }
  }
`

export const DELETE_PORTFOLIO = gql`
  mutation deletePortfolio($id: ID) {
    deletePortfolio(id: $id)
  }
`
