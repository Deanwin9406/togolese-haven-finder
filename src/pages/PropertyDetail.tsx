
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { getPropertyById } from "@/data/properties";
import { 
  BedDouble, 
  Bath, 
  Square, 
  MapPin, 
  Heart, 
  Share2, 
  Calendar, 
  Phone, 
  Mail, 
  User, 
  ChevronLeft,
  Home
} from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const propertyData = getPropertyById(id);
      setProperty(propertyData);
      setLoading(false);
      
      // Scroll to top when property is loaded
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container py-12 flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement des détails de la propriété...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container py-12 flex-1">
          <div className="max-w-md mx-auto text-center">
            <Home className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Propriété non trouvée</h1>
            <p className="text-muted-foreground mb-6">
              Désolé, la propriété que vous recherchez n'existe pas ou a été retirée.
            </p>
            <Button asChild>
              <Link to="/properties">Voir toutes les propriétés</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Format price with CFA currency
  const formattedPrice = new Intl.NumberFormat('fr-TG', {
    style: 'currency',
    currency: 'XOF',
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container py-6">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-0 mr-2 h-auto" 
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Retour
          </Button>
          <span className="mx-2">/</span>
          <Link to="/properties" className="hover:text-foreground transition-colors">
            Propriétés
          </Link>
          <span className="mx-2">/</span>
          <Link 
            to={property.isForSale ? "/buy" : "/rent"} 
            className="hover:text-foreground transition-colors"
          >
            {property.isForSale ? "À vendre" : "À louer"}
          </Link>
          <span className="mx-2">/</span>
          <span className="truncate max-w-[200px]">{property.title}</span>
        </div>
        
        {/* Property Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.location}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="text-3xl font-bold text-primary mb-1">
              {formattedPrice}{!property.isForSale && ' /mois'}
            </div>
            <Badge variant={property.isForSale ? "default" : "secondary"} className="bg-togo-green hover:bg-togo-green/90">
              {property.isForSale ? "À vendre" : "À louer"}
            </Badge>
          </div>
        </div>
        
        {/* Property Images */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 aspect-video rounded-lg overflow-hidden">
              <img 
                src={property.imageUrl} 
                alt={property.title} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="hidden md:grid grid-rows-2 gap-4">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2070" 
                  alt={`${property.title} - additional view 1`} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2070" 
                  alt={`${property.title} - additional view 2`} 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
          </div>
        </div>
        
        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="details">
              <TabsList className="mb-6 grid w-full grid-cols-3">
                <TabsTrigger value="details">Détails</TabsTrigger>
                <TabsTrigger value="features">Caractéristiques</TabsTrigger>
                <TabsTrigger value="location">Localisation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">À propos de cette propriété</h2>
                  <p className="text-muted-foreground">
                    Cette magnifique propriété située à {property.location} offre un cadre de vie exceptionnel. 
                    {property.isForSale 
                      ? " Une opportunité d'investissement idéale ou un chez-soi parfait pour votre famille."
                      : " Disponible à la location immédiatement pour une durée minimale d'un an."
                    }
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Avec ses {property.bedrooms} chambres et {property.bathrooms} salles de bain, cette propriété 
                    de {property.area} m² dispose de tout le confort nécessaire pour une vie agréable.
                    Lumineux et spacieux, ce bien immobilier offre une vue imprenable sur les environs et 
                    bénéficie d'un emplacement stratégique proche des commerces et services essentiels.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Informations principales</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted rounded-md p-4 text-center">
                      <BedDouble className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="font-semibold">{property.bedrooms || '-'}</div>
                      <div className="text-sm text-muted-foreground">Chambres</div>
                    </div>
                    <div className="bg-muted rounded-md p-4 text-center">
                      <Bath className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="font-semibold">{property.bathrooms || '-'}</div>
                      <div className="text-sm text-muted-foreground">Salles de bain</div>
                    </div>
                    <div className="bg-muted rounded-md p-4 text-center">
                      <Square className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="font-semibold">{property.area || '-'} m²</div>
                      <div className="text-sm text-muted-foreground">Surface</div>
                    </div>
                    <div className="bg-muted rounded-md p-4 text-center">
                      <Home className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="font-semibold">{property.propertyType}</div>
                      <div className="text-sm text-muted-foreground">Type</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Caractéristiques</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-togo-green mr-2"></div>
                      <span>Climatisation</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-togo-green mr-2"></div>
                      <span>Cuisine équipée</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-togo-green mr-2"></div>
                      <span>Parking</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-togo-green mr-2"></div>
                      <span>Jardin</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-togo-green mr-2"></div>
                      <span>Sécurité 24/7</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-togo-green mr-2"></div>
                      <span>Internet haut débit</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-togo-green mr-2"></div>
                      <span>Terrasse</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-togo-green mr-2"></div>
                      <span>Récemment rénové</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Commodités à proximité</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-togo-yellow mr-2"></div>
                      <span>Écoles</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-togo-yellow mr-2"></div>
                      <span>Supermarchés</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-togo-yellow mr-2"></div>
                      <span>Transports en commun</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-togo-yellow mr-2"></div>
                      <span>Restaurants</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-togo-yellow mr-2"></div>
                      <span>Centre médical</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-togo-yellow mr-2"></div>
                      <span>Banques</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="location">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Localisation</h2>
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    {/* Replace static map with interactive map */}
                    <PropertyMap 
                      properties={[property]} 
                      height="400px"
                      zoom={15}
                    />
                  </div>
                  <p className="text-muted-foreground">
                    Cette propriété est idéalement située à {property.location}, dans un quartier calme et 
                    sécurisé. À proximité des commerces, écoles et transports en commun.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Intéressé par cette propriété?</h3>
                
                <div className="flex flex-col gap-2 mb-6">
                  <Button asChild>
                    <Link to={`/properties/${id}/contact`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Contacter l'agent
                    </Link>
                  </Button>
                  
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    +228 12 34 56 78
                  </Button>
                  
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Planifier une visite
                  </Button>
                </div>
                
                <Separator className="my-6" />
                
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold">Jean Kokou</div>
                    <div className="text-sm text-muted-foreground">Agent Immobilier</div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Spécialiste du marché immobilier à {property.location} avec plus de 5 ans d'expérience.
                </p>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/agents/jean-kokou">
                    Voir le profil
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default PropertyDetail;
