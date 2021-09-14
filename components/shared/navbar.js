import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import Link from 'next/link'


const AppLink = ({href, children}) => {
	return <Link href={href}>
		<a className="nav-link mr-3">{children}</a>
	</Link>
}

const AppNavbar = () => {
	return (
		<>
			<div className="navbar-wrapper">
				<Navbar expand="lg" className="navbar-dark fj-mw9">
					<Link href="/">
						<a className="navbar-brand mr-3 font-weight-bold">FilipJerga</a>
					</Link>
					{/* <Navbar.Toggle /> */}
					<Navbar.Collapse>
						<Nav >
							<AppLink href="/portfolios" >Portfolios</AppLink>
							<AppLink href="/forum/categories" >Forum</AppLink>
							<AppLink href="/cv" >Cv</AppLink>
							<AppLink href="/" >Ask me</AppLink>
						</Nav>
						<Nav className="ml-auto">
							<AppLink href="/login">Sign In</AppLink>
							<Link href="/register" >
								<a className="mr-3 btn btn-success bg-green-2 bright">Sign Up</a>
							</Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		</>
	)
}

export default AppNavbar
