import { Box, Typography } from "@mui/material";
import { Food } from "../../features/menus/menusSlice";

interface FoodItemProps {
  food: Food
  onClick(): void;
};

function FoodItem(props: FoodItemProps) {
  return (
    <Box data-testid={props.food.name} aria-label={`${props.food.name} $${props.food.earlyCost}`} sx={{
      display: 'flex',
      flexDirection: 'row',
      border: '.5px solid rgb(231, 231, 231)',
      borderRadius: '4px',
      padding: 2,
      width: '45%',
      cursor: 'pointer',
      transition: 'box-shadow 0.3s ease-in-out',
      '&:hover': {
        boxShadow: '2px 2px 8px rgb(231, 231, 231)'
      }
    }} onClick={() => props.onClick()}>
      <Box sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        margin: 'auto auto'
      }}>
        <Typography variant='h6'>
          <b>
            {props.food.name}
          </b>
        </Typography>
        <Typography variant='subtitle1'>
          {
            props.food.previousCost ?
              <span><s>{props.food.previousCost}</s> <b>{`$${props.food.earlyCost}`}</b></span>
              :
              `$${props.food.earlyCost}`
          }
        </Typography>
        {
          props.food.featureCaption &&
          <Typography variant='subtitle2' sx={{
            fontWeight: 'bold',
            color: theme => theme.palette.primary.main
          }}>
            {props.food.featureCaption}
          </Typography>
        }
      </Box>
      <img src={props.food.smallPictureUri ?
        props.food.smallPictureUri :
        '/assets/images/menus/default_image.png'
      } alt={props.food.name} title="food" width={150} />
    </Box>
  );
}

export default FoodItem;
