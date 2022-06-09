import {
  Avatar,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  CardHeader,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import agent from '../../app/api/agent'
import { Product } from '../../models/product'
import { useStoreContext } from '../../app/api/context/storeContext'
import { Basket } from '../../models/basket'
import { currencyFormat } from '../../app/util/util'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false)
  const { setBasket } = useStoreContext()

  function handleAddItem(productId: number) {
    setLoading(true)
    agent.Basket.addItem(productId)
      .then((response) => response.value)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }
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
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant='body2' color='text.primary.main'>
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={loading}
          onClick={() => handleAddItem(product.id)}
          size='small'
        >
          Add to Card
        </LoadingButton>
        <Button size='small' component={Link} to={`/catalog/${product.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  )
}
