import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  CardHeader,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { Product } from '../../models/product'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: 'secondary.main' }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: {
            fontWeight: 'bold',
            color: 'primary.main',
          },
        }}
      ></CardHeader>
      <CardMedia
        component='img'
        sx={{
          height: 140,
          objectFit: 'contain',
          backgroundColor: 'primary.light',
        }}
        image={product.pictureUrl}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom color='secondary' variant='h5' component='div'>
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant='body2' color='text.primary.main'>
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Add to Card</Button>
        <Button size='small' component={Link} to={`/catalog/${product.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  )
}
