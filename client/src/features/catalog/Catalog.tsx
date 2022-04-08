import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import agent from '../../app/api/agent'
import { Product } from '../../models/product'
import ProductList from './productList'

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    agent.Catalog.list().then((products) => setProducts(products))
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
