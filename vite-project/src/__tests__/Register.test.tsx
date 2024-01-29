import { render, fireEvent } from '@testing-library/react';
import Register from '../components/register';
import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';

test('renders without crashing', () => {
  render(  <RecoilRoot>
    <MemoryRouter>
    <Register />
  </MemoryRouter>
  </RecoilRoot>);
});

test('submit button click', () => {
  const { getByLabelText, getByText } = render(  <RecoilRoot>
    <MemoryRouter>
    <Register />
  </MemoryRouter>
  </RecoilRoot>);
  fireEvent.change(getByLabelText('Car Registration Number'), { target: { value: 'ABC123' } });
  fireEvent.click(getByLabelText('Add'));
  fireEvent.click(getByText('Submit'));
});

test('back button click', () => {
  const { getByText } = render(  <RecoilRoot>
    <MemoryRouter>
    <Register />
  </MemoryRouter>
  </RecoilRoot>);
  fireEvent.click(getByText('Go Back'));
  expect(window.location.pathname).toBe('/');
});
