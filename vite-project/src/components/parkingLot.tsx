import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import ParkSpace from './parkSpace'; 
import { useRecoilValue } from 'recoil';
import { parkingState } from '../atoms/parkingState';
import { useNavigate } from 'react-router-dom';
import {Toaster, toast} from 'react-hot-toast';

const ParkingLot: React.FC = () => {
  const parkState = useRecoilValue(parkingState);
  const numRows = Math.ceil(parkState.length / 5);
  const navigate = useNavigate();
  console.log(parkState);

  
  const handleAdd = () => {
    const availableParking = parkState.filter(obj => !obj.parked);

    if (availableParking.length === 0) {
      toast.error("No available parking spots")
    }
    // select random object from availableParking
    const randomIndex = Math.floor(Math.random() * availableParking.length);
    const selectedParkingSpot = availableParking[randomIndex];

    console.log('Selected Parking Spot:', selectedParkingSpot.id);
    navigate('/lot/register', {state : selectedParkingSpot.id});
  };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%', flexDirection: 'column' }}>
      <Typography variant="h4" style={{marginTop: '20px',marginBottom: '20px', color: 'white'}}>
        Parking Lot
      </Typography>
      <Button variant='contained' color='primary' onClick={handleAdd}>ADD</Button>
      <Toaster position="top-center" reverseOrder={false}/>
      <div style={{ alignItems: 'center',  width: '50%', overflowY: 'auto', maxHeight: 'calc(100vh - 200px)', paddingTop: '60px' }}>
        <Grid container spacing={2} style={{paddingLeft: '0', paddingTop: '0'}}>
          {Array.from({ length: numRows }).map((_, rowIndex) => (
            <Grid key={rowIndex} item xs={12} container width='20px' height="140px" justifyContent="center" style={{paddingLeft: '0', paddingTop: '0'}}>
              <Grid container spacing={2} width='100%' height="100%" style={{paddingLeft: '0', paddingTop: '0'}}>
                {parkState.slice(rowIndex * 5, (rowIndex + 1) * 5).map(parkSpace => (
                  <Grid key={parkSpace.id} item xs={12} sm={6} md={4} lg={3} xl={2} style={{paddingLeft: '0', paddingTop: '0'}}>
                    <div style={{ width: '100%', height: '100%' , display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                      <ParkSpace id={parkSpace.id} />
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
  
  
}

export default ParkingLot;
