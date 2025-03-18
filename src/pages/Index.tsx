
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilter from "@/components/PropertyFilter";
import { getFeaturedProperties } from "@/data/properties";
import { Building, Home, MapPin, DollarSign, Users } from "lucide-react";

const Index = () => {
  const [featuredProperties] = useState(getFeaturedProperties());
  const [filters, setFilters] = useState({});

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
    // In a real app, this would trigger API calls or filter the property list
    console.log("Filtering with:", newFilters);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2070')" 
          }}
        ></div>
        
        <div className="container relative z-20 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Trouvez Votre Chez-Vous au Togo
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              ImmoTogo vous connecte aux meilleures propriétés à vendre et à louer à travers le Togo
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-togo-green hover:bg-togo-green/90">
                <Link to="/buy">Acheter</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/20">
                <Link to="/rent">Louer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="container -mt-16 mb-12 relative z-30">
        <PropertyFilter onFilter={handleFilter} className="bg-white/95 backdrop-blur-md" />
      </section>
      
      {/* Featured Properties */}
      <section className="container py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Propriétés en vedette</h2>
          <Button variant="outline" asChild>
            <Link to="/properties">Voir tout</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </section>
      
      {/* Services Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Services</h2>
            <p className="text-muted-foreground">
              ImmoTogo offre une gamme complète de services immobiliers pour répondre à tous vos besoins.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="rounded-full bg-togo-green w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <Home className="text-white h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Achat & Vente</h3>
                <p className="text-center text-muted-foreground">
                  Achetez ou vendez votre propriété avec notre accompagnement personnalisé à chaque étape.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="rounded-full bg-togo-yellow w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <Building className="text-white h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Location</h3>
                <p className="text-center text-muted-foreground">
                  Location longue durée ou saisonnière avec des options pour tous les budgets.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="rounded-full bg-togo-red w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <MapPin className="text-white h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Conseil Immobilier</h3>
                <p className="text-center text-muted-foreground">
                  Des conseils d'experts pour vous aider à faire les meilleurs choix immobiliers.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <DollarSign className="text-white h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Investissement</h3>
                <p className="text-center text-muted-foreground">
                  Identifiez les meilleures opportunités d'investissement immobilier au Togo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Pourquoi choisir ImmoTogo ?</h2>
            <p className="text-muted-foreground mb-6">
              ImmoTogo est la plateforme immobilière de référence au Togo, offrant un service complet et personnalisé pour toutes vos transactions immobilières.
            </p>
            
            <ul className="space-y-4">
              <li className="flex">
                <div className="mr-4 mt-1">
                  <div className="h-6 w-6 rounded-full bg-togo-green flex items-center justify-center">
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Expérience locale</h3>
                  <p className="text-muted-foreground">
                    Notre équipe possède une connaissance approfondie du marché immobilier togolais.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-4 mt-1">
                  <div className="h-6 w-6 rounded-full bg-togo-green flex items-center justify-center">
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Sélection rigoureuse</h3>
                  <p className="text-muted-foreground">
                    Chaque propriété est vérifiée pour garantir la qualité et la légalité.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-4 mt-1">
                  <div className="h-6 w-6 rounded-full bg-togo-green flex items-center justify-center">
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Support client 24/7</h3>
                  <p className="text-muted-foreground">
                    Notre équipe est disponible pour répondre à toutes vos questions et préoccupations.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="mr-4 mt-1">
                  <div className="h-6 w-6 rounded-full bg-togo-green flex items-center justify-center">
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Transparence totale</h3>
                  <p className="text-muted-foreground">
                    Pas de frais cachés, des processus clairs et des informations complètes sur chaque propriété.
                  </p>
                </div>
              </li>
            </ul>
            
            <Button className="mt-8" asChild>
              <Link to="/about">En savoir plus</Link>
            </Button>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1973" 
              alt="ImmoTogo team" 
              className="rounded-lg object-cover w-full h-[500px]"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg max-w-xs">
              <div className="flex items-center mb-2">
                <Users className="h-6 w-6 text-togo-green mr-2" />
                <h3 className="font-semibold">Clients satisfaits</h3>
              </div>
              <p className="text-3xl font-bold text-togo-green">2,500+</p>
              <p className="text-muted-foreground text-sm mt-1">
                Nous avons aidé plus de 2500 clients à trouver leur propriété idéale.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-togo-green py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4">Prêt à trouver votre chez-vous ?</h2>
            <p className="opacity-90 mb-8">
              Que vous cherchiez à acheter, vendre ou louer, nous sommes là pour vous accompagner dans votre projet immobilier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-togo-green hover:bg-white/90" asChild>
                <Link to="/properties">Explorer les propriétés</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white hover:bg-white/20" asChild>
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
