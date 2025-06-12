import { Link } from "react-router-dom";
import { ShoppingCart, Glasses, User, LogOut } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { itemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

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
            {isAuthenticated && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      Бренды
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link to="/brand/mustang">Mustang</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/brand/osse">Osse</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/brand/hawk">Hawk</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/brand/diverso">Diverso</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link
                  to="/cart"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Корзина
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
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

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <User className="h-4 w-4" />
                      <span className="hidden md:inline">{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2"
                      >
                        <User className="h-4 w-4" />
                        <span>Профиль</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={logout}
                      className="flex items-center space-x-2 text-red-600"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Выйти</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/login">
                <Button>Войти</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
