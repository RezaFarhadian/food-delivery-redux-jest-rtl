import {
  Paper,
  InputBase,
  IconButton
} from "@mui/material";
import { useRef } from "react";
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

type OptionalCurrentRef<T> = {
  [K in keyof T]: K extends 'current' ? Partial<T[K]> : T[K]
}
interface UnkownMutableRefObject
  extends React.MutableRefObject<
    OptionalCurrentRef<
      HTMLInputElement | undefined
    >
  > {};

type AddressInputProps = {
  placeholder?: string;
  onKeyDown?(
    e: React.KeyboardEvent<HTMLInputElement>,
    ref: UnkownMutableRefObject
  ): void;
};

function AddressInput(props: AddressInputProps = {
  placeholder: 'Enter delivery address...',
  onKeyDown: () => {}
}) {
  const ref: UnkownMutableRefObject = useRef();

  return (
      <Paper sx={{
        p: 1,
        display: 'flex',
        alignItems: 'center',
        width: 400
      }}>
        <ShareLocationIcon sx={{ opacity: .5, ml: 1 }} />
        <InputBase
          fullWidth
          sx={{ flex: 1, ml: 2, width: '300px' }}
          placeholder={props.placeholder}
          inputComponent='input'
          inputRef={ref}
          inputProps={{
            'aria-label': 'address input',
            'data-testid': 'address-input',
            'id': 'address-input',
            'name': 'address',
            'type': 'text',
            'style': { WebkitBoxShadow: "0 0 0 1000px white inset" }
          }}
          autoComplete="address-line1"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => props.onKeyDown!(e, ref)}
        />
        <IconButton data-testid='submit-address' onClick={() => {
          props.onKeyDown!({ key: 'Enter' } as React.KeyboardEvent<HTMLInputElement>, ref)
        }}>
          <ArrowCircleRightIcon color='primary' sx={{ fontSize: '30px' }} />
        </IconButton>
      </Paper>
  )
}

export default AddressInput
