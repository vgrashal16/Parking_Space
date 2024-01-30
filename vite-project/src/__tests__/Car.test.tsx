import { render, fireEvent } from '@testing-library/react';
import Car from '../components/car';
import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';
import { parkingState } from '../atoms/parkingState';

const mockLocation = {
  state: 1
};

test('renders without crashing', () => {
  render(
    <RecoilRoot
      initializeState={({ set }) =>
        set(parkingState, [
          {id: 0, parked: true, reg_no: 'MP04 20222', parked_at: '22 PM'}, 
          { id: 1, parked: true, reg_no: 'MP04 2022', parked_at: '2 PM' }
        ])
      }
    >
      <MemoryRouter initialEntries={[{ pathname: '/lot/car', state: mockLocation.state }]}>
        <Car />
      </MemoryRouter>
    </RecoilRoot>
  );
});



test('back button click', () => {
  const { getByText } = render(
    <RecoilRoot
    initializeState={({ set }) =>
        set(parkingState, [
          { id: 0, parked: true, reg_no: 'MP04 20222', parked_at: '22 PM' },
          { id: 1, parked: true, reg_no: 'MP04 2022', parked_at: '2 PM' }
        ])
      }>
      <MemoryRouter initialEntries={[{ pathname: '/lot/car', state: mockLocation.state }]}>
        <Car />
      </MemoryRouter>
    </RecoilRoot>
  );
  const backButton = getByText(/Go Back/i);
  fireEvent.click(backButton);
});


