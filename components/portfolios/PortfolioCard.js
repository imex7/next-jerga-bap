const PortfolioCard = ({portfolio}) => {
	return (
		<div className="card subtle-shadow no-border">
			<div className="card-body">
				<h2 className="card-title">{portfolio.title}</h2>
				<h6 className="card-subtitle mb-2 text-muted">{portfolio.jobTitle}</h6>
				<p className="card-text fs-2">{portfolio.description}</p>
			</div>
			<div className="card-footer no-border">
				<small className="text-muted">{portfolio.startDate} — {portfolio.endDate}</small>
			</div>
		</div>
	)
}

export default PortfolioCard