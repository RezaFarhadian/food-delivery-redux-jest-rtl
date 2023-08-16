import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import EmptyCartGif from '../Cuisines/images/no_cuisines.gif';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ExtendedFood, allCartItems, easeCart } from "../../features/cart/cartSlice";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './Transitions.css';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import React, { createRef } from "react";
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import { setTotalFee, totalFee } from "../../features/checkout/checkoutSlice";

function Cart() {
  const dispatch = useAppDispatch();

  const checkoutFee = useAppSelector(totalFee);

  const allItemsAnimated: (ExtendedFood & {
    nodeRef: React.RefObject<HTMLElement | undefined>
  })[] = useAppSelector(allCartItems).map(item => {
    return {
      ...item,
      nodeRef: createRef()
    }
  });

  dispatch(
    setTotalFee(
      allItemsAnimated.reduce((total, obj) => obj.cost + total,0)
    )
  );

  return(
    <Drawer
      variant='permanent'
      anchor='right'
      sx={{
        '& .MuiDrawer-paper': {
          width: 400,
          boxSizing: 'border-box',
        },
      }}
    >
      {
        allItemsAnimated.length > 0 ?
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          pr: 2,
          pl: 2,
          pt: 4,
          pb: 4
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            flex: 1
          }}>
            <TransitionGroup className='cart-list'>
              {allItemsAnimated.map(food =>
                <CSSTransition key={food.id} nodeRef={food.nodeRef} timeout={500} classNames='item'>
                  <Box ref={food.nodeRef} sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2
                  }}>
                    <img src={food.smallPictureUri} alt={`${food.name} in cart`} width={100} />
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 1
                    }}>
                      <Typography variant='h6'>
                        {food.name} ({food.quantity})
                      </Typography>
                      {food.preferences && food.preferences.length > 0 &&
                        <Typography variant='caption' sx={{ textAlign: 'center' }}>
                          {food.preferences}
                        </Typography>
                      }
                      <Typography variant='subtitle1' sx={{ color: theme => theme.palette.gray }}>
                        ${food.cost}
                      </Typography>
                    </Box>
                    <IconButton disableRipple onClick={() => {
                      dispatch(
                        easeCart(food.id)
                      )
                    }}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>
                </CSSTransition>
              )}
            </TransitionGroup>
          </Box>
          <Button variant="contained" startIcon={<ShoppingCartCheckoutOutlinedIcon />}>
            CHECKOUT (${checkoutFee})
          </Button>
        </Box> :
        <Box sx={{
          textAlign: 'center',
          mt: '40%'
        }}>
          <img src={EmptyCartGif} alt='no food on table' width={300} />
          <Typography variant='subtitle2' sx={{ opacity: .5 }}>
            No food on the table <br/>
            add some and we'll bring it
          </Typography>
        </Box>
      }
    </Drawer>
  );
}

export default Cart;
