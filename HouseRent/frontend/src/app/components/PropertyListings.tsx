import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapPin, Bed, Bath, Home, Filter } from 'lucide-react';
import { mockProperties, Property } from '../data/mockData';

import { PageShell } from './PageShell';

export function PropertyListings() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    city: searchParams.get('city') || '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    furnishing: '',
    sortBy: 'newest'
  });

  useEffect(() => {
    let results = [...mockProperties];

    if (filters.search) {
      const s = filters.search.toLowerCase();
      results = results.filter(p =>
        p.title.toLowerCase().includes(s) ||
        p.location.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s)
      );
    }

    if (filters.city) results = results.filter(p => p.city === filters.city);
    if (filters.propertyType) results = results.filter(p => p.propertyType === filters.propertyType);
    if (filters.minPrice) results = results.filter(p => p.price >= Number(filters.minPrice));
    if (filters.maxPrice) results = results.filter(p => p.price <= Number(filters.maxPrice));
    if (filters.bedrooms) results = results.filter(p => p.bedrooms === Number(filters.bedrooms));
    if (filters.furnishing) results = results.filter(p => p.furnishing === filters.furnishing);

    results = results.filter(p => p.available);

    if (filters.sortBy === 'price-low') {
      results.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high') {
      results.sort((a, b) => b.price - a.price);
    } else {
      results.sort(
        (a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      );
    }

    setFilteredProperties(results);
  }, [filters]);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setShowFilters(true);
    }
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      city: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      furnishing: '',
      sortBy: 'newest'
    });
  };

  return (
    <PageShell background={'var(--bg-main)'} paddingTop={30} paddingBottom={60}>
      <div className="container" style={{ paddingLeft: 0, paddingRight: 0 }}>

        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-[var(--text-main)]">Browse Properties</h1>

          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8">

          {/* FILTERS */}
          <div className={showFilters ? 'block' : 'hidden'}>
            <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border)] shadow-md sticky top-20 space-y-6">

              <div className="flex items-center gap-4 mb-5">
                <h2 className="text-2xl font-bold text-[var(--text-main)]">
                  Filters
                </h2>

                <button
                  onClick={clearFilters}
                  className="bg-[#3A4660] text-white rounded-xl px-4 py-2"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-5 text-[var(--text-main)] text-sm">

                {/* CITY */}
                <div className="flex items-center gap-4 w-full">
                  <label className="w-20 text-[var(--text-main)] shrink-0">
                    City:
                  </label>

                  <select
                    value={filters.city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                    className="
                      flex-1
                      px-4 py-3
                      bg-[var(--surface)]
                      border border-[var(--border)]
                      rounded-xl
                      text-[var(--text-main)]
                    "
                  >
                    <option value="">All</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>

                {/* PROPERTY TYPE */}
                <div className="flex items-center gap-4 w-full">
                  <label className="w-20 text-[var(--text-main)] shrink-0">
                    Type:
                  </label>

                  <select
                    value={filters.propertyType}
                    onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                    className="
                      flex-1
                      px-4 py-3
                      bg-[var(--surface)]
                      border border-[var(--border)]
                      rounded-xl
                      text-[var(--text-main)]
                    "
                  >
                    <option value="">All</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                    <option value="studio">Studio</option>
                  </select>
                </div>

                {/* PRICE RANGE */}
                <div className="flex items-center gap-4 w-full">
                  <label className="w-20 text-[var(--text-main)] shrink-0">
                    Price:
                  </label>

                  <div className="flex flex-col gap-4 w-full">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="
                        flex-1
                        px-4 py-3
                        bg-[var(--surface)]
                        border border-[var(--border)]
                        rounded-xl
                        text-[var(--text-main)]
                      "
                    />

                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="
                        flex-1
                        px-4 py-3
                        bg-[var(--surface)]
                        border border-[var(--border)]
                        rounded-xl
                        text-[var(--text-main)]
                      "
                    />
                  </div>
                </div>

                {/* BEDROOMS */}
                <div className="flex items-center gap-4 w/full">
                  <label className="w-20 text-[var(--text-main)] shrink-0">
                    Beds:
                  </label>

                  <select
                    value={filters.bedrooms}
                    onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                    className="
                      flex-1
                      px-4 py-3
                      bg-[var(--surface)]
                      border border-[var(--border)]
                      rounded-xl
                      text-[var(--text-main)]
                    "
                  >
                    <option value="">Any</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                {/* FURNISHING */}
                <div className="flex items-center gap-4 w-full">
                  <label className="w-20 text-[var(--text-main)] shrink-0">
                    Furn:
                  </label>

                  <select
                    value={filters.furnishing}
                    onChange={(e) => handleFilterChange('furnishing', e.target.value)}
                    className="
                      flex-1
                      px-4 py-3
                      bg-[var(--surface)]
                      border border-[var(--border)]
                      rounded-xl
                      text-[var(--text-main)]
                    "
                  >
                    <option value="">Any</option>
                    <option value="furnished">Furnished</option>
                    <option value="semi-furnished">Semi</option>
                    <option value="unfurnished">Unfurnished</option>
                  </select>
                </div>

              </div>
            </div>
          </div>

          {/* PROPERTY GRID */}
          <div>

            {/* TOP BAR */}
            <div className="mb-4 flex items-center justify-between bg-[var(--card)] p-4 rounded-lg shadow-sm">
              <p className="text-[var(--text-muted)]">
                {filteredProperties.length} properties found
              </p>

              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--surface)] text-[var(--text-main)]"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Low → High</option>
                <option value="price-high">High → Low</option>
              </select>
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProperties.map(property => (
                <div
                  key={property.id}
                  onClick={() => navigate(`/properties/${property.id}`)}
                  className="bg-[var(--card)] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
                >
                  <div className="relative h-56">
                    <img
                      src={property.images[0]}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute top-4 right-4 bg-[#3A4660] text-white px-4 py-2 rounded-full">
                      ₹{property.price}/mo
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-[var(--text-main)]">{property.title}</h3>

                    <p className="text-[var(--text-soft)] flex items-center gap-1 mb-3">
                      <MapPin className="w-4 h-4" />
                      {property.location}
                    </p>

                    <div className="flex gap-4 text-sm text-[var(--text-muted)]">
                      <span>{property.bedrooms} BHK</span>
                      <span>{property.bathrooms} Bath</span>
                      <span>{property.area} sqft</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </PageShell>
  );
}