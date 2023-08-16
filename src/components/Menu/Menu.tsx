import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Food, getMenuById } from "../../features/menus/menusSlice";
import { Box, Tab, Tabs } from "@mui/material";
import FoodItem from "../FoodItem/FoodItem";
import VisitingFood from "../VisitingFood/VisitingFood";
import { tag } from "../../features/prepare/prepareSlice";

interface MenuProps {
  dinerId: string
};

function Menu(props: MenuProps) {
  const dispatch = useAppDispatch();

  const menu = useAppSelector(getMenuById(props.dinerId));

  const [groupingIndex, setGroupingIndex] = useState<number>(0);

  const mappedIdsToGroupings: {
    [id: number]: string
  } = {};
  Object
    .keys(menu.byGrouping)
    .forEach((grouping, index) =>
      mappedIdsToGroupings[index] = grouping
    );

  const exposedFoods: Food[] = menu.byGrouping[
    mappedIdsToGroupings[
    groupingIndex
    ]
  ];

  const [details, setDetails] = useState<Food | null>();
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const handleDetailsOpen = (food: Food) => {
    dispatch(tag(food.earlyCost));

    setDetails(food);
    setDetailsOpen(true);
  }
  const handleDetailsClose = () => {
    setDetails(null);
    setDetailsOpen(false);
  }

  return (
    <>
      <Tabs value={groupingIndex} onChange={
        (
          e: React.SyntheticEvent,
          newValue: number
        ) =>
          setGroupingIndex(newValue)
      }>
        {
          Object
            .keys(menu.byGrouping)
            .map((grouping, index) =>
              <Tab label={grouping} value={index} data-testid='tab' />
            )
        }
      </Tabs>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        flexWrap: 'wrap'
      }} data-testid='tab-container'>
        {
          exposedFoods.map(food =>
            <FoodItem
              food={food}
              onClick={() => handleDetailsOpen(food)}
            />
          )
        }
      </Box>

      <VisitingFood food={details!} open={detailsOpen} onClose={handleDetailsClose} />
    </>
  )
}

export default Menu;
