import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, updateQuantity, items } = useCart();
  const [showQuantityControls, setShowQuantityControls] = useState(false);

  // Найти текущий товар в корзине
  const cartItem = items.find((item) => item.product.id === product.id);
  const currentQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addItem(product, 1);
    setShowQuantityControls(true);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      updateQuantity(product.id, 0);
      setShowQuantityControls(false);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <CardContent className="p-4 flex-1">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{product.brand}</Badge>
              <span className="text-sm text-gray-500">
                Склад: {product.inStock}
              </span>
            </div>

            <h3 className="font-semibold text-lg leading-tight">
              {product.name}
            </h3>

            <p className="text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-1">
              <Badge variant="outline" className="text-xs">
                {product.gender}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {product.season}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {product.type}
              </Badge>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="w-full space-y-3">
            <div className="text-2xl font-bold text-blue-600">
              {product.price.toLocaleString("ru-RU")} ₽
            </div>

            {!showQuantityControls && currentQuantity === 0 ? (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart();
                }}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={product.inStock === 0}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />В корзину
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleQuantityChange(currentQuantity - 1);
                  }}
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <div className="flex-1 text-center font-semibold bg-gray-50 py-2 rounded">
                  {currentQuantity}
                </div>

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleQuantityChange(currentQuantity + 1);
                  }}
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                  disabled={currentQuantity >= product.inStock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
