import { useLottie } from 'lottie-react';
import PizzaAnimation from './lotties/pizza.json';
import BurgerAnimation from './lotties/burger.json';
import SandwichAnimation from './lotties/sandwich.json';
import ChickenAnimation from './lotties/chicken.json';
import AsianAnimation from './lotties/asian.json';
import ChineseAnimation from './lotties/chinese.json';
import MexicanAnimation from './lotties/mexican.json';
import ItalianAnimation from './lotties/italian.json';
import IndianAnimation from './lotties/indian.json';
import SpanishAnimation from './lotties/spanish.json';
import { Box, Typography } from '@mui/material';
import { useState, Dispatch } from 'react';
import { CuisinesList } from '../../app/CuisinesList';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { lookupFilteredDiners } from '../../features/diners/dinersSlice';
import { filter as filterDiners } from '../../features/diners/dinersSlice';
import NoCuisines from './images/no_cuisines.gif';
import DinerCard from '../DinerCard/DinerCard';

type Animation = ReturnType<typeof useLottie>;
type Animations = Animation[];

interface SingleCuisineProps {
  title: string;
  id: CuisinesList;
  source: object;
  setSelected: Dispatch<CuisinesList>;
  play: boolean;
};

const animations: Animations = [];

function SingleCuisine(props: SingleCuisineProps) {
  const dispatch = useAppDispatch();

  const Lottie = useLottie({
    animationData: props.source,
    loop: false,
    autoplay: props.play
  });

  animations.push(Lottie);

  function click() {
    animations.forEach(animation => animation.stop());
    Lottie.play();
    props.setSelected(props.id);
    dispatch(filterDiners(props.id));
  }

  return(
    <Box
      sx={{
        width: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer'
      }}

      data-testid='single-cuisine'

      onClick={click}
    >
      { Lottie.View }
      <b style={{ color: '#090909' }}>{ props.title }</b>
    </Box>
  )
}

function Cuisines() {
  const selectedDiners = useAppSelector(lookupFilteredDiners);

  const [selectedCuisine, setSelectedCuisine] = useState<CuisinesList>(CuisinesList.Burger);
  const capitalizeCuisine = (c:string) => c.charAt(0).toUpperCase() + c.slice(1);
  
  return(<>
    <Box sx={{ display: 'flex', gap: 2 }}>
      <SingleCuisine title={capitalizeCuisine(CuisinesList.Burger)} id={CuisinesList.Burger} play={Boolean(selectedCuisine === CuisinesList.Burger)}  setSelected={setSelectedCuisine} source={BurgerAnimation} />
      <SingleCuisine title={capitalizeCuisine(CuisinesList.Pizza)} id={CuisinesList.Pizza} play={Boolean(selectedCuisine === CuisinesList.Pizza)} setSelected={setSelectedCuisine} source={PizzaAnimation} />      <SingleCuisine title={capitalizeCuisine(CuisinesList.Sandwich)} id={CuisinesList.Sandwich} play={Boolean(selectedCuisine === CuisinesList.Sandwich)}  setSelected={setSelectedCuisine} source={SandwichAnimation} />
      <SingleCuisine title={capitalizeCuisine(CuisinesList.Chicken)} id={CuisinesList.Chicken} play={Boolean(selectedCuisine === CuisinesList.Chicken)}  setSelected={setSelectedCuisine} source={ChickenAnimation} />
      <SingleCuisine title={capitalizeCuisine(CuisinesList.Chinese)} id={CuisinesList.Chinese} play={Boolean(selectedCuisine === CuisinesList.Chinese)}  setSelected={setSelectedCuisine} source={ChineseAnimation} />
      <SingleCuisine title={capitalizeCuisine(CuisinesList.Mexican)} id={CuisinesList.Mexican} play={Boolean(selectedCuisine === CuisinesList.Mexican)}  setSelected={setSelectedCuisine} source={MexicanAnimation} />
      <SingleCuisine title={capitalizeCuisine(CuisinesList.Italian)} id={CuisinesList.Italian} play={Boolean(selectedCuisine === CuisinesList.Italian)}  setSelected={setSelectedCuisine} source={ItalianAnimation} />
      <SingleCuisine title={capitalizeCuisine(CuisinesList.Asian)} id={CuisinesList.Asian} play={Boolean(selectedCuisine === CuisinesList.Asian)}  setSelected={setSelectedCuisine} source={AsianAnimation} />
      <SingleCuisine title={capitalizeCuisine(CuisinesList.Indian)} id={CuisinesList.Indian} play={Boolean(selectedCuisine === CuisinesList.Indian)}  setSelected={setSelectedCuisine} source={IndianAnimation} />
      <SingleCuisine title={capitalizeCuisine(CuisinesList.Spanish)} id={CuisinesList.Spanish} play={Boolean(selectedCuisine === CuisinesList.Spanish)}  setSelected={setSelectedCuisine} source={SpanishAnimation} />
    </Box>

    {
      selectedDiners.length === 0 ?
        <Box sx={{ textAlign: 'center', opacity: .5, mt: 6 }}>
          <Typography variant='body2'>
            We're closing deals with the most of restaurants and <br />
            fast foods we can cover, please come back later
          </Typography>
          <img src={NoCuisines} width='350' alt='no fastfoods' />
        </Box> :
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            flexDirection: 'row',
            mt: 6
          }}
        >
          {
            selectedDiners.map(diner => {
              return(
                <DinerCard
                  title={diner?.title}
                  address={diner?.address}
                  pictureUri={diner?.pictureUri}
                  headerUri={diner?.headerUri}
                  id={diner?.id}
                />
              )
            })
          }
        </Box>
    }
  </>);
}

export default Cuisines;
