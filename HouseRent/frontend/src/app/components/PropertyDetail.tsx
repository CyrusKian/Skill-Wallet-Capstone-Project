import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Bed,
  Bath,
  Home,
  Phone,
  Calendar,
  ArrowLeft,
  Check
} from 'lucide-react';

import { mockProperties, getCurrentUser, mockBookings } from '../data/mockData';
import { toast } from 'sonner';

export function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const property = mockProperties.find(p => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingForm, setBookingForm] = useState({
    moveInDate: '',
    message: ''
  });

  if (!property) {
    return (
      <div className="full-screen center">
        <div className="card center" style={{ flexDirection: "column", padding: 30 }}>
          <h2>Property not found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/properties')}>
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error('Please login to book a property');
      navigate('/login');
      return;
    }

    if (currentUser.role !== 'tenant') {
      toast.error('Only tenants can book properties');
      return;
    }

    if (!bookingForm.moveInDate) {
      toast.error('Please select a move-in date');
      return;
    }

    const newBooking = {
      id: `booking${mockBookings.length + 1}`,
      propertyId: property.id,
      tenantId: currentUser.id,
      ownerId: property.ownerId,
      status: 'pending' as const,
      moveInDate: bookingForm.moveInDate,
      message: bookingForm.message,
      createdAt: new Date().toISOString()
    };

    mockBookings.push(newBooking);
    toast.success('Booking request sent successfully!');

    setBookingForm({ moveInDate: '', message: '' });
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", padding: "30px 0" }}>

      <div className="container">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate('/properties')}
          className="btn btn-outline"
          style={{ marginBottom: 20 }}
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 24
          }}
        >

          {/* ================= LEFT SIDE ================= */}
          <div>

            {/* IMAGE CARD */}
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ height: 420, background: "var(--surface-2)" }}>
                <img
                  src={property.images[selectedImage]}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 10,
                  padding: 12
                }}
              >
                {property.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    style={{
                      height: 70,
                      borderRadius: 10,
                      overflow: "hidden",
                      cursor: "pointer",
                      border: selectedImage === idx
                        ? "2px solid var(--primary)"
                        : "1px solid var(--border)"
                    }}
                  >
                    <img src={img} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            </div>

            {/* PROPERTY INFO */}
            <div className="card" style={{ marginTop: 20 }}>

              <div className="between">
                <div>
                  <h1>{property.title}</h1>

                  <p className="text-muted flex" style={{ gap: 6 }}>
                    <MapPin size={14} />
                    {property.location}
                  </p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: "var(--primary)" }}>
                    ₹{property.price.toLocaleString()}
                  </div>
                  <div className="text-muted">per month</div>
                </div>
              </div>

              {/* STATS */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  marginTop: 20,
                  paddingTop: 20,
                  borderTop: "1px solid var(--border)",
                  textAlign: "center"
                }}
              >
                <div>
                  <Bed size={18} />
                  <div>{property.bedrooms} BHK</div>
                </div>

                <div>
                  <Bath size={18} />
                  <div>{property.bathrooms} Bath</div>
                </div>

                <div>
                  <Home size={18} />
                  <div>{property.area} sq ft</div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div style={{ marginTop: 20 }}>
                <h3>Description</h3>
                <p className="text-muted">{property.description}</p>
              </div>

              {/* AMENITIES */}
              <div style={{ marginTop: 20 }}>
                <h3>Amenities</h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: 10,
                    marginTop: 10
                  }}
                >
                  {property.amenities.map((a, i) => (
                    <div key={i} className="flex center" style={{ gap: 6 }}>
                      <Check size={14} color="var(--primary)" />
                      <span className="text-muted">{a}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <div style={{ position: "sticky", top: 90 }}>

            {/* OWNER CARD */}
            <div className="card">

              <h3>Property Owner</h3>

              <div className="flex" style={{ gap: 12, marginTop: 12 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700
                  }}
                >
                  {property.ownerName.charAt(0)}
                </div>

                <div>
                  <div style={{ fontWeight: 600 }}>{property.ownerName}</div>
                  <div className="text-muted">Owner</div>
                </div>
              </div>

              <div className="flex" style={{ gap: 8, marginTop: 10 }}>
                <Phone size={14} />
                <span className="text-muted">{property.ownerPhone}</span>
              </div>

            </div>

            {/* BOOKING */}
            <div className="card" style={{ marginTop: 20 }}>

              <h3>Schedule Visit</h3>

              {property.available ? (
                <form onSubmit={handleBookingSubmit} style={{ marginTop: 10 }}>

                  <input
                    type="date"
                    value={bookingForm.moveInDate}
                    onChange={(e) =>
                      setBookingForm(prev => ({ ...prev, moveInDate: e.target.value }))
                    }
                  />

                  <textarea
                    placeholder="Message (optional)"
                    value={bookingForm.message}
                    onChange={(e) =>
                      setBookingForm(prev => ({ ...prev, message: e.target.value }))
                    }
                    style={{ marginTop: 10 }}
                  />

                  <button className="btn btn-primary" style={{ width: "100%", marginTop: 10 }}>
                    <Calendar size={16} />
                    Request Booking
                  </button>

                </form>
              ) : (
                <p className="text-muted">This property is not available.</p>
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}