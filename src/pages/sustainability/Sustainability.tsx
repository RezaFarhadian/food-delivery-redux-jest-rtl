import { Box, Container, Typography } from '@mui/material'
import RefuelingWebp from './images/refueling.webp'

function Sustainability() {
  return(
    <Container sx={{
      display: 'flex',
      flexDirection: 'row',
      gap: 5,
      alignItems: 'center',
      mt: 10
    }}>
      <img src={RefuelingWebp} alt='refueling sustainable car' width={400} />
      <Box>
        <Typography variant='h1'>
          Sustainability
        </Typography>
        <Typography variant='body1'>
          As a strategy, sustainability requires leadership and top-level commitment, strong values and ethics deeply embedded in the corporate culture, and incorporation throughout all business activities. Sustainability must be embedded in the core competencies and competitive position of the company and engage all stakeholders. Finally, reexamination of the business model, organizational structure, reward system, and other management systems are in order. We will examine each of these in further detail.
        </Typography>
      </Box>
    </Container>
  )
}

export default Sustainability;
