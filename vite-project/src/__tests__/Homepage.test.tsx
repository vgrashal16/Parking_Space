import { fireEvent, render, screen} from '@testing-library/react';
import HomePage from '../components/homepage';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

test('renders without crashing', () => {
  render( <RecoilRoot>
  <MemoryRouter>
    <HomePage />
  </MemoryRouter>
  </RecoilRoot>
  );
});

test('submit button click', () => {
  render(
    <RecoilRoot>
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
    </RecoilRoot>
  );
  const inputField = screen.getByTestId('parking-spaces-input');
  // console.log(inputField);
  fireEvent.change(inputField, { target: { value: '10' } });
  const submitButton = screen.getByRole('button', { name: 'Submit' });
  fireEvent.click(submitButton);
});
