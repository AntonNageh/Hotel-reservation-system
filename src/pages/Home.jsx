import { useAppSelector } from '@/store/hooks';
import RoomCard from '@/components/RoomCard';
import RoomFilters from '@/components/RoomFilters';
import Navbar from '@/components/Navbar';

const Home = () => {
  const filteredRooms = useAppSelector((state) => state.rooms.filteredRooms);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-5xl font-bold">Find Your Perfect Stay</h1>
          <p className="mx-auto max-w-2xl text-lg opacity-90">
            Experience luxury and comfort in our carefully curated selection of premium rooms
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
          {/* Filters Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:h-fit bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Filters
            </h2>
            <RoomFilters />
          </aside>

          {/* Room Listing Section */}
          <div>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-2xl font-bold text-gray-900">
                Available Rooms
                <span className="ml-2 text-gray-500 text-lg">
                  ({filteredRooms.length})
                </span>
              </h2>
            </div>

            {filteredRooms.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredRooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-16 bg-white text-center">
                <p className="text-gray-500 text-lg mb-2">
                  No rooms match your filters.
                </p>
                <p className="text-gray-400 text-sm">
                  Try adjusting your search criteria to explore more options.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
