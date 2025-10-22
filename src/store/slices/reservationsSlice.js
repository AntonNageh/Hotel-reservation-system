import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reservations: [],
};

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    addReservation: (state, action) => {
      const newReservation = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      state.reservations.push(newReservation);
    },
    cancelReservation: (state, action) => {
      state.reservations = state.reservations.filter((res) => res.id !== action.payload);
    },
  },
});

export const { addReservation, cancelReservation } = reservationsSlice.actions;
export default reservationsSlice.reducer;
