// import App from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.scss';
import AppNavbar from '@/components/shared/navbar'
import Hero from '../components/shared/hero'


function MyApp({ Component, pageProps }) {
  // console.log(Component);
  const isHomePage = () => Component.name === 'Home'
  return (
    <div className="portfolio-app">
      <AppNavbar />
      
      {isHomePage() && <Hero />}
      <div className="container">
        <Component {...pageProps} />
      </div>

      {/* FOOTER STARTS */}
      {isHomePage() && <footer id="sticky-footer" className="py-4 bg-black text-white-50 py-3">
        <div className="container text-center">
          <small>Copyright &copy; Your Website</small>
        </div>
      </footer>}
      {/* FOOTER ENDS */}

    </div>
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