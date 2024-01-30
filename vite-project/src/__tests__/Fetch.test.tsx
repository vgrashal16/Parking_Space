import { RecoilRoot } from "recoil";
import { render, fireEvent, waitFor } from '@testing-library/react';
import Car from '../components/car';
import { MemoryRouter } from 'react-router-dom';
import { parkingState } from '../atoms/parkingState';
import axios from "axios";

const mockLocation = {
  state: 1
};

test('calls payDone function when Pay button is pressed', async () => {
  const mockParkingData = [
    { id: 0, reg_no: 'ABC123', parked_at: new Date().toLocaleTimeString(), parked: true },
    { id: 1, reg_no: 'ABC123', parked_at: new Date().toLocaleTimeString(), parked: true },
  ];
  const mockedResponse = { code: 200, description: 'OK' };

  jest.spyOn(axios, 'post').mockResolvedValueOnce(mockedResponse);

  const { getByText } = render(
    <RecoilRoot initializeState={({ set }) => set(parkingState, mockParkingData)}>
      <MemoryRouter initialEntries={[{ pathname: '/lot/car', state: mockLocation.state }]}>
        <Car />
      </MemoryRouter>
    </RecoilRoot>
  );

  const payButton = getByText('Pay');

  fireEvent.click(payButton);

  // Wait for the asynchronous operations to complete
  await waitFor(() => {
    // Check that axios.post was called with the expected arguments
    expect(axios.post).toHaveBeenCalledWith(
      'https://httpstat.us/200',
      { 'car-registration': 'ABC123', charge: 10 }
    );

    // Optionally, you can also check other expectations here
  });
});
