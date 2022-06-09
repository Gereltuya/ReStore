import { ShoppingCart } from '@mui/icons-material'
import {
  AppBar,
  Badge,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
  Box,
} from '@mui/material'
import { NavLink, Link } from 'react-router-dom'
import { Basket, BasketItem } from '../../models/basket'
import { useStoreContext } from '../api/context/storeContext'

interface Props {
  checked: boolean
  handleSwitch: () => void
}

const midLinks = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
  { title: 'contact', path: '/contact' },
]

const rightLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' },
]

const navStyles = {
  color: 'inherit',
  textDecoration: 'none',
  typography: 'h6',
  '&:hover': {
    color: 'grey.500',
  },
  '.active': {
    color: 'text.secondary',
  },
}

export default function Header({ checked, handleSwitch }: Props) {
  const { basket } = useStoreContext()

  let itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)
  console.log(itemCount)
  return (
    <AppBar position='static' sx={{ mb: 4 }}>
      <Toolbar
        variant='regular'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box display='flex' alignItems='center'>
          <Typography
            variant='h6'
            component={NavLink}
            exact
            to='/'
            sx={navStyles}
          >
            Re-Store
          </Typography>
          <Switch
            checked={checked}
            onChange={handleSwitch}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>

        <List sx={{ display: 'flex' }}>
          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box display='flex' alignItems='center'>
          <IconButton
            component={Link}
            to='/basket'
            size='large'
            sx={{ color: 'inherit' }}
          >
            <Badge badgeContent={itemCount} color='secondary'>
              <ShoppingCart></ShoppingCart>
            </Badge>
          </IconButton>
          <List sx={{ display: 'flex' }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={{ color: 'inherit', typography: 'h6' }}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
