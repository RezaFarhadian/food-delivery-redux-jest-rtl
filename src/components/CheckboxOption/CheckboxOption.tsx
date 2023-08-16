import { Checkbox } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { changeOption, dropBy, increment } from "../../features/prepare/prepareSlice";

interface CheckboxOptionProps {
  amount: number,
  value: string
};

function CheckboxOption(props: CheckboxOptionProps): JSX.Element {
  const dispatch = useAppDispatch();
  
  const changeRelatedOption = (newValue: boolean) => {
    dispatch(changeOption({
      name: props.value,
      value: newValue
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      changeRelatedOption(true);
      dispatch(increment(props.amount))
    } else {
      changeRelatedOption(false);
      dispatch(dropBy(props.amount))
    }
  };

  return <Checkbox data-testid='child-checkbox' onChange={handleChange} />;
}

export default CheckboxOption;
