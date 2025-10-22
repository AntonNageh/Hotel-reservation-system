import { createSlice } from '@reduxjs/toolkit';
import roomSingle from '@/assets/room-single.jpg';
import roomDouble from '@/assets/room-double.jpg';
import roomSuite from '@/assets/room-suite.jpg';
import roomDeluxe from '@/assets/room-deluxe.jpg';

const mockRooms = [
  {
    id: '1',
    name: 'Cozy Single Room',
    type: 'Single',
    price: 89,
    description: 'Perfect for solo travelers, our cozy single room offers comfort and style with modern amenities.',
    amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar'],
    capacity: 1,
    image: roomSingle,
    available: true,
  },
  {
    id: '2',
    name: 'Deluxe Double Room',
    type: 'Double',
    price: 149,
    description: 'Spacious double room with elegant furnishings, ideal for couples seeking a romantic getaway.',
    amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Room Service', 'Balcony'],
    capacity: 2,
    image: roomDouble,
    available: true,
  },
  {
    id: '3',
    name: 'Executive Suite',
    type: 'Suite',
    price: 299,
    description: 'Luxurious suite with separate living area, premium amenities, and stunning city views.',
    amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Room Service', 'Balcony', 'Jacuzzi', 'Kitchen'],
    capacity: 4,
    image: roomSuite,
    available: true,
  },
  {
    id: '4',
    name: 'Premium Double Room',
    type: 'Double',
    price: 129,
    description: 'Comfortable double room with modern design and all essential amenities for a pleasant stay.',
    amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Safe'],
    capacity: 2,
    image: roomDouble,
    available: true,
  },
  {
    id: '5',
    name: 'Royal Suite',
    type: 'Suite',
    price: 449,
    description: 'Our most luxurious accommodation with premium facilities, butler service, and panoramic views.',
    amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Room Service', 'Balcony', 'Jacuzzi', 'Kitchen', 'Butler Service'],
    capacity: 6,
    image: roomSuite,
    available: true,
  },
  {
    id: '6',
    name: 'Deluxe King Room',
    type: 'Deluxe',
    price: 189,
    description: 'Spacious deluxe room with king-size bed, perfect for those seeking extra comfort and luxury.',
    amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Room Service', 'Safe', 'Work Desk'],
    capacity: 2,
    image: roomDeluxe,
    available: true,
  },
];

const initialState = {
  rooms: mockRooms,
  filteredRooms: mockRooms,
  filters: {
    type: 'All',
    minPrice: 0,
    maxPrice: 500,
  },
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredRooms = state.rooms.filter((room) => {
        const matchesType = state.filters.type === 'All' || room.type === state.filters.type;
        const matchesPrice = room.price >= state.filters.minPrice && room.price <= state.filters.maxPrice;
        return matchesType && matchesPrice;
      });
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredRooms = state.rooms;
    },
  },
});

export const { setFilters, resetFilters } = roomsSlice.actions;
export default roomsSlice.reducer;
