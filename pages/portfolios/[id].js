import { useQuery } from '@apollo/client'
import { GET_PORTFOLIO } from '@/apollo/queries'
import { useEffect, useState } from 'react'
import withApollo from '@/hoc/withApollo'
import { getDataFromTree } from '@apollo/client/react/ssr'

// import { useRouter } from 'next/router'
// import axios from 'axios'

// Query без применения variables
//
// const fetchPortfolioById = (id) => {
// 	const query = `query Portfolio {
// 			portfolio(id: "${id}") {
// 				_id,
// 				title,
// 				company,
// 				comapanyWebsite,
// 				location,
// 				jobTitle,
// 				description,
// 				startDate,
// 				endDate
// 			}
// 		}`

// 	return axios.post(`http://localhost:7005/graphql`, { query })
// 		.then(({ data }) => {
// 			return data.data
// 		})
// 		.then((res) => {
// 			return res.portfolio
// 		})
// }

const PortfolioDetail = ({ query }) => {
  const { data, loading, error } = useQuery(GET_PORTFOLIO, {
    variables: {
      ind: query.id,
    },
  })
  const portfolio = (data && data.portfolio) || {}
  return (
    <>
      <div className='portfolio-detail'>
        <div className='container'>
          <div className='jumbotron'>
            <p>
              <a
                className='btn btn-lg btn-success'
                href='#'
                role='button'
              >
                {portfolio.company}
              </a>
            </p>
            <p className='lead'>{portfolio.jobTitle}</p>
          </div>

          <div className='row marketing'>
            <div className='col-lg-6'>
              <h4 className='title'>Some Location</h4>
              <p className='text'>{portfolio.location}</p>

              <h4 className='title'>Start Date</h4>
              <p className='text'>{portfolio.startDate}</p>
            </div>

            <div className='col-lg-6'>
              <h4 className='title'>Days</h4>
              <p className='text'>44</p>

              <h4 className='title'>End Date</h4>
              <p className='text'>{portfolio.endDate}</p>
            </div>
            <div className='col-md-12'>
              <hr />
              <h4 className='title'>Description</h4>
              <p>{portfolio.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

PortfolioDetail.getInitialProps = async ({ query }) => {
  return {
    query,
  }
}

export default withApollo(PortfolioDetail, { getDataFromTree })
