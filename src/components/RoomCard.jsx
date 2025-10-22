import { Link } from 'react-router-dom';
import { Users, DollarSign, Badge } from 'lucide-react';

const RoomCard = ({ room }) => {
  return (
    <div className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={room.image}
          alt={room.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className="absolute right-3 top-3 bg-accent text-accent-foreground">
          {room.type}
        </Badge>
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-xl font-semibold text-foreground">{room.name}</h3>
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{room.description}</p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{room.capacity} guest{room.capacity > 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1 font-semibold text-primary">
            <DollarSign className="h-4 w-4" />
            <span>{room.price}/night</span>
          </div>
        </div>
      </div>

      <footer className="p-4 pt-0">
        <Link to={`/room/${room.id}`} className="w-full">
          <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors duration-300">
            View Details
          </button>
        </Link>
      </footer>
    </div>
  );
};

export default RoomCard;
