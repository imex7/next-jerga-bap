// import { useRouter } from 'next/router'
import axios from 'axios'

const fetchPortfolioById = (id) => {
	const query = `query Portfolio($ind: ID) {
			portfolio(id: $ind) {
				_id,
				title,
				company,
				comapanyWebsite,
				location,
				jobTitle,
				description,
				startDate,
				endDate
			}
		}`
	const variables = {"ind": id}
	return axios.post(`http://localhost:7005/graphql`, { query, variables })
		.then(({ data }) => {
			return data.data
		})
		.then((res) => {
			return res.portfolio
		})
}

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

const PortfolioDetail = ({portfolio}) => {
	// const router = useRouter()
	// const id = router.query.id
	// console.log(id);
	return (
		<>
			<div className="portfolio-detail">
				<div className="container">

					<div className="jumbotron">
						<p>
							<a className="btn btn-lg btn-success" href="#" role="button">
								{portfolio.company}
							</a>
						</p>
						<p className="lead">{portfolio.jobTitle}</p>
					</div>

					<div className="row marketing">
						<div className="col-lg-6">
							<h4 className="title">Some Location</h4>
							<p className="text">{portfolio.location}</p>

							<h4 className="title">Start Date</h4>
							<p className="text">{portfolio.startDate}</p>
						</div>

						<div className="col-lg-6">
							<h4 className="title">Days</h4>
							<p className="text">44</p>

							<h4 className="title">End Date</h4>
							<p className="text">{portfolio.endDate}</p>
						</div>
						<div className="col-md-12">
							<hr />
							<h4 className="title">Description</h4>
							<p>{portfolio.description}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

PortfolioDetail.getInitialProps = async ({query}) => {
	const portfolio = await fetchPortfolioById(query.id);
	return { 
		portfolio };
}

export default PortfolioDetail
