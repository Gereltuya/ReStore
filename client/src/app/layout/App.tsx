import { ThemeProvider } from '@emotion/react'
import { Container, createTheme, CssBaseline, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AboutPage from '../../features/about/AboutPage'
import Catalog from '../../features/catalog/Catalog'
import ProductDetails from '../../features/catalog/ProductDetails'
import ContactPage from '../../features/contact/ContactPage'
import HomePage from '../../features/home/HomePage'
import Header from './Header'
import 'react-toastify/dist/ReactToastify.css'
import ServerError from '../errors/ServerError'
import NotFound from '../errors/NotFound'
import BasketPage from '../../features/basket/basketPage'
import { useStoreContext } from '../api/context/storeContext'
import { getCookie } from '../util/util'
import agent from '../api/agent'
import LoadingComponent from './LoadingComponent'
import CheckoutPage from '../../features/checkout/CheckOutPage'

function App() {
  const { setBasket } = useStoreContext() // specicy what you need
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const buyerId = getCookie('buyerId')
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => setBasket(basket))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
    }
  }, [setBasket])

  const [darkMode, setDarkMode] = useStickyState(false, 'darkMode')
  const palleteType = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: darkMode ? '#121212' : '#eaeaea',
      },
    },
  })

  function handleSwitch() {
    setDarkMode(!darkMode)
  }

  function useStickyState(defaultValue: boolean, key: string) {
    const [value, setValue] = useState(() => {
      const stickyValue = window.localStorage.getItem(key)

      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue
    })

    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
  }

  if (loading)
    return <LoadingComponent message='Initialising app..'></LoadingComponent>
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar />
      <CssBaseline></CssBaseline>
      <Header checked={darkMode} handleSwitch={handleSwitch} />
      <Container>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/catalog' component={Catalog} />
          <Route path='/catalog/:id' component={ProductDetails} />
          <Route path='/about' component={AboutPage} />
          <Route path='/contact' component={ContactPage} />
          <Route path='/server-error' component={ServerError} />
          <Route path='/basket' component={BasketPage}></Route>
          <Route path='/checkout' component={CheckoutPage}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </Container>
    </ThemeProvider>
  )
}

export default App
