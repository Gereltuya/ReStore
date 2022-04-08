import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Grid,
} from '@mui/material'
import { Product } from '../../models/product'
import ProductCard from './ProductCard'

interface Props {
  products: Product[]
  addProduct: () => void
}
export default function ProductList({ products, addProduct }: Props) {
  return (
    <Grid container spacing={4}>
      {products.map((product) => {
        return (
          <Grid item xs={3} key={product.id}>
            <ProductCard product={product}></ProductCard>
          </Grid>
        )
      })}
    </Grid>
  )
}
