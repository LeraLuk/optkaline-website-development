import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart, Eye, Glasses } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { products } from "@/data/products";

const ProductPage = () => {
  const { productId } = useParams();
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(0);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Товар не найден</h1>
          <Link to="/catalog">
            <Button>Вернуться в каталог</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Имитация разных цветов товара
  const colorVariants = [
    { name: "Черный", image: product.image },
    {
      name: "Коричневый",
      image:
        "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400",
    },
    {
      name: "Синий",
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400",
    },
  ];

  const relatedProducts = products
    .filter((p) => p.brand === product.brand && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/catalog" className="hover:text-blue-600 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Каталог
          </Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-white">
              <img
                src={colorVariants[selectedColor].image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Color Variants */}
            <div className="flex space-x-3">
              {colorVariants.map((variant, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedColor === index
                      ? "border-blue-600"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={variant.image}
                    alt={variant.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Цвет: {colorVariants[selectedColor].name}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-3">{product.brand}</Badge>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg">{product.description}</p>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-blue-600">
              {product.price.toLocaleString("ru-RU")} ₽
            </div>

            {/* Product Details */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Тип:</span>
                <span>{product.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Пол:</span>
                <span>{product.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Сезон:</span>
                <span>{product.season}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">В наличии:</span>
                <span
                  className={
                    product.inStock > 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {product.inStock > 0
                    ? `${product.inStock} шт.`
                    : "Нет в наличии"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg"
                disabled={product.inStock === 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Добавить в корзину
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Похожие товары</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="text-xl font-bold text-blue-600">
                        {relatedProduct.price.toLocaleString("ru-RU")} ₽
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
