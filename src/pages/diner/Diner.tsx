import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectDinerById } from "../../features/diners/dinersSlice";
import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import VerifiedIcon from '@mui/icons-material/Verified';
import { isLiked, like } from "../../features/favourites/favouritesSlice";
import Reviews from "../../components/Reviews/Reviews";
import Menu from '../../components/Menu/Menu';
import { getMenuById } from "../../features/menus/menusSlice";

type DinerRouteParams = {
  id: string;
};

function Diner() {
  const dispatch = useAppDispatch();
  const { id } = useParams<DinerRouteParams>();

  const diner = useAppSelector(selectDinerById(id!));

  const liked = useAppSelector(isLiked(id!));

  return(
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}
    >
      <img
        alt='diner banner'
        style={{ maxWidth: '100%', borderRadius: 20 }}
        src={diner?.headerUri}
      />

      <Avatar
        src={diner?.pictureUri}
        sx={{
          width: 82,
          height: 82,
          mt: -5,
          ml: 5,
          border: '2px solid #fff',
          boxShadow: '.5px .5px 4px #000'
        }}
      />

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Typography variant='h4' sx={{ flex: 1 }}>
          <b>
            {diner?.title}
          </b>
        </Typography>

        <IconButton size='large' data-testid='like-btn' onClick={() => {
          dispatch(like(id!))
        }}>
          <FavoriteIcon data-testid='like-icon' sx={{ fontSize: '32px', color: liked ? 'red' : 'inherit' }} />
        </IconButton>
      </Box>

      <Typography
        variant='subtitle2'
        sx={{
          color: theme => theme.palette.gray,
          fontWeight: 'bold'
        }}
      >
        <Box style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'self-end',
          gap: 6
        }}>
          <VerifiedIcon sx={{ color: 'green' }} /> <span style={{ color: 'green' }}>Verified Venture</span> • {diner?.cuisines.map(c => c.charAt(0).toUpperCase() + c.substring(1)).join(', ')} • {diner?.address} • {diner?.currency}
        </Box>
      </Typography>

      <Divider />

      <Reviews dinerId={id!} />

      <Divider />

      {
        useAppSelector(getMenuById(id!)) !== undefined ?
          <Menu dinerId={id!} /> :
          <Typography variant='h6' sx={{ textAlign: 'center' }} data-testid='no-menu-entered'>
            The Merchant hasn't submitted their Menu yet.
          </Typography>
      }
    </Box>
  );
}

export default Diner;
