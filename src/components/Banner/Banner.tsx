import { Paper, PaperProps } from "@mui/material";
import { SxProps } from '@mui/system';

interface BannerProps extends PaperProps {};

function Banner(props: BannerProps) {
  return(
    <Paper {...props} sx={{
      padding: 2,
      width: '50%',
      height: '180px',
      '& > *': {
        cursor: 'default'
      },
      ...props.sx as SxProps
    }}>
      {props.children}
    </Paper>
  );
}

export default Banner;
