// import App from 'next/app'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/index.scss'
import AppNavbar from '@/components/shared/navbar'
import Hero from '../components/shared/hero'

const client = new ApolloClient({
  uri: 'http://localhost:7005/graphql',
  cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps }) {
  // console.log(Component);
  const isHomePage = () => Component.name === 'Home'
  return (
    <ApolloProvider client={client}>
      <div className='portfolio-app'>
        <AppNavbar />

        {isHomePage() && <Hero />}
        <div className='container'>
          <Component {...pageProps} />
        </div>

        {/* FOOTER STARTS */}
        {isHomePage() && (
          <footer
            id='sticky-footer'
            className='py-4 bg-black text-white-50 py-3'
          >
            <div className='container text-center'>
              <small>Copyright &copy; Your Website</small>
            </div>
          </footer>
        )}
        {/* FOOTER ENDS */}
      </div>
    </ApolloProvider>
  )
}

// MyApp.getInitialProps = async (context) => {
//   const initialProps = App.getInitialProps && await App.getInitialProps(context)
//   return {
//     pageProps: {
//       appData: "Hello _App Component",
//       ...initialProps
//     }
//   }
// }

export default MyApp
