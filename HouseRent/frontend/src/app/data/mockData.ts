export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: 'apartment' | 'house' | 'villa' | 'studio';
  furnishing: 'furnished' | 'semi-furnished' | 'unfurnished';
  amenities: string[];
  images: string[];
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  available: boolean;
  postedDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'owner' | 'tenant';
  avatar?: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  tenantId: string;
  ownerId: string;
  status: 'pending' | 'approved' | 'rejected';
  moveInDate: string;
  message: string;
  createdAt: string;
}

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury 3BHK Apartment in Downtown',
    description: 'Beautiful spacious apartment with modern amenities, perfect for families. Features include marble flooring, modular kitchen, and balcony with city views.',
    price: 35000,
    location: 'Downtown, Central Business District',
    city: 'Mumbai',
    bedrooms: 3,
    bathrooms: 2,
    area: 1850,
    propertyType: 'apartment',
    furnishing: 'furnished',
    amenities: ['Parking', 'Gym', 'Swimming Pool', 'Security', 'Power Backup', 'Elevator'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800'
    ],
    ownerId: 'owner1',
    ownerName: 'TAO 1',
    ownerPhone: '+91 98765 43210',
    available: true,
    postedDate: '2026-04-15'
  },
  {
    id: '2',
    title: 'Cozy 2BHK Near IT Park',
    description: 'Well-maintained apartment close to major IT companies. Ideal for working professionals with easy access to metro station.',
    price: 22000,
    location: 'Whitefield, IT Corridor',
    city: 'Bangalore',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    propertyType: 'apartment',
    furnishing: 'semi-furnished',
    amenities: ['Parking', 'Security', 'Power Backup', 'Water Supply'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'
    ],
    ownerId: 'owner2',
    ownerName: 'tao 2',
    ownerPhone: '+91 98765 43211',
    available: true,
    postedDate: '2026-04-20'
  },
  {
    id: '3',
    title: 'Spacious Villa with Garden',
    description: 'Independent villa with private garden and parking space. Perfect for large families seeking privacy and comfort.',
    price: 65000,
    location: 'Jubilee Hills, Residential Area',
    city: 'Hyderabad',
    bedrooms: 4,
    bathrooms: 3,
    area: 3000,
    propertyType: 'villa',
    furnishing: 'furnished',
    amenities: ['Parking', 'Garden', 'Security', 'Power Backup', 'Water Supply', 'Club House'],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ],
    ownerId: 'owner1',
    ownerName: 'Rajesh Kumar',
    ownerPhone: '+91 98765 43210',
    available: true,
    postedDate: '2026-04-10'
  },
  {
    id: '4',
    title: 'Modern Studio Apartment',
    description: 'Compact and efficient studio apartment perfect for students and young professionals. Fully furnished with WiFi.',
    price: 15000,
    location: 'Koramangala, Student Hub',
    city: 'Bangalore',
    bedrooms: 1,
    bathrooms: 1,
    area: 450,
    propertyType: 'studio',
    furnishing: 'furnished',
    amenities: ['WiFi', 'Power Backup', 'Security', 'Water Supply'],
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800'
    ],
    ownerId: 'owner3',
    ownerName: 'Amit Patel',
    ownerPhone: '+91 98765 43212',
    available: true,
    postedDate: '2026-04-25'
  },
  {
    id: '5',
    title: 'Sea-Facing 3BHK Premium Flat',
    description: 'Premium apartment with stunning sea views. High-end finishes and access to exclusive amenities.',
    price: 75000,
    location: 'Marine Drive, Coastal Area',
    city: 'Mumbai',
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    propertyType: 'apartment',
    furnishing: 'furnished',
    amenities: ['Parking', 'Gym', 'Swimming Pool', 'Security', 'Power Backup', 'Elevator', 'Club House'],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800'
    ],
    ownerId: 'owner2',
    ownerName: 'Priya Sharma',
    ownerPhone: '+91 98765 43211',
    available: false,
    postedDate: '2026-03-28'
  },
  {
    id: '6',
    title: 'Budget-Friendly 1BHK',
    description: 'Affordable apartment in a safe neighborhood. Perfect for first-time renters.',
    price: 12000,
    location: 'Andheri East, Residential Colony',
    city: 'Mumbai',
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    propertyType: 'apartment',
    furnishing: 'unfurnished',
    amenities: ['Parking', 'Security', 'Water Supply'],
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800'
    ],
    ownerId: 'owner3',
    ownerName: 'Amit Patel',
    ownerPhone: '+91 98765 43212',
    available: true,
    postedDate: '2026-04-22'
  }
];

export const mockUsers: User[] = [
  {
    id: 'owner1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    role: 'owner'
  },
  {
    id: 'owner2',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43211',
    role: 'owner'
  },
  {
    id: 'owner3',
    name: 'Amit Patel',
    email: 'amit.patel@example.com',
    phone: '+91 98765 43212',
    role: 'owner'
  },
  {
    id: 'tenant1',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@example.com',
    phone: '+91 98765 43213',
    role: 'tenant'
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'booking1',
    propertyId: '1',
    tenantId: 'tenant1',
    ownerId: 'owner1',
    status: 'pending',
    moveInDate: '2026-06-01',
    message: 'I am interested in this property. Would like to schedule a viewing.',
    createdAt: '2026-04-28'
  }
];

// Context for current logged-in user (mock authentication)
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};
