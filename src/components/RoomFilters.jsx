import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilters, resetFilters } from '@/store/slices/roomsSlice';

const RoomFilters = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.rooms.filters);

  const handleTypeChange = (value) => {
    dispatch(setFilters({ type: value }));
  };

  const handlePriceChange = (value) => {
    dispatch(setFilters({ minPrice: value[0], maxPrice: value[1] }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="p-6 space-y-8 bg-white rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800">Filter Rooms</h2>

      {/* Room Type */}
      <div className="space-y-2">
        <label htmlFor="room-type" className="block text-sm font-medium text-gray-600">
          Room Type
        </label>
        <select
          id="room-type"
          value={filters.type}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-800 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition"
        >
          <option value="All">All Types</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
          <option value="Deluxe">Deluxe</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-600">Price Range</label>
        <div className="relative w-full">
          <input
            type="range"
            min={0}
            max={500}
            step={10}
            value={filters.maxPrice}
            onChange={(e) => handlePriceChange([filters.minPrice, parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[hsl(var(--primary))]"
            style={{
              background: `linear-gradient(to right, hsl(var(--primary)) ${filters.maxPrice / 5}%, #e5e7eb ${filters.maxPrice / 5}%)`,
            }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>${filters.minPrice}</span>
          <span>${filters.maxPrice}</span>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="w-full py-2.5 mt-4 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default RoomFilters;
