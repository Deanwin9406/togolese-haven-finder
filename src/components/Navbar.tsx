
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu, X, User, Search } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-full bg-togo-green"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">IT</div>
            </div>
            <span className="hidden font-bold text-xl md:inline-block">ImmoTogo</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Acheter</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        to="/buy"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-togo-green/20 to-togo-green/50 p-6 no-underline outline-none focus:shadow-md"
                      >
                        <div className="mt-4 mb-2 text-lg font-medium text-foreground">
                          Propriétés à vendre
                        </div>
                        <p className="text-sm leading-tight text-foreground/90">
                          Parcourez notre sélection de propriétés à vendre à travers le Togo.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/buy/houses" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Maisons</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Trouvez votre maison idéale
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/buy/apartments" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Appartements</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Découvrez des appartements modernes
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/buy/land" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Terrains</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Investissez dans des terrains à fort potentiel
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Louer</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        to="/rent"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-togo-yellow/20 to-togo-yellow/50 p-6 no-underline outline-none focus:shadow-md"
                      >
                        <div className="mt-4 mb-2 text-lg font-medium text-foreground">
                          Propriétés à louer
                        </div>
                        <p className="text-sm leading-tight text-foreground/90">
                          Trouvez votre prochaine location parmi notre sélection de propriétés.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/rent/long-term" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Location longue durée</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Pour un séjour prolongé
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/rent/vacation" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Location vacances</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Pour vos séjours de courte durée
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to="/rent/commercial" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Espaces commerciaux</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Bureaux et locaux commerciaux
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/services" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                Services
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                À propos
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2">
            <Input 
              type="search" 
              placeholder="Rechercher..." 
              className="w-[200px]"
            />
            <Button size="icon" variant="ghost">
              <Search className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Se connecter</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">S'inscrire</Link>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="container py-4 md:hidden animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link to="/buy" className="px-2 py-1 hover:bg-accent rounded-md" onClick={() => setIsMenuOpen(false)}>
              Acheter
            </Link>
            <Link to="/rent" className="px-2 py-1 hover:bg-accent rounded-md" onClick={() => setIsMenuOpen(false)}>
              Louer
            </Link>
            <Link to="/services" className="px-2 py-1 hover:bg-accent rounded-md" onClick={() => setIsMenuOpen(false)}>
              Services
            </Link>
            <Link to="/about" className="px-2 py-1 hover:bg-accent rounded-md" onClick={() => setIsMenuOpen(false)}>
              À propos
            </Link>
            <div className="flex flex-col pt-4 border-t">
              <Button className="w-full mb-2" asChild>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <User className="mr-2 h-4 w-4" />
                  Se connecter
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  S'inscrire
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
