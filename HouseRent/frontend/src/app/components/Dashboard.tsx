import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Building2,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Eye,
  PlusCircle,
  LayoutDashboard,
  Home,
  User
} from 'lucide-react';

import {
  getCurrentUser,
  mockProperties,
  mockBookings
} from '../data/mockData';

import { toast } from 'sonner';

/* ================= MAIN DASHBOARD SHELL ================= */

export function Dashboard() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      toast.error('Please login to access dashboard');
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--text-main)]">

      {/* SIDEBAR */}
      <Sidebar user={currentUser} />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 md:p-10">
        {currentUser.role === 'owner'
          ? <OwnerDashboard />
          : <TenantDashboard />
        }
      </div>

    </div>
  );
}

/* ================= SIDEBAR ================= */

function Sidebar({ user }: any) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <aside className="w-64 min-h-screen border-r border-[var(--border)] bg-[var(--surface)] p-5 hidden md:flex flex-col">

      {/* BRAND */}
      <div className="flex items-center gap-2 mb-8">
        <Building2 className="text-[var(--primary)]" />
        <h1 className="font-bold text-lg">HouseHunt</h1>
      </div>

      {/* NAV */}
      <nav className="flex flex-col gap-2">

        <SideLink to="/dashboard" active={isActive('/dashboard')}>
          <LayoutDashboard size={18} /> Dashboard
        </SideLink>

        <SideLink to="/properties" active={isActive('/properties')}>
          <Home size={18} /> Properties
        </SideLink>

        {user.role === 'owner' && (
          <SideLink to="/add-property" active={isActive('/add-property')}>
            <PlusCircle size={18} /> Add Property
          </SideLink>
        )}

        <SideLink to="/" active={isActive('/')}>
          <MapPin size={18} /> Explore
        </SideLink>

      </nav>

      {/* USER */}
      <div className="mt-auto pt-6 border-t border-[var(--border)]">

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center font-bold text-[var(--primary-foreground)]">
            {user.name.charAt(0)}
          </div>

          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-[var(--text-muted)] capitalize">{user.role}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--surface)] transition"
        >
          Logout
        </button>
      </div>

    </aside>
  );
}

/* ================= OWNER DASHBOARD ================= */

