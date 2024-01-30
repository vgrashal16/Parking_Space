import React, { ChangeEvent } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {  useSetRecoilState } from 'recoil';
import { parkingSpace } from '../atoms/parkingSpace';


const HomePage: React.FC = () => {
  const setSpace = useSetRecoilState<any>(parkingSpace);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
      setSpace(e.target.value);  
  }


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('submit');
    navigate(`/lot`);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20vh' }}>
      <Typography variant="h3" gutterBottom align="center">
        Just Park
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter number of parking spaces"
          inputProps={{ "data-testid": "parking-spaces-input", type: 'number', style: { color: 'aliceblue', backgroundColor: '#21242c', borderRadius: '10px'}}}
          InputLabelProps={{
            style: { color: 'aliceblue' },
          }}
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
        />
        <div style={{ textAlign: 'center' }}>
          <Button type="submit" variant="contained" color= "primary">
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default HomePage;
