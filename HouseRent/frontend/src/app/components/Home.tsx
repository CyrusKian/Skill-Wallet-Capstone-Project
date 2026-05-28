import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Home as HomeIcon,
  TrendingUp,
  Shield,
  Handshake
} from 'lucide-react';

import { mockProperties } from '../data/mockData';
import { PageShell } from './PageShell';

export function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const cities = ['Mumbai', 'Bangalore', 'Hyderabad', 'Delhi', 'Pune', 'Chennai'];
  const featuredProperties = mockProperties.filter(p => p.available).slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (searchQuery) params.append('search', searchQuery);
    if (selectedCity) params.append('city', selectedCity);

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <PageShell background="linear-gradient(180deg, var(--bg-main), var(--bg-card))">

      {/* ================= HERO (FULL CENTER FIX) ================= */}
      <section className="hero">

        <div className="hero-inner">

          <h1 className="hero-title">
            Find Your Perfect Home
          </h1>

          <p className="hero-subtitle">
            Discover verified rental properties across cities. Simple, fast, and modern.
          </p>

          {/* SEARCH */}
          <form onSubmit={handleSearch} className="search-card">

            <div className="search-input">
              <Search size={18} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search property, location..."
              />
            </div>

            <div className="search-select">
              <MapPin size={18} />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city}>{city}</option>
                ))}
              </select>
            </div>

            <button className="btn btn-primary">
              Search
            </button>

          </form>

        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="section">
        <div className="grid-4">

          {[
            ["10,000+", "Active Listings"],
            ["5,000+", "Happy Tenants"],
            ["50+", "Cities Covered"],
            ["98%", "Satisfaction Rate"]
          ].map(([num, label]) => (
            <div key={label} className="card center-col">
              <div className="stat-number">{num}</div>
              <div className="text-muted">{label}</div>
            </div>
          ))}

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="section">

        <h2 className="section-title">Why Choose HouseHunt</h2>

        <div className="grid-3">

          <Feature icon={<HomeIcon />} title="Wide Selection"
            desc="Thousands of verified properties across cities." />

          <Feature icon={<Shield />} title="Verified Listings"
            desc="Every property is checked for authenticity." />

          <Feature icon={<Handshake />} title="Direct Connect"
            desc="Talk directly with owners, no hidden fees." />

        </div>

      </section>

      {/* ================= FEATURED ================= */}
      <section className="section">

        <div className="section-head">
          <h2>Featured Properties</h2>

          <button className="btn btn-outline" onClick={() => navigate('/properties')}>
            <TrendingUp size={16} />
            View All
          </button>
        </div>

        <div className="grid-3">

          {featuredProperties.map(property => (
            <div
              key={property.id}
              className="card hover"
              onClick={() => navigate(`/properties/${property.id}`)}
            >

              <img src={property.images[0]} className="card-img" />

              <h3>{property.title}</h3>

              <p className="text-muted flex gap-1">
                <MapPin size={14} />
                {property.location}
              </p>

              <p className="text-muted small">
                {property.bedrooms} BHK • {property.area} sq ft • {property.furnishing}
              </p>

              <div className="price">
                ₹{property.price.toLocaleString()}/mo
              </div>

            </div>
          ))}

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="cta">

        <div className="cta-inner">

          <h2>Start Your Journey Today</h2>

          <p>
            Join thousands finding homes faster and easier.
          </p>

          <button className="btn btn-primary" onClick={() => navigate('/properties')}>
            Start Searching
          </button>

        </div>

      </section>

      {/* ================= STYLE ================= */}
      <style>{`

        .hero {
          padding: 90px 16px 60px;
          display: flex;
          justify-content: center;
        }

        .hero-inner {
          max-width: 900px;
          width: 100%;
          text-align: center;
        }

        .hero-title {
          font-size: 54px;
          font-weight: 800;
        }

        .hero-subtitle {
          margin-top: 12px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          color: var(--muted);
        }

        .search-card {
          margin-top: 28px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          padding: 16px;
          border-radius: 14px;
          background: var(--surface);
        }

        .search-input,
        .search-select {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 10px;
          background: var(--bg-card);
          flex: 1;
          min-width: 220px;
        }

        input, select {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: white;
        }

        .section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 70px 16px;
        }

        .section-title {
          text-align: center;
          margin-bottom: 30px;
        }

        .section-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .grid-4 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 16px;
        }

        .center-col {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-number {
          font-size: 28px;
          font-weight: 800;
          color: var(--primary);
        }

        .card-img {
          width: 100%;
          height: 160px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 10px;
        }

        .price {
          margin-top: 10px;
          font-weight: 700;
          color: var(--primary);
        }

        .cta {
          background: var(--surface);
          padding: 80px 16px;
          text-align: center;
        }

        .cta-inner {
          max-width: 600px;
          margin: 0 auto;
        }

      `}</style>

    </PageShell>
  );
}

/* ================= COMPONENT ================= */

function Feature({ icon, title, desc }: any) {
  return (
    <div className="card">
      <div style={{ marginBottom: 10, color: "var(--primary)" }}>
        {icon}
      </div>
      <h3>{title}</h3>
      <p className="text-muted">{desc}</p>
    </div>
  );
}