function OwnerDashboard() {
  const currentUser = getCurrentUser()!;
  const navigate = useNavigate();

  const myProperties = mockProperties.filter(p => p.ownerId === currentUser.id);
  const myBookings = mockBookings.filter(b => b.ownerId === currentUser.id);

  const stats = {
    total: myProperties.length,
    available: myProperties.filter(p => p.available).length,
    rented: myProperties.filter(p => !p.available).length,
    pending: myBookings.filter(b => b.status === 'pending').length
  };

  const handleBookingAction = (id: string, action: 'approve' | 'reject') => {
    const booking = mockBookings.find(b => b.id === id);
    if (booking) {
      booking.status = action === 'approve' ? 'approved' : 'rejected';
      toast.success(`Booking ${action}d`);
    }
  };

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">Owner Dashboard</h1>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">

        <Stat title="Properties" value={stats.total} icon={<Building2 />} />
        <Stat title="Available" value={stats.available} icon={<CheckCircle />} />
        <Stat title="Rented" value={stats.rented} icon={<Home />} />
        <Stat title="Pending" value={stats.pending} icon={<Clock />} />

      </div>

      {/* BOOKINGS */}
      <Section title="Booking Requests">

        {myBookings.length === 0 ? (
          <div className="card text-center py-10">

            <Clock
              size={40}
              className="mx-auto mb-3 text-[var(--text-muted)]"
            />

            <h3 className="font-semibold mb-1">
              No booking requests yet
            </h3>

            <p className="text-sm text-[var(--text-muted)]">
              Booking requests from tenants will appear here.
            </p>

          </div>
        ) : (
          myBookings.map(b => {
            const property = mockProperties.find(p => p.id === b.propertyId);

            return (
              <div key={b.id} className="card mb-3">

                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{property?.title}</h3>

                    <p className="text-sm text-[var(--text-muted)] flex gap-1 items-center">
                      <MapPin size={14} /> {property?.location}
                    </p>
                  </div>

                  <span className="text-xs px-2 py-1 rounded bg-[var(--border)]">
                    {b.status}
                  </span>
                </div>

                {b.status === 'pending' && (
                  <div className="flex gap-2 mt-4">

                    <button
                      className="btn btn-primary flex-1"
                      onClick={() => handleBookingAction(b.id, 'approve')}
                    >
                      <CheckCircle size={14} /> Approve
                    </button>

                    <button
                      className="btn btn-outline flex-1"
                      onClick={() => handleBookingAction(b.id, 'reject')}
                    >
                      <XCircle size={14} /> Reject
                    </button>

                  </div>
                )}

              </div>
            );
          })
        )}

      </Section>

      {/* PROPERTIES */}
      <Section
        title="My Properties"
        action={
          <button className="btn btn-primary" onClick={() => navigate('/add-property')}>
            <PlusCircle size={16} /> Add
          </button>
        }
      >

        <div className="grid md:grid-cols-2 gap-4">

          {myProperties.map(p => (
            <div key={p.id} className="card flex gap-3">

              <img src={p.images[0]} className="w-24 h-24 rounded-lg object-cover" />

              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-[var(--text-muted)] flex gap-1 items-center">
                  <MapPin size={14} /> {p.city}
                </p>

                <p className="text-[var(--primary)] font-bold mt-1">
                  ₹{p.price.toLocaleString()}
                </p>

                <button
                  className="text-sm text-[var(--primary)] mt-1 flex items-center gap-1"
                  onClick={() => navigate(`/properties/${p.id}`)}
                >
                  <Eye size={14} /> View
                </button>
              </div>

            </div>
          ))}

        </div>

      </Section>

    </div>
  );
}

/* ================= TENANT DASHBOARD ================= */

function TenantDashboard() {
  const currentUser = getCurrentUser()!;
  const myBookings = mockBookings.filter(b => b.tenantId === currentUser.id);

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">Tenant Dashboard</h1>

      <Section title="My Bookings">

        {myBookings.length === 0 ? (

          <div className="card text-center py-10">

            <Calendar
              size={40}
              className="mx-auto mb-3 text-[var(--text-muted)]"
            />

            <h3 className="font-semibold mb-1">
              No bookings yet
            </h3>

            <p className="text-sm text-[var(--text-muted)] mb-4">
              You haven’t booked any properties yet.
            </p>

            <button
              className="btn btn-primary"
              onClick={() => window.location.href = '/properties'}
            >
              Browse Properties
            </button>

          </div>

        ) : (

          myBookings.map(b => {
            const property = mockProperties.find(p => p.id === b.propertyId);

            return (
              <div key={b.id} className="card mb-3">

                <h3 className="font-semibold">{property?.title}</h3>

                <p className="text-sm text-[var(--text-muted)] flex gap-1 items-center">
                  <MapPin size={14} /> {property?.location}
                </p>

                <p className="text-xs text-[var(--text-muted)] mt-2">
                  Move-in: {new Date(b.moveInDate).toLocaleDateString()}
                </p>

                <span className="inline-block mt-2 text-xs px-2 py-1 bg-[var(--border)] rounded">
                  {b.status}
                </span>

              </div>
            );
          })

        )}

      </Section>

    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function SideLink({ to, children, active }: any) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
        active ? 'bg-[var(--primary)/20] text-[var(--primary)]' : 'hover:bg-[var(--surface)] text-[var(--text-muted)]'
      }`}
    >
      {children}
    </Link>
  );
}

function Stat({ title, value, icon }: any) {
  return (
    <div className="card flex justify-between items-center">
      <div>
        <p className="text-[var(--text-muted)] text-sm">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
      <div className="text-[var(--primary)]">{icon}</div>
    </div>
  );
}

function Section({ title, action, children }: any) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-lg">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}