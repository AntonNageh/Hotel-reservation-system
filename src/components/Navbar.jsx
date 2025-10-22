import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hotel, User, LogOut, Menu, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { toast } from 'sonner';

const NavButton = ({ to, children, icon: Icon, onClick, primary = false, ariaLabel }) => {
  const base =
    'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1';
  const ghost = 'text-foreground hover:bg-slate-100 dark:hover:bg-slate-800';
  const primaryCls =
    'text-white bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80';
  const cls = `${base} ${primary ? primaryCls : ghost}`;

  if (to) {
    return (
      <Link to={to} className={cls} aria-label={ariaLabel}>
        {Icon ? <Icon className="h-4 w-4" /> : null}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={cls} aria-label={ariaLabel} type="button">
      {Icon ? <Icon className="h-4 w-4" /> : null}
      <span>{children}</span>
    </button>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
    setOpen(false);
  };

  // Close on outside click or Escape
  useEffect(() => {
    const onDocClick = (e) => {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
            aria-label="LuxStay home"
          >
            <Hotel className="h-6 w-6 text-primary" />
            <span className="text-lg md:text-xl font-semibold text-foreground">LuxStay</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-3">
            <NavButton to="/" ariaLabel="Home">
              Home
            </NavButton>

            {isAuthenticated ? (
              <>
                <NavButton to="/dashboard" icon={User} ariaLabel="Dashboard">
                  Dashboard
                </NavButton>
                <NavButton onClick={handleLogout} icon={LogOut} ariaLabel="Logout">
                  Logout
                </NavButton>
              </>
            ) : (
              <>
                <NavButton to="/login" ariaLabel="Login">
                  Login
                </NavButton>
                <NavButton to="/signup" primary ariaLabel="Sign up">
                  Sign Up
                </NavButton>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-controls="mobile-menu"
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-1"
              type="button"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}

            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {open && (
          <div
            id="mobile-menu"
            ref={menuRef}
            className="mt-3 md:hidden rounded-md bg-card p-3 shadow-lg ring-1 ring-black/5 space-y-2"
          >
            <NavButton to="/" ariaLabel="Home" onClick={() => setOpen(false)}>
              Home
            </NavButton>

            {isAuthenticated ? (
              <>
                <NavButton to="/dashboard" icon={User} ariaLabel="Dashboard" onClick={() => setOpen(false)}>
                  Dashboard
                </NavButton>
                <NavButton onClick={handleLogout} icon={LogOut} ariaLabel="Logout">
                  Logout
                </NavButton>
              </>
            ) : (
              <>
                <NavButton to="/login" ariaLabel="Login" onClick={() => setOpen(false)}>
                  Login
                </NavButton>
                <NavButton to="/signup" primary ariaLabel="Sign up" onClick={() => setOpen(false)}>
                  Sign Up
                </NavButton>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;