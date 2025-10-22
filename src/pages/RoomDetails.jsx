import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { addReservation } from "@/store/slices/reservationsSlice";
import Navbar from "@/components/Navbar";
import { Users, DollarSign, Check } from "lucide-react";
import { toast } from "sonner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const room = useAppSelector((state) =>
    state.rooms.rooms.find((r) => r.id === id)
  );
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  if (!room) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="mb-4 text-3xl font-bold">Room Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    if (!isAuthenticated) {
      toast.error("Please login to book a room");
      navigate("/login");
      return;
    }

    if (!checkInDate || !checkOutDate) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    if (
      !(checkInDate instanceof Date) ||
      isNaN(checkInDate) ||
      !(checkOutDate instanceof Date) ||
      isNaN(checkOutDate)
    ) {
      toast.error("Invalid date selection");
      return;
    }

    if (checkInDate >= checkOutDate) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    const nights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = room.price * nights;

    dispatch(
      addReservation({
        roomId: room.id,
        roomName: room.name,
        roomType: room.type,
        userId: user.id,
        checkIn: checkInDate.toISOString(),
        checkOut: checkOutDate.toISOString(),
        price: totalPrice,
        createdAt: new Date().toISOString(),
      })
    );

    toast.success("Room booked successfully!");
    navigate("/dashboard");
  };

  const nights =
    checkInDate && checkOutDate
      ? Math.ceil(
          (new Date(checkOutDate) - new Date(checkInDate)) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Room Details */}
          <div className="space-y-6">
            <div className="relative h-96 overflow-hidden rounded-lg bg-muted">
              <img
                src={room.image}
                alt={room.name}
                className="h-full w-full object-cover"
              />
              <span className="absolute right-4 top-4 rounded-md bg-accent px-3 py-1 text-sm text-accent-foreground">
                {room.type}
              </span>
            </div>

            <h1 className="mb-2 text-4xl font-bold">{room.name}</h1>

            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-5 w-5" />
                <span>
                  {room.capacity} guest{room.capacity > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xl font-semibold text-primary">
                <DollarSign className="h-5 w-5" />
                <span>${room.price}/night</span>
              </div>
            </div>

            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-2xl font-semibold">Description</h2>
              <p className="text-muted-foreground">{room.description}</p>
            </div>

            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-2xl font-semibold">Amenities</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {room.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:sticky lg:top-24 lg:h-fit rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold">Book This Room</h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Check-in Date</label>{" "}
                <br />
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => setCheckInDate(date)}
                  dateFormat="EEE, MMM d, yyyy"
                  placeholderText="Select check-in date"
                  minDate={new Date()}
                  className="w-full rounded-md border px-3 py-2 text-sm bg-background text-foreground"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Check-out Date</label>{" "}
                <br />
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => setCheckOutDate(date)}
                  dateFormat="EEE, MMM d, yyyy"
                  minDate={checkInDate || new Date()}
                  placeholderText="Select check-out date"
                  className="w-full rounded-md border px-3 py-2 text-sm bg-background text-foreground"
                />
              </div>
            </div>

            {nights > 0 && (
              <div className="mt-6 rounded-lg border bg-muted/50 p-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span>
                    ${room.price} × {nights} night{nights > 1 ? "s" : ""}
                  </span>
                  <span>${room.price * nights}</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>Total</span>
                  <span>${room.price * nights}</span>
                </div>
              </div>
            )}

            {isAuthenticated ? (
              <button
                onClick={handleBooking}
                disabled={!checkInDate || !checkOutDate}
                className="mt-6 w-full rounded-md bg-accent px-4 py-2 text-white hover:bg-accent/90 disabled:opacity-50"
              >
                Book Now
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="mt-6 w-full rounded-md border px-4 py-2 hover:bg-muted"
              >
                Login to Book
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
