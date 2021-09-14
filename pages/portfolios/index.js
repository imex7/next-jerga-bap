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
	return axios.post(`http://localhost:7005/graphql`, { query })
		.then(({ data}) => {
			return data.data
		})
		.then((res) => {
			// debugger
			return res.portfolios
		})
}

const Portfolios = ({portfolios}) => {
	return (
		<>
			<section className="section-title">
				<div className="px-2">
					<div className="pt-5 pb-4">
						<h1>Portfolios</h1>
					</div>
				</div>
			</section>
			<section className="pb-5">
				<div className="row">
					{
						portfolios && portfolios.map((el, index) => {
							return <div className="col-md-4" key={index}>
								<Link
									href='/portfolios/[id]'
									as={`/portfolios/${el._id}`}
								>
									<a className='card-link'>
										<PortfolioCard portfolio={el}/>
									</a>
								</Link>
							</div>
						})
					}
				</div>
			</section>
		</>
	)
}

Portfolios.getInitialProps = async () => {
	const portfolios = await fetchPortfolios();
	return { portfolios };
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
