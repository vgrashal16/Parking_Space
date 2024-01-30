import React from 'react'
import { Button, Typography } from '@mui/material'
import { useRecoilValue } from 'recoil';
import { parkingState } from '../atoms/parkingState';
import { useNavigate } from 'react-router-dom';

interface ParkSpaceProps {
  id: number; 
}

const ParkSpace: React.FC<ParkSpaceProps> = ({ id }) => {
  const parkState = useRecoilValue(parkingState);
  const parked = parkState[id -1].parked;
  const navigate = useNavigate();

  const handleClick = ( ) => {
    // console.log(id , parked);
    navigate('/lot/car', {state: id})
  }

  return (
    <div style={{width: '65%', height: '85%'}}>
      <Button style={{width: '100%', height: '100%', borderRadius: '15px' }} sx={{backgroundColor: parked ? 'grey':'darkgreen','&:hover': {
      backgroundColor: parked ? 'lightgrey' : 'darkgreen'}}} disabled={!parked} onClick={handleClick}>
      <Typography style={{color: parked ? 'black':'white', fontSize: '0.8em'}}>
        {parked ? (parkState[id-1].reg_no + "\nparked") : id}
      </Typography>
      </Button>
    </div>
  )
}

export default ParkSpace
