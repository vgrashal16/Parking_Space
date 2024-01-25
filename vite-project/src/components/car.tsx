import { Box, Button, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { parkingState } from '../atoms/parkingState';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

interface CarProps {
  id: number; 
}

const Car: React.FC<CarProps> = () => {
  const navigate = useNavigate();
  const [parkState, setparkState] = useRecoilState(parkingState)
  const [fare, setFare] = useState(0);
  const location = useLocation();
  const id = location.state;
  const curr = new Date().toLocaleTimeString();
  console.log(id);
  
  
  const fetchPay = async() => {
    const body = {"car-registration": parkState[id-1].reg_no , "charge": fare}
    // console.log(body)
    const res = await fetch('https://httpstat.us/200', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    });

    const data = await res.json();
    console.log(data)
  }
  
  const payDone = () => {

    setparkState((prevParkState) => {
      return prevParkState.map((parkingSpace) => {
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
    navigate('/lot');
  }

  const handlePay = () => {
    console.log("clicked ");
    fetchPay();
    setTimeout(payDone, 2000);
  }
  
  useEffect(() => {
    
    const time1 = new Date("2000/01/01 " + parkState[id-1].parked_at); 
    const time2 = new Date("2000/01/01 " +  new Date().toLocaleTimeString());
  
    const time: number = (time2.getTime() - time1.getTime())/(1000 * 60 * 60);

    // Calculate fare based on conditions
    if (time <= 2) {
      setFare(10);
    } 
    else {
      const extraHours = Math.ceil(time - 2); // Exclude the first two hours
      setFare(10 + extraHours * 10);
    }
  }, []);


  return (
    <>
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      height="100vh"
      margin="auto" 
      >
      <Typography fontSize="40px">Car Entry</Typography>
      <Box maxWidth="800px" padding= "20px" width="100%" border="4px solid black" borderRadius="20px" p={2} style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <Box display="flex" alignItems="center" gap={1}  style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
          <Typography>Car Registration Number: {parkState[id-1].reg_no}</Typography>
          <Typography>Time parked at: {parkState[id-1].parked_at}</Typography> 
          <Typography>Current Time: {curr}</Typography>
          <Typography>Fare: {fare}$</Typography>
        </Box>
        <Button onClick={handlePay} >Pay</Button>
      </Box>
    </Box>
    </>
  )
}

export default Car