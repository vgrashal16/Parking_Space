import {  fireEvent, render } from '@testing-library/react';
import ParkSpace from '../components/parkSpace';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { parkingState } from '../atoms/parkingState';

// Mock the useNavigate hook before rendering the component

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));


describe('ParkSpace component', () => {
  it('should navigate to /lot/car on button click', () => {
    const id = 1; // Mocked id value
    const navigateMock = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigateMock);

    // Render the component with RecoilRoot and MemoryRouter
    const { getByRole } = render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(parkingState, [{ id: 1, parked: false, parked_at: '', reg_no: '' }]);
        }}
      >
        <MemoryRouter>
          <ParkSpace id={id} />
        </MemoryRouter>
      </RecoilRoot>
    );

    // Simulate button click
    const parkButton = getByRole('button', { name: '1' });
    fireEvent.click(parkButton);

    // Expect that navigate was called with the correct arguments
    expect(navigateMock).toHaveBeenCalledTimes(1)
    expect(navigateMock).toHaveBeenCalledWith('/lot/car')
    // expect(navigateMock).toHaveBeenCalledWith('/lot/car', { state: id });
  });
});





// const parkingState = atom({
//   key: 'parkingState',
//   default: [{ id: 1, parked: false }] 
// });

// test('button click', () => {
//   const { getByRole } = render(
//     <RecoilRoot initializeState={({ set }) => set(parkingState, [{ id: 1, parked: false }])}>
//       <MemoryRouter>
//         <ParkSpace id={1} />
//       </MemoryRouter>
//     </RecoilRoot>
//   );
    
//   fireEvent.click(getByRole('button'));
// });
