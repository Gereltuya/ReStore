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
import { NavLink } from 'react-router-dom'

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
          <IconButton>
            <Badge badgeContent={4} color='secondary'>
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
