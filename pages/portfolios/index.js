import React from 'react'
import axios from 'axios'
import PortfolioCard from '@/components/portfolios/PortfolioCard'
import Link from 'next/link'

const fetchPortfolios = () => {
  const query = `query Portfolios {
			portfolios {
				_id,
				title,
				company,
				comapanyWebsite,
				jobTitle,
				description,
				startDate,
				endDate
			}
		}`
  return axios
    .post(`http://localhost:7005/graphql`, { query })
    .then(({ data }) => {
      return data.data
    })
    .then((res) => {
      // debugger
      return res.portfolios
    })
}

const createPortfolio = () => {
  const query = `mutation createPortfolio {
			createPortfolio(portfolio: {
				title: "My favourite work",
				company: "SibLine",
				comapanyWebsite: "www.sibline.ru",
				jobTitle: "Gruzchik",
				description: "Boo",
				startDate: "00/00/1989",
				endDate: "00/00/1999"
			}) {
				_id,
				title,
				company,
				comapanyWebsite,
				jobTitle,
				description,
				startDate,
				endDate
			}
		}`
  return axios
    .post(`http://localhost:7005/graphql`, { query })
    .then(({ data }) => {
      return data.data
    })
    .then((res) => {
      // debugger
      return res.createPortfolio
    })
}

const updatePortfolio = (id) => {
  const query = `mutation updatePortfolio {
			updatePortfolio(id: "${id}", portfolio: {
				title: "[UPDATED]",
				company: "SibLine",
				comapanyWebsite: "www.sibline.ru",
				jobTitle: "Gruzchik",
				description: "Boo",
				startDate: "00/00/1989",
				endDate: "00/00/1999"
			}) {
				_id,
				title,
				company,
				comapanyWebsite,
				jobTitle,
				description,
				startDate,
				endDate
			}
		}`
  return axios
    .post(`http://localhost:7005/graphql`, { query })
    .then(({ data }) => {
      return data.data
    })
    .then((res) => {
      // debugger
      return res.updatePortfolio
    })
}

const deletePortfolio = (id) => {
  const query = `mutation deletePortfolio {
			deletePortfolio(id: "${id}") {
				_id,
				title,
				company,
				comapanyWebsite,
				jobTitle,
				description,
				startDate,
				endDate
			}
		}`
  return axios
    .post(`http://localhost:7005/graphql`, { query })
    .then(({ data }) => {
      return data.data
    })
    .then((res) => {
      // debugger
      return res.deletePortfolio
    })
}

const Portfolios = ({ portfolios: fromProps }) => {
  const [portfolios, setPortfolios] = React.useState(fromProps)

  const createPortfolioHandler = async () => {
    const newPortfolio = await createPortfolio()
    setPortfolios((prev) => {
      return [newPortfolio, ...prev]
    })
  }

  const updatePortfolioHandler = async (id) => {
    const newPortfolio = await updatePortfolio(id)
    setPortfolios((prev) => {
      const arr = prev.map((el) => {
        if (el._id === id) {
          el = newPortfolio
          return el
        } else {
          return el
        }
      })
      return [...arr]
    })
  }

  const deletePortfolioHandler = async (id) => {
    const newPortfolios = await deletePortfolio(id)
    setPortfolios((prev) => {
      return [...newPortfolios]
    })
  }

  return (
    <>
      <section className='section-title'>
        <div className='px-2 mb-3'>
          <div className='pt-5 pb-4'>
            <h1>Portfolios</h1>
          </div>
          <button
            onClick={createPortfolioHandler}
            className='btn btn-primary'
          >
            Create Portfolio
          </button>
        </div>
      </section>
      <section className='pb-5'>
        <div className='row'>
          {portfolios &&
            portfolios.map((el, index) => {
              return (
                <div className='col-md-4' key={index}>
                  <Link
                    href='/portfolios/[id]'
                    as={`/portfolios/${el._id}`}
                  >
                    <a className='card-link'>
                      <PortfolioCard portfolio={el} />
                    </a>
                  </Link>
                  <div className='btn-group d-flex justify-content-center'>
                    <button
                      onClick={() => {
                        updatePortfolioHandler(el._id)
                      }}
                      className='btn btn-sm btn-secondary mb-3'
                    >
                      Update Portfolio
                    </button>
                    <button
                      onClick={() => {
                        deletePortfolioHandler(el._id)
                      }}
                      className='btn btn-sm btn-warning mb-3'
                    >
                      Delete Portfolio
                    </button>
                  </div>
                </div>
              )
            })}
        </div>
      </section>
    </>
  )
}

Portfolios.getInitialProps = async () => {
  const portfolios = await fetchPortfolios()
  return { portfolios }
}

// export const getStaticProps = async () => {
// 	const portfolios = await fetchPortfolios()
// 	return {
// 		props: {
// 			portfolios
// 		}
// 	}
// }

export default Portfolios
