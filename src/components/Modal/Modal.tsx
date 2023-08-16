import { Box, IconButton, ModalProps as MuiModalProps, Typography } from "@mui/material";
import { Modal as MuiModal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export interface ModalProps extends Omit<MuiModalProps, 'onClose' | 'children'> {
  children: JSX.Element | JSX.Element[] | undefined
  onClose(): void
  action?: React.ReactElement
  heading?: string
};

function Modal(props: ModalProps) {
  return(
    <MuiModal
      {...props}
      onClose={props.onClose}
      data-testid='modal-wrapper'
    >
      <Box sx={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '46vw',
        bgcolor: 'background.paper',
        boxShadow: 24
      }}>
        {props.onClose &&
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center',
            ml: 2,
            mt: 2
          }}>
            <IconButton onClick={props.onClose}>
              <CloseIcon />
            </IconButton>
            <Typography variant='h6'>
              {props.heading}
            </Typography>
          </Box>
        } <br /> <br />
        <Box sx={{
          height: '60vh',
          overflow: 'auto',
          padding: 4,
          pt: 0
        }}>
          {props.children}
        </Box>
        <Box sx={{
          borderTop: '1px solid rgb(231, 231, 231)'
        }}>
          {props.action}
        </Box>
      </Box>
  </MuiModal>
  );
}

export default Modal;
