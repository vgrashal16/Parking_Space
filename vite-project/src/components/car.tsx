import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { parkingState } from '../atoms/parkingState';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Car: React.FC = () => {
  const navigate = useNavigate();
  const [parkState, setParkState] = useRecoilState(parkingState);
  const [fare, setFare] = useState(0);
  const [curr, setCurr] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const location = useLocation();
  const id: number = location.state;
  
  const fetchPay = async () => {
    await axios.post('https://httpstat.us/200', {
      'car-registration': parkState[id - 1].reg_no,
      charge: fare,
    });
  };

  const payDone = () => {
    setParkState(prevParkState => {
      return prevParkState.map(parkingSpace => {
        if (parkingSpace.id === id) {
          return {
            ...parkingSpace,
            parked: false,
            parked_at: null,
            reg_no: null,
          };
        } else {
          return parkingSpace;
        }
      });
    });
    setLoading(false);
    navigate('/lot');
  }
  
  const handlePay = async () => {
    setDisabled(false);
    setLoading(true); 
    try {
      await fetchPay();
      setTimeout(payDone, 2000);
    } catch (error) {
      // Handle error
      console.error(error);
      setLoading(false);
    }
  }
  
  useEffect(() => { 
    const time1 = new Date("2000/01/01 " + parkState[id - 1].parked_at); 

    const intervalId = setInterval(() => {
      const time2 = new Date("2000/01/01 " + new Date().toLocaleTimeString());
      setCurr(time2.toLocaleTimeString());
      
      const time: number = (time2.getTime() - time1.getTime()) / (1000 * 60 * 60);
      
      if (time <= 2) {
        setFare(10);
      } else {
        const extraHours = Math.ceil(time - 2); 
        setFare(10 + extraHours * 10);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Button style={{margin: '10px'}} sx={{color: 'white', '&:hover': {backgroundColor: '#21242c'}}} disabled={!isDisabled} onClick={() => navigate('/lot')}>Go Back</Button>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        height="100vh"
        margin="auto" 
      >
        <Typography fontSize="40px">Parking Details</Typography>
        <Box maxWidth="800px" padding="20px" width="100%" border="2px solid white" borderRadius="20px" p={2} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          {loading ? (
            <Box display="flex" alignItems="center" gap={1} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {parkState[id - 1] && (
                <Box display="flex" alignItems="center" gap={1} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <Typography>Car Registration Number: {parkState[id - 1].reg_no}</Typography>
                  <Typography>Time parked at: {parkState[id - 1].parked_at}</Typography>
                  <Typography>Current Time: {curr}</Typography>
                  <Typography>Fare: {fare}$</Typography>
                </Box>
              )}
              <Button onClick={handlePay} disabled={fare === 0} style={{width: '30%', alignSelf: 'center', }}  
              sx={{color: 'white', '&:disabled': {backgroundColor: 'transparent', color: 'grey'}, '&:hover': {backgroundColor: '#21242c'}}}>Pay</Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Car;
