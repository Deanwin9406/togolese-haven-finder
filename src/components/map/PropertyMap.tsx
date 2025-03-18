
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PropertyProps } from '@/components/PropertyCard';

// Fix Leaflet marker icon issue
useEffect(() => {
  // Fix Leaflet default icon issue
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}, []);

interface PropertyMapProps {
  properties: PropertyProps[];
  height?: string;
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: (property: PropertyProps) => void;
}

const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  height = "400px",
  center = [6.1271, 1.2227], // Default center on Lomé, Togo
  zoom = 13,
  onMarkerClick
}) => {
  // Create custom marker icons to differentiate between for sale and for rent
  const saleIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const rentIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  // For demo purposes, generate random coordinates near the center
  const getRandomCoordinate = (property: PropertyProps): [number, number] => {
    // In a real application, these would come from your property data
    const randomLat = center[0] + (Math.random() - 0.5) * 0.05;
    const randomLng = center[1] + (Math.random() - 0.5) * 0.05;
    return [randomLat, randomLng];
  };

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      style={{ height, width: '100%', borderRadius: '0.5rem' }}
      className="z-0 shadow-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {properties.map((property) => {
        const coords = getRandomCoordinate(property);
        return (
          <Marker 
            key={property.id} 
            position={coords}
            icon={property.isForSale ? saleIcon : rentIcon}
            eventHandlers={{
              click: () => {
                if (onMarkerClick) onMarkerClick(property);
              }
            }}
          >
            <Popup>
              <div className="flex flex-col">
                <img 
                  src={property.imageUrl} 
                  alt={property.title} 
                  className="w-full h-24 object-cover rounded mb-2" 
                />
                <div className="font-semibold">{property.title}</div>
                <div className="text-sm text-muted-foreground">{property.location}</div>
                <div className="font-bold text-primary mt-1">
                  {new Intl.NumberFormat('fr-TG', {
                    style: 'currency',
                    currency: 'XOF',
                    maximumFractionDigits: 0,
                  }).format(property.price)}
                  {!property.isForSale && ' /mois'}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default PropertyMap;
