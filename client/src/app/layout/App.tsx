import { ThemeProvider } from '@emotion/react'
import { Container, createTheme, CssBaseline, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import AboutPage from '../../features/about/AboutPage'
import Catalog from '../../features/catalog/Catalog'
import ProductDetails from '../../features/catalog/ProductDetails'
import ContactPage from '../../features/contact/ContactPage'
import HomePage from '../../features/home/HomePage'
import { Product } from '../../models/product'
import Header from './Header'
const products = [{ id: 1, name: 'product 1', price: 100.0 }]

function App() {
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <Header checked={darkMode} handleSwitch={handleSwitch} />
      <Container>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/catalog' component={Catalog} />
        <Route path='/catalog/:id' component={ProductDetails} />
        <Route path='/about' component={AboutPage} />
        <Route path='/contact' component={ContactPage} />
      </Container>
    </ThemeProvider>
  )
}

export default App
