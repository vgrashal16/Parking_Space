import React from 'react';
import { Button, Grid } from '@mui/material';
import ParkSpace from './parkSpace'; 
import { useRecoilValue } from 'recoil';
import { parkingState } from '../atoms/parkingState';
import { useNavigate } from 'react-router-dom';

const ParkingLot: React.FC = () => {
  const parkState = useRecoilValue(parkingState);
  const numRows = Math.ceil(parkState.length / 5);
  const navigate = useNavigate();
  console.log(parkState);

  
  const handleAdd = () => {
    const availableParking = parkState.filter(obj => !obj.parked);

    if (availableParking.length === 0) {
      throw new Error('No available parking spots');
    }
    // select random object from availableParking
    const randomIndex = Math.floor(Math.random() * availableParking.length);
    const selectedParkingSpot = availableParking[randomIndex];

    console.log('Selected Parking Spot:', selectedParkingSpot.id);
    navigate('/lot/register', {state : selectedParkingSpot.id});
  };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'center', height: '100vh', width: '50%' }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {Array.from({ length: numRows }).map((_, rowIndex) => (
          <Grid key={rowIndex} item xs={12} container width= '20px' height="40px" justifyContent="center" alignItems="center">
            <Grid container spacing={2}>
              {parkState.slice(rowIndex * 5, (rowIndex + 1) * 5).map(parkSpace => (
                <Grid key={parkSpace.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <ParkSpace id = {parkSpace.id}/>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
    <Button variant='contained' color= 'primary' onClick={handleAdd}>ADD</Button>
    </div>
  );
}

export default ParkingLot;
