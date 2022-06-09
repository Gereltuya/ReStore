import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'
import { useStoreContext } from '../../app/api/context/storeContext'
import { currencyFormat } from '../../app/util/util'

export default function BasketSummary() {
  const { basket } = useStoreContext()
  const subtotal =
    (basket?.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ) as number) ?? 0

  const fixedDeliveryFee = 500
  const deliveryFee = subtotal / 100 >= 100 ? 0 : fixedDeliveryFee
  const formattedSubtotal = currencyFormat(subtotal)
  const formattedDeliveryFee = currencyFormat(deliveryFee)
  const totalFormattedFee = currencyFormat(subtotal + deliveryFee)
  return (
    <>
      <TableContainer component={Paper} variant={'outlined'}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align='right'>{totalFormattedFee}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align='right'>{formattedDeliveryFee}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align='right'>{totalFormattedFee}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: 'italic' }}>
                  *Orders over $100 qualify for free delivery
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
