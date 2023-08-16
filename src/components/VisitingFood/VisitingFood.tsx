import { Box, Button, FormControlLabel, FormGroup, IconButton, MenuItem, Select, Typography } from "@mui/material";
import { Food, OptionCapacity } from "../../features/menus/menusSlice";
import Modal, { ModalProps } from "../Modal/Modal";
import CheckboxOption from "../CheckboxOption/CheckboxOption";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addAnother, diminish, getCheckedOptions, getCost, getQuantity } from "../../features/prepare/prepareSlice";
import { expandCart } from "../../features/cart/cartSlice";

interface VisitingFoodProps extends Pick<ModalProps, 'onClose' | 'open'> {
  food: Food;
};

function VisitingFood(props: VisitingFoodProps) {
  const dispatch = useAppDispatch();

  const cost = useAppSelector(getCost);
  const quantity = useAppSelector(getQuantity);
  const customOptions = useAppSelector(getCheckedOptions);

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      heading={props.food?.name}
      action={
        <Box sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          alignItems: 'center',
          gap: 12,
          padding: 4
        }} data-testid='action-bar'>
          <Button
            variant='contained'
            fullWidth sx={{ flex: 1 }}
            onClick={() => {
              dispatch(
                expandCart({
                  ...props.food!,
                  cost: Number(cost),
                  id: Math.floor(Math.random() * 99999).toString(),
                  addedOn: (new Date()).toISOString(),
                  preferences: customOptions.join(', '),
                  quantity
                })
              );
              props.onClose();
            }}
          >
            Add to Cart - ${cost}
          </Button>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between'
          }}>
            <IconButton data-testid='one-less' size='large' disabled={quantity === 1} onClick={() => {
              if (quantity !== 1) dispatch(diminish());
            }}>
              <RemoveCircleOutlineOutlinedIcon />
            </IconButton>
            <Typography variant='h6' sx={{ mt: 1 }}>
              <b data-testid='item-quantity'>
                {quantity}
              </b>
            </Typography>
            <IconButton data-testid='one-more' size='large' onClick={() => {
              dispatch(addAnother());
            }}>
              <AddCircleOutlineOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      }
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: .5
      }}>
        <Typography variant='h4'>
          <b>
            {props.food?.name}
          </b>
        </Typography>
        <Typography variant='subtitle2' sx={{
          fontWeight: 'bold',
          color: theme => theme.palette.primary.main
        }}>
          {props.food?.featureCaption}
        </Typography>
        <Typography variant='subtitle2' sx={{
          color: theme => theme.palette.gray
        }}>
          {props.food?.estimatedCalories} cal
        </Typography>
        <img
          alt={`${props.food?.name} $${props.food?.earlyCost}`}
          src={props.food?.mediumPictureUri ?
            props.food?.mediumPictureUri :
            '/assets/images/menus/default_image.png'
          }
          width='500'
        />
        {props.food?.options.map(option =>
          <Box>
            <Typography variant='subtitle1'>
              <b>
                {option.label}
              </b>
            </Typography>
            <Typography variant='caption'>
              {
                option.capacity === OptionCapacity.Single ?
                  'Select one' :
                  `Select up to ${option.items.length}`
              }
            </Typography>
            <FormGroup>
              {
                option.capacity === OptionCapacity.Collective &&
                option.items.map(item =>
                  <FormControlLabel sx={{
                    mt: 2
                  }} control={
                    <CheckboxOption
                      amount={item.chargeBy}
                      value={item.name}
                    />
                  } label={
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <Typography variant='subtitle2'>
                        {item.name}
                      </Typography>
                      <Typography variant='caption'>
                        {item.chargeBy > 0 && `+$${item.chargeBy} • `}{item.caloriesVolume} cal
                      </Typography>
                    </Box>
                  } />
                )
              }
              {
                option.capacity === OptionCapacity.Single &&
                <Select
                  sx={{ mt: 2 }}
                  defaultValue={option.items[0].name}
                >
                  {
                    option.items.map(item =>
                      <MenuItem value={item.name}>
                        {item.name} ({item.caloriesVolume} cal)
                      </MenuItem>
                    )
                  }
                </Select>
              }
            </FormGroup>
            <br /></Box>
        )}
      </Box>
    </Modal>
  );
}

export default VisitingFood;
