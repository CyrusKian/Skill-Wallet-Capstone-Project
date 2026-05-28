import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Upload } from 'lucide-react';
import { getCurrentUser } from '../data/mockData';
import { toast } from 'sonner';

export function AddProperty() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    city: '',
    bedrooms: '1',
    bathrooms: '1',
    area: '',
    propertyType: 'apartment' as 'apartment' | 'house' | 'villa' | 'studio',
    furnishing: 'furnished' as 'furnished' | 'semi-furnished' | 'unfurnished',
    amenities: [] as string[],
    ownerPhone: currentUser?.phone || ''
  });

  const availableAmenities = [
    'Parking',
    'Gym',
    'Swimming Pool',
    'Security',
    'Power Backup',
    'Elevator',
    'Water Supply',
    'Garden',
    'Club House',
    'WiFi'
  ];

  useEffect(() => {
    if (!currentUser) {
      toast.error('Please login to add a property');
      navigate('/login');
      return;
    }

    if (currentUser.role !== 'owner') {
      toast.error('Only property owners can add listings');
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  if (!currentUser || currentUser.role !== 'owner') {
    return null;
  }

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.price || !formData.location || !formData.city || !formData.area) {
      toast.error('Please fill in all required fields');
      return;
    }

    const sampleImages = [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    ];

    try {

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/properties",
        {
          title: formData.title,
          description: formData.description,
          price: parseInt(formData.price),
          location: formData.location,

          image: sampleImages[0],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      toast.success('Property listed successfully!');

      navigate('/dashboard');

    } catch (error: any) {

      console.error(error);

      toast.error(
        error.response?.data?.message || 'Failed to create property'
      );
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-main)] py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Add New Property</h1>
          <p className="text-muted">List your property for rent</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg shadow-md p-8 bg-[var(--surface)] border border-[var(--border)]">
          <div className="space-y-6">

            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Luxury 3BHK Apartment in Downtown"
                    className="w-full px-4 py-3 bg-[var(--surface)] text-[var(--text-main)] border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    placeholder="Describe your property, its features, and nearby amenities..."
                    className="w-full px-4 py-3 bg-[var(--surface)] text-[var(--text-main)] border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                    Monthly Rent (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="25000"
                    className="w-full px-4 py-3 bg-[var(--surface)] text-[var(--text-main)] border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                    Area (sq ft) *
                  </label>
                  <input
                    type="number"
                    value={formData.area}
                    onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                    placeholder="1200"
                    className="w-full px-4 py-3 bg-[var(--surface)] text-[var(--text-main)] border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                    Full Address *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Sector 5, Koramangala"
                    className="w-full px-4 py-3 bg-[var(--surface)] text-[var(--text-main)] border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                    City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-4 py-3 bg-[var(--surface)] text-[var(--text-main)] border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                    required
                  >
                    <option value="">Select City</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Pune">Pune</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.ownerPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, ownerPhone: e.target.value }))}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 bg-[var(--surface)] text-[var(--text-main)] border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                    Property Type
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData(prev => ({ ...prev, propertyType: e.target.value as any }))}
                    className="w-full px-4 py-3 bg-[var(--surface)] text-[var(--text-main)] border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                  >
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                    <option value="studio">Studio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                    Furnishing
                  </label>
                  <select
                    value={formData.furnishing}
                    onChange={(e) => setFormData(prev => ({ ...prev, furnishing: e.target.value as any }))}
                    className="w-full px-4 py-3 bg-[var(--surface)] text-[var(--text-main)] border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                  >
                    <option value="furnished">Furnished</option>
                    <option value="semi-furnished">Semi-Furnished</option>
                    <option value="unfurnished">Unfurnished</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                    Bedrooms
                  </label>
                  <select
                    value={formData.bedrooms}
                    onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: e.target.value }))}
                    className="w-full px-4 py-3 bg-[var(--surface)] text-[var(--text-main)] border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                  >
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5+ BHK</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-main)] mb-2">
                    Bathrooms
                  </label>
                  <select
                    value={formData.bathrooms}
                    onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: e.target.value }))}
                    className="w-full px-4 py-3 bg-[var(--surface)] text-[var(--text-main)] border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableAmenities.map(amenity => (
                  <label
                    key={amenity}
                    className={`flex items-center gap-2 px-4 py-3 border-2 rounded-lg cursor-pointer transition ${
                      formData.amenities.includes(amenity)
                        ? 'border-[var(--primary)] bg-[var(--primary)/10]'
                        : 'border-[var(--border)] hover:border-[var(--primary)]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="w-4 h-4 text-[var(--primary)] rounded focus:ring-[var(--primary)]"
                    />
                    <span className="text-sm font-medium">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Images Upload (Mock) */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Images</h2>
              <div className="border-2 border-dashed border-[var(--border)] rounded-lg p-8 text-center bg-[var(--bg-card)]">
                <Upload className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3" />
                <p className="text-[var(--text-muted)] mb-2">Sample images will be used for this demo</p>
                <p className="text-sm text-[var(--text-muted)]">In production, you would upload property photos here</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 px-6 py-3 border border-transparent text-[var(--text-main)] rounded-lg hover:border-[var(--primary)] hover:bg-white transition-all duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition font-semibold flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-5 h-5 text-white" />
                List Property
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

