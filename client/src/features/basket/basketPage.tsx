import { Add, Delete, Remove } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import agent from '../../app/api/agent'
import { useStoreContext } from '../../app/api/context/storeContext'
import { currencyFormat } from '../../app/util/util'
import BasketSummary from './basketSummary'

export default function BasketPage() {
  const { basket, setBasket, removeItem } = useStoreContext()
  const [status, setStatus] = useState({
    loading: false,
    name: '',
  })

  function handleAddItem(productId: number, name: string) {
    setStatus({
      loading: true,
      name,
    })
    agent.Basket.addItem(productId)
      .then((response) => response.value)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() =>
        setStatus({
          loading: false,
          name,
        })
      )
  }

  function handleRemoveItem(productId: number, quantity = 1, name: string) {
    setStatus({
      loading: true,
      name,
    })
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .then((response) => console.log('removeItem', response))
      .catch((error) => console.log(error))
      .finally(() =>
        setStatus({
          loading: false,
          name,
        })
      )
  }

  if (!basket || basket?.items.length === 0)
    return <Typography variant='h3'>Your basket is empty. </Typography>
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align='right'>price</TableCell>
              <TableCell align='center'>Quantity</TableCell>
              <TableCell align='right'>Subtotal</TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  <Box display='flex' alignItems='center'>
                    <img
                      src={row.pictureUrl}
                      alt={row.name}
                      style={{ height: 50, marginRight: 50 }}
                    ></img>
                    <span>{row.name}</span>
                  </Box>
                </TableCell>
                <TableCell align='right'>{currencyFormat(row.price)}</TableCell>

                <TableCell align='center'>
                  <LoadingButton
                    loading={
                      status.loading && status.name === 'rem' + row.productId
                    }
                    onClick={() =>
                      handleRemoveItem(row.productId, 1, 'rem' + row.productId)
                    }
                    color='error'
                  >
                    <Remove />
                  </LoadingButton>
                  {row.quantity}
                  <LoadingButton
                    loading={
                      status.loading && status.name === 'add' + row.productId
                    }
                    onClick={() =>
                      handleAddItem(row.productId, 'add' + row.productId)
                    }
                    color='secondary'
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align='right'>
                  {currencyFormat(row.price * row.quantity)}
                </TableCell>

                <TableCell align='right'>
                  <LoadingButton
                    loading={
                      status.loading && status.name === 'del' + row.productId
                    }
                    onClick={() =>
                      handleRemoveItem(
                        row.productId,
                        row.quantity,
                        'del' + row.productId
                      )
                    }
                    color='error'
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            variant='contained'
            fullWidth
            to='/checkout'
            size='large'
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
