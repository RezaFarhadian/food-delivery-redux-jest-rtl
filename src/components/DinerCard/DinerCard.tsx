import { Avatar, Card, CardHeader, CardMedia, CardProps } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface DinerCardProps extends CardProps {
  title?: string;
  address?: string;
  pictureUri?: string;
  headerUri?: string; 
  id?: string;
};

function DinerCard(props: DinerCardProps) {
  const navigate = useNavigate();
  return(
    <Card sx={{ flex: '40%', cursor: 'pointer' }} data-testid='dinercard' onClick={() => {
      navigate(props.id!)
    }}>
      <CardHeader
        avatar={
          <Avatar
            src={props.pictureUri}
          />
        }
        title={props.title}
        subheader={props.address}
      />
      <CardMedia
        component='img'
        image={props.headerUri}
      />
    </Card>
  );
}

export default DinerCard;
