import React from 'react'
import { Button } from '@mui/material'
import { useRecoilValue } from 'recoil';
import { parkingState } from '../atoms/parkingState';

interface ParkSpaceProps {
  id: number; 
}

const ParkSpace: React.FC<ParkSpaceProps> = ({ id }) => {
  const parkState = useRecoilValue(parkingState);

  const parked = parkState[id -1].parked;
  
  const handleClick = ( ) => {
    console.log(id , parked);
  }

  return (
    <div style={{width: '20px', height: '20px'}}>
      <Button variant='outlined' style={{width: '20px', height: '20px'}} sx={{backgroundColor: parked ? 'red':'green', color: 'black'}} disabled={!parked} onClick={handleClick}>{id}</Button>
    </div>
  )
}

export default ParkSpace
