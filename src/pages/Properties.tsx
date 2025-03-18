import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilter from "@/components/PropertyFilter";
import { getFilteredProperties, properties } from "@/data/properties";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PropertyMap from "@/components/PropertyMap";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({
    propertyType: "",
    priceMin: 0,
    priceMax: 100000000,
    bedrooms: "",
    bathrooms: "",
    location: "",
    isForSale: undefined,
  });

  useEffect(() => {
    const initialFilters = { ...filters };
    
    const type = searchParams.get("type");
    if (type) initialFilters.propertyType = type;
    
    const forSale = searchParams.get("forSale");
    if (forSale !== null) initialFilters.isForSale = forSale === "true";
    
    const location = searchParams.get("location");
    if (location) initialFilters.location = location;
    
    setFilters(initialFilters);
    
    if (forSale === "true") setActiveTab("buy");
    else if (forSale === "false") setActiveTab("rent");
    else setActiveTab("all");
    
    applyFilters(initialFilters);
  }, [searchParams]);

  const applyFilters = (currentFilters: any) => {
    const filtered = getFilteredProperties(currentFilters);
    setFilteredProperties(filtered);
  };

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    const updatedFilters = { ...filters };
    if (value === "buy") updatedFilters.isForSale = true;
    else if (value === "rent") updatedFilters.isForSale = false;
    else updatedFilters.isForSale = undefined;
    
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Propriétés</h1>
          <p className="text-muted-foreground">
            Parcourez notre sélection de propriétés à vendre et à louer à travers le Togo
          </p>
        </div>
        
        <div className="flex justify-end mb-6">
          <Button asChild className="bg-togo-green hover:bg-togo-green/90">
            <Link to="/properties/create">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Ajouter une propriété
            </Link>
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all">Toutes les propriétés</TabsTrigger>
            <TabsTrigger value="buy">À vendre</TabsTrigger>
            <TabsTrigger value="rent">À louer</TabsTrigger>
          </TabsList>
          
          <PropertyFilter onFilter={handleFilter} className="mb-8" />
          
          <div className="mb-6 rounded-lg overflow-hidden shadow-md">
            <PropertyMap properties={filteredProperties} height="400px" />
          </div>
          
          <Separator className="my-6" />
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))
              ) : (
                <div className="col-span-full">
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Aucun résultat</AlertTitle>
                    <AlertDescription>
                      Aucune propriété ne correspond à vos critères de recherche. Veuillez modifier vos filtres.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="buy" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))
              ) : (
                <div className="col-span-full">
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Aucun résultat</AlertTitle>
                    <AlertDescription>
                      Aucune propriété à vendre ne correspond à vos critères de recherche. Veuillez modifier vos filtres.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="rent" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))
              ) : (
                <div className="col-span-full">
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Aucun résultat</AlertTitle>
                    <AlertDescription>
                      Aucune propriété à louer ne correspond à vos critères de recherche. Veuillez modifier vos filtres.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Properties;
