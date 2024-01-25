import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Register: React.FC = () => {
  const [carRegistration, setCarRegistration] = useState('');
  const [parkingTime, setParkingTime] = useState('');

  // Function to handle button click event to set current time
  const handleSetCurrentTime = () => {
    const currentTime = new Date().toLocaleTimeString();
    setParkingTime(currentTime);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" gap="10px">
      <Box maxWidth="400px" width="100%" p={2}>
        <TextField
          label="Car Registration Number"
          variant="outlined"
          fullWidth
          value={carRegistration}
          onChange={(e) => setCarRegistration(e.target.value)}
        />
        <Box display="flex" alignItems="center" gap={1}>
          <TextField
            label="Parking Time"
            variant="outlined"
            fullWidth
            value={parkingTime}
            disabled={true}
          />
          <IconButton aria-label="Add" onClick={handleSetCurrentTime}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
