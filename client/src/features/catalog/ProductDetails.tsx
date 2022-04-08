import {
  Grid,
  Typography,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../../models/product'

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`http://localhost:5099/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [id]) //component loads when ID changes. Therefore it should be a dependency.

  if (loading) return <h3>Loading...</h3>

  if (!product) return <h3>Product not found.</h3>

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: '100%' }}
        ></img>
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h3'>
          {product.name}
          <Divider sx={{ mb: '2' }}> </Divider>
        </Typography>
        <Divider />
        <Typography variant='h4' color='secondary'>
          {(product.price / 100).toFixed(2)}
        </Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell> Name</TableCell>
              <TableCell> {product.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell> Description</TableCell>
              <TableCell> {product.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell> Type</TableCell>
              <TableCell> {product.type}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell> Brand</TableCell>
              <TableCell> {product.brand}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell> Quanity in Stock</TableCell>
              <TableCell> {product.quantityInStock}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  )
}
