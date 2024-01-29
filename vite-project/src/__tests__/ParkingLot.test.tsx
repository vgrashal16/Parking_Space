import { render, fireEvent, screen } from '@testing-library/react';
import ParkingLot from '../components/parkingLot';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { parkingSpace } from '../atoms/parkingSpace';

test('renders without crashing', () => {
  render(
  <RecoilRoot>
    <MemoryRouter>
    <ParkingLot />
  </MemoryRouter>
  </RecoilRoot>
  );
});

test('add button click', () => {
  const spaces = 10; 
  render(
    <RecoilRoot initializeState={({ set }) => set(parkingSpace, spaces)}>
      <MemoryRouter>
        <ParkingLot />
      </MemoryRouter>
    </RecoilRoot>
  );

  const addButton = screen.getByRole('button', { name: 'ADD' });
  fireEvent.click(addButton);
});

// test('add button click throw error', () => {
//   render(
//     <RecoilRoot>
//       <MemoryRouter>
//         <ParkingLot />
//       </MemoryRouter>
//     </RecoilRoot>
//   );
//   const addButton = screen.getByRole('button', { name: 'ADD' });
//   expect(()=>{fireEvent.click(addButton);});
// });