
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface PropertyFilterProps {
  onFilter: (filters: any) => void;
  className?: string;
}

const PropertyFilter = ({ onFilter, className }: PropertyFilterProps) => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [filters, setFilters] = useState({
    propertyType: "",
    priceMin: 0,
    priceMax: 100000000,
    bedrooms: "",
    bathrooms: "",
    location: "",
    isForSale: true,
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const handleApplyFilters = () => {
    onFilter(filters);
    setIsFilterExpanded(false);
  };

  const handleResetFilters = () => {
    setFilters({
      propertyType: "",
      priceMin: 0,
      priceMax: 100000000,
      bedrooms: "",
      bathrooms: "",
      location: "",
      isForSale: true,
    });
  };

  return (
    <div className={`rounded-lg border bg-card shadow-sm ${className}`}>
      <div className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Rechercher par localité, quartier..."
            className="flex-1"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          />
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="px-3"
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filtres
            </Button>
            <Button onClick={handleApplyFilters}>
              <Search className="h-4 w-4 mr-2" />
              Rechercher
            </Button>
          </div>
        </div>

        {isFilterExpanded && (
          <div className="mt-4 border-t pt-4 animate-fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="type">Type de bien</Label>
                <Select
                  value={filters.propertyType}
                  onValueChange={(value) => handleFilterChange("propertyType", value)}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Tous les types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous les types</SelectItem>
                    <SelectItem value="apartment">Appartement</SelectItem>
                    <SelectItem value="house">Maison</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="land">Terrain</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="status">Statut</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="status"
                    checked={filters.isForSale}
                    onCheckedChange={(checked) => handleFilterChange("isForSale", checked)}
                  />
                  <Label htmlFor="status" className="cursor-pointer">
                    {filters.isForSale ? "À vendre" : "À louer"}
                  </Label>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="bedrooms">Chambres</Label>
                <Select
                  value={filters.bedrooms}
                  onValueChange={(value) => handleFilterChange("bedrooms", value)}
                >
                  <SelectTrigger id="bedrooms">
                    <SelectValue placeholder="Nombre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="bathrooms">Salles de bain</Label>
                <Select
                  value={filters.bathrooms}
                  onValueChange={(value) => handleFilterChange("bathrooms", value)}
                >
                  <SelectTrigger id="bathrooms">
                    <SelectValue placeholder="Nombre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="price">
                <AccordionTrigger>Prix</AccordionTrigger>
                <AccordionContent>
                  <div className="mt-2 px-2">
                    <div className="flex justify-between mb-4">
                      <span className="text-sm">
                        {new Intl.NumberFormat('fr-TG', {
                          style: 'currency',
                          currency: 'XOF',
                          maximumFractionDigits: 0,
                        }).format(filters.priceMin)}
                      </span>
                      <span className="text-sm">
                        {new Intl.NumberFormat('fr-TG', {
                          style: 'currency',
                          currency: 'XOF',
                          maximumFractionDigits: 0,
                        }).format(filters.priceMax)}
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <Input
                        type="number"
                        placeholder="Min"
                        min={0}
                        value={filters.priceMin}
                        onChange={(e) => handleFilterChange("priceMin", Number(e.target.value))}
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        min={0}
                        value={filters.priceMax}
                        onChange={(e) => handleFilterChange("priceMax", Number(e.target.value))}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex justify-end mt-4">
              <Button
                variant="outline"
                size="sm"
                className="mr-2"
                onClick={handleResetFilters}
              >
                <X className="h-4 w-4 mr-2" />
                Réinitialiser
              </Button>
              <Button size="sm" onClick={handleApplyFilters}>
                Appliquer les filtres
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyFilter;
