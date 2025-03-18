
import { PropertyProps } from "@/components/PropertyCard";

export const properties: PropertyProps[] = [
  {
    id: "prop001",
    title: "Villa de luxe avec vue sur la mer",
    location: "Baguida, Lomé",
    price: 450000000,
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2070",
    propertyType: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: 350,
    isForSale: true,
  },
  {
    id: "prop002",
    title: "Appartement moderne au centre-ville",
    location: "Boulevard du Mono, Lomé",
    price: 175000000,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2070",
    propertyType: "Appartement",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    isForSale: true,
  },
  {
    id: "prop003",
    title: "Maison familiale avec jardin",
    location: "Agoè, Lomé",
    price: 250000000,
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2070",
    propertyType: "Maison",
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    isForSale: true,
  },
  {
    id: "prop004",
    title: "Appartement à louer près de l'université",
    location: "Tokoin, Lomé",
    price: 300000,
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2070",
    propertyType: "Appartement",
    bedrooms: 2,
    bathrooms: 1,
    area: 75,
    isForSale: false,
  },
  {
    id: "prop005",
    title: "Bureau commercial au quartier des affaires",
    location: "Quartier Administratif, Lomé",
    price: 500000,
    imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2069",
    propertyType: "Commercial",
    area: 150,
    isForSale: false,
  },
  {
    id: "prop006",
    title: "Terrain constructible avec vue panoramique",
    location: "Kpalimé",
    price: 85000000,
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2132",
    propertyType: "Terrain",
    area: 1200,
    isForSale: true,
  },
  {
    id: "prop007",
    title: "Villa de vacances en bord de plage",
    location: "Aneho",
    price: 800000,
    imageUrl: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2070",
    propertyType: "Villa",
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    isForSale: false,
  },
  {
    id: "prop008",
    title: "Maison traditionnelle rénovée",
    location: "Sokodé",
    price: 120000000,
    imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2065",
    propertyType: "Maison",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    isForSale: true,
  }
];

// Get featured properties
export const getFeaturedProperties = (count = 4): PropertyProps[] => {
  return properties.slice(0, count);
};

// Get properties by type (sale or rent)
export const getPropertiesByType = (isForSale: boolean): PropertyProps[] => {
  return properties.filter(property => property.isForSale === isForSale);
};

// Get properties with filters
export const getFilteredProperties = (filters: any): PropertyProps[] => {
  return properties.filter(property => {
    // Filter by sale/rent status if specified
    if (filters.isForSale !== undefined && property.isForSale !== filters.isForSale) {
      return false;
    }
    
    // Filter by property type if specified
    if (filters.propertyType && filters.propertyType !== "" && property.propertyType.toLowerCase() !== filters.propertyType.toLowerCase()) {
      return false;
    }
    
    // Filter by price range
    if (property.price < filters.priceMin || property.price > filters.priceMax) {
      return false;
    }
    
    // Filter by bedrooms if specified
    if (filters.bedrooms && filters.bedrooms !== "" && 
        (!property.bedrooms || property.bedrooms < parseInt(filters.bedrooms))) {
      return false;
    }
    
    // Filter by bathrooms if specified
    if (filters.bathrooms && filters.bathrooms !== "" && 
        (!property.bathrooms || property.bathrooms < parseInt(filters.bathrooms))) {
      return false;
    }
    
    // Filter by location if specified
    if (filters.location && filters.location !== "" && 
        !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    return true;
  });
};

// Get a property by ID
export const getPropertyById = (id: string): PropertyProps | undefined => {
  return properties.find(property => property.id === id);
};
