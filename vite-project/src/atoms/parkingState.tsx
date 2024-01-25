import { atom, selector } from 'recoil';
import { parkingSpace } from './parkingSpace';

export interface ParkingObject {
  id: number;
  parked: boolean;
  parked_at: null | string; 
  reg_no: null | string; 
}

export const initializeParkingState = selector<ParkingObject[]>({
  key: 'initializeParkingState',
  get: ({ get }) => {
    const spaces = get(parkingSpace);
    return Array.from({ length: spaces }, (_, index) => ({
      id: index + 1, 
      parked: false,
      parked_at: null,
      reg_no: null,
    }));
  },
});

export const parkingState = atom<ParkingObject[]>({
  key: 'parkingState',
  default: initializeParkingState, // Initialize parkingState with the selector
});
