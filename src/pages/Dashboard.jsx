import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { cancelReservation } from '@/store/slices/reservationsSlice';
import Navbar from '@/components/Navbar';
import { Calendar, MapPin, X, BedDouble } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const reservations = useAppSelector((state) =>
    state.reservations.reservations.filter((res) => res.userId === user?.id)
  );

  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  const handleCancelReservation = (id) => {
    dispatch(cancelReservation(id));
    setSelectedReservation(null);
    toast.success('Reservation cancelled successfully');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="mb-2 text-4xl font-bold">Welcome, {user?.name}!</h1>
          <p className="text-gray-500">Manage your reservations and bookings</p>
        </div>

        <h2 className="text-2xl font-semibold mb-4">My Reservations</h2>

        {reservations.length > 0 ? (
          <div className="space-y-6">
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <BedDouble className="text-primary w-5 h-5" />
                      <h3 className="text-xl font-semibold">
                        {reservation.roomName}
                      </h3>
                    </div>
                    <span className="inline-block bg-indigo-100 text-primary text-xs font-medium px-2.5 py-1 rounded-full">
                      {reservation.roomType}
                    </span>

                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary/90" />
                        <span>
                          {format(new Date(reservation.checkIn), 'MMM dd, yyyy')} –{' '}
                          {format(new Date(reservation.checkOut), 'MMM dd, yyyy')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary/90" />
                        <span className="font-semibold text-primary">
                          ${reservation.price} total
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400">
                      Booked on {format(new Date(reservation.createdAt), 'MMM dd, yyyy')}
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setSelectedReservation(reservation.id)}
                      className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium px-4 py-2 rounded-lg text-sm transition"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                  </div>
                </div>

                {/* Cancel confirmation modal */}
                {selectedReservation === reservation.id && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
                      <h3 className="text-lg font-semibold mb-2">
                        Cancel this reservation?
                      </h3>
                      <p className="text-gray-600 text-sm mb-6">
                        This action cannot be undone.
                      </p>
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => setSelectedReservation(null)}
                          className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
                        >
                          Keep Reservation
                        </button>
                        <button
                          onClick={() =>
                            handleCancelReservation(reservation.id)
                          }
                          className="px-4 py-2 rounded-lg bg-destructive text-white hover:bg-destructive/90 transition"
                        >
                          Cancel Reservation
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-gray-500 mb-4">You don’t have any reservations yet.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              Browse Rooms
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
