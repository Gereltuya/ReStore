import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import agent from '../../app/api/agent'
import LoadingComponent from '../../app/layout/LoadingComponent'
import { Product } from '../../models/product'
import ProductList from './productList'

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingComponent message='Loading products' />
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
