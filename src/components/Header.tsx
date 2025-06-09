import { Link } from "react-router-dom";
import { ShoppingCart, Glasses } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { itemCount } = useCart();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Glasses className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">OptkaLine</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Главная
            </Link>
            <Link
              to="/catalog"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Каталог
            </Link>
            <Link
              to="/cart"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Корзина
            </Link>
          </nav>

          <Link to="/cart">
            <Button variant="outline" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
