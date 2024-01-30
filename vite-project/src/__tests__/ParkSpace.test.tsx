import {  fireEvent,  render } from '@testing-library/react';
import ParkSpace  from '../components/parkSpace';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { parkingState } from '../atoms/parkingState';
// import Car from '../components/car';

// const navigate = jest.fn()
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => navigate,
// }))

// test('should navigate to /lot/car on button click', () => {
//     const { getByText, getByRole } = render(
//       <RecoilRoot
//         initializeState={({ set }) => {
//           set(parkingState, [{ id: 1, parked: false, parked_at: '', reg_no: '' }]);
//         }}
//       >
//         <MemoryRouter>
//         <ParkSpace id={1}/>
//         <Car id={1}/>
//         </MemoryRouter>
//       </RecoilRoot>
//     );
//     const parkButton = getByRole('button', {name: '1'});
//     fireEvent.click(parkButton);
//     // expect(window.location.pathname).toBe('/lot/car');
//     const car_reg = getByText(/Car Registration Number:/i);
//     expect(car_reg).toBeInTheDocument();
//     // expect(navigate).toHaveBeenCalledWith('/lot/car')
//     // expect(history.location.pathname).toBe('/location1');
//     // expect(navigateMock).toHaveBeenCalledWith('/lot/car', { state: id });
// });

// const parkingState = atom({
//   key: 'parkingState',
//   default: [{ id: 1, parked: false }] 
// });

test('button click', () => {
  const { getByRole } = render(
    <RecoilRoot initializeState={({ set }) => set(parkingState, [{ id: 1, parked: false, reg_no: '', parked_at: '' }])}>
      <MemoryRouter>
        <ParkSpace id={1} />
      </MemoryRouter>
    </RecoilRoot>
  );
    
  fireEvent.click(getByRole('button'));
});




