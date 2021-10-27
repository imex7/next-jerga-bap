import PortfolioCard from '@/components/portfolios/PortfolioCard'
import Link from 'next/link'
import {
  useGetPortfolios,
  useUpdatePortfolio,
  useDeletePortfolio,
  useCreatePortfolio,
} from '@/apollo/actions'
import withApollo from '@/hoc/withApollo'
import { getDataFromTree } from '@apollo/client/react/ssr'

const Portfolios = () => {
  const { data } = useGetPortfolios()
  const [updatePortfolio] = useUpdatePortfolio()
  const [deletePortfolio] = useDeletePortfolio()
  const [createPortfolio] = useCreatePortfolio()

  const portfolios = (data && data.portfolios) || []
  return (
    <>
      <section className='section-title'>
        <div className='px-2 mb-3'>
          <div className='pt-5 pb-4'>
            <h1>Portfolios</h1>
          </div>
          <button
            onClick={createPortfolio}
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
                        updatePortfolio({ variables: { id: el._id } })
                      }}
                      className='btn btn-sm btn-secondary mb-3'
                    >
                      Update Portfolio
                    </button>
                    <button
                      onClick={() => {
                        deletePortfolio({ variables: { id: el._id } })
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

export default withApollo(Portfolios, { getDataFromTree })
