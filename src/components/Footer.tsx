
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="flex flex-col">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-full bg-togo-green"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">IT</div>
            </div>
            <span className="font-bold text-xl">ImmoTogo</span>
          </Link>
          <p className="text-muted-foreground mb-4">
            Votre partenaire immobilier de confiance au Togo, offrant des solutions pour acheter, vendre et louer des propriétés.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
        
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg mb-4">Explorer</h3>
          <div className="grid grid-cols-1 gap-2">
            <Link to="/buy" className="text-muted-foreground hover:text-foreground transition-colors">
              Propriétés à vendre
            </Link>
            <Link to="/rent" className="text-muted-foreground hover:text-foreground transition-colors">
              Propriétés à louer
            </Link>
            <Link to="/vacation" className="text-muted-foreground hover:text-foreground transition-colors">
              Locations vacances
            </Link>
            <Link to="/new-developments" className="text-muted-foreground hover:text-foreground transition-colors">
              Nouveaux développements
            </Link>
            <Link to="/agents" className="text-muted-foreground hover:text-foreground transition-colors">
              Agents immobiliers
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg mb-4">Ressources</h3>
          <div className="grid grid-cols-1 gap-2">
            <Link to="/guides" className="text-muted-foreground hover:text-foreground transition-colors">
              Guides d'achat
            </Link>
            <Link to="/market-insights" className="text-muted-foreground hover:text-foreground transition-colors">
              Tendances du marché
            </Link>
            <Link to="/mortgage-calculator" className="text-muted-foreground hover:text-foreground transition-colors">
              Calculateur de prêt
            </Link>
            <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </Link>
            <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
              Blog
            </Link>
          </div>
        </div>
        
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg mb-4">Contact</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">123 Boulevard du 30 Août, Lomé, Togo</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">+228 12 34 56 78</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">contact@immotogo.com</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mt-8 pt-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ImmoTogo. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Conditions d'utilisation
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Politique de cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
