
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

  // Initialize filters from URL params
  useEffect(() => {
    const initialFilters = { ...filters };
    
    const type = searchParams.get("type");
    if (type) initialFilters.propertyType = type;
    
    const forSale = searchParams.get("forSale");
    if (forSale !== null) initialFilters.isForSale = forSale === "true";
    
    const location = searchParams.get("location");
    if (location) initialFilters.location = location;
    
    setFilters(initialFilters);
    
    // Set active tab based on forSale param
    if (forSale === "true") setActiveTab("buy");
    else if (forSale === "false") setActiveTab("rent");
    else setActiveTab("all");
    
    // Apply initial filters
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
    
    // Update isForSale filter based on tab
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
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all">Toutes les propriétés</TabsTrigger>
            <TabsTrigger value="buy">À vendre</TabsTrigger>
            <TabsTrigger value="rent">À louer</TabsTrigger>
          </TabsList>
          
          <PropertyFilter onFilter={handleFilter} className="mb-8" />
          
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
