import {
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
} from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import { Product } from '../../models/product'
import ProductList from './productList'

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('http://localhost:5099/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [])
  return (
    <>
      <ProductList
        products={products}
        addProduct={function (): void {
          throw new Error('Function not implemented.')
        }}
      ></ProductList>
      <Button variant='contained'>Add Product</Button>
    </>
  )
}
