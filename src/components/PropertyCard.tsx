
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Maximize2, BedDouble, Bath, Square } from "lucide-react";

export interface PropertyProps {
  id: string;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
  propertyType: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  isForSale: boolean;
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  imageUrl,
  propertyType,
  bedrooms,
  bathrooms,
  area,
  isForSale,
}: PropertyProps) => {
  // Format price with CFA currency
  const formattedPrice = new Intl.NumberFormat('fr-TG', {
    style: 'currency',
    currency: 'XOF',
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge variant={isForSale ? "default" : "secondary"} className="bg-togo-green hover:bg-togo-green/90">
            {isForSale ? "À vendre" : "À louer"}
          </Badge>
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm">
            {propertyType}
          </Badge>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Ajouter aux favoris</span>
        </Button>
      </div>
      <CardContent className="p-4">
        <Link to={`/properties/${id}`}>
          <h3 className="font-semibold text-lg line-clamp-1 hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mt-1 line-clamp-1">{location}</p>
        <p className="font-bold text-lg mt-2 text-primary">{formattedPrice}{!isForSale && ' /mois'}</p>
        
        {(bedrooms || bathrooms || area) && (
          <div className="flex items-center gap-3 mt-3 text-sm text-muted-foreground">
            {bedrooms && (
              <div className="flex items-center">
                <BedDouble className="h-4 w-4 mr-1" />
                <span>{bedrooms}</span>
              </div>
            )}
            {bathrooms && (
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{bathrooms}</span>
              </div>
            )}
            {area && (
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{area} m²</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button asChild variant="outline" size="sm" className="w-1/2 mr-2">
          <Link to={`/properties/${id}`}>
            Détails
          </Link>
        </Button>
        <Button asChild size="sm" className="w-1/2">
          <Link to={`/properties/${id}/contact`}>
            Contacter
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
