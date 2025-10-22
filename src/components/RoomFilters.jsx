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
    <div>
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <label htmlFor="room-type">Room Type</label>
          <select 
            value={filters.type} 
            onChange={(e) => handleTypeChange(e.target.value)}
            id="room-type"
          >
            <option value="All">All Types</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
            <option value="Deluxe">Deluxe</option>
          </select>
        </div>

        <div className="space-y-3">
            <input
              type="range"
              min={0}
              max={500}
              step={10}
              value={filters.maxPrice}
              onChange={(e) => handlePriceChange([filters.minPrice, parseInt(e.target.value)])}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${filters.minPrice}</span>
            <span>${filters.maxPrice}</span>
          </div>
        </div>

        <button variant="outline" onClick={handleReset} className="w-full">
          Reset Filters
        </button>
      </div>
  );
};

export default RoomFilters;
