import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { items, total, updateQuantity, removeItem, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-8">
              <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Корзина пуста</h2>
              <p className="text-gray-600 mb-6">
                Добавьте товары из каталога для оформления заказа
              </p>
              <Link to="/catalog">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Перейти в каталог
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Корзина</h1>
          <Button variant="outline" onClick={clear}>
            Очистить корзину
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Список товаров */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.product.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-600">{item.product.brand}</p>
                      <p className="text-blue-600 font-semibold">
                        {item.product.price.toLocaleString("ru-RU")} ₽
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.product.id,
                            parseInt(e.target.value) || 0,
                          )
                        }
                        className="w-20 text-center"
                        min="0"
                      />

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-lg">
                        {(item.product.price * item.quantity).toLocaleString(
                          "ru-RU",
                        )}{" "}
                        ₽
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Итоги */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Итоги заказа</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span>Товаров:</span>
                  <span>
                    {items.reduce((count, item) => count + item.quantity, 0)}
                  </span>
                </div>

                <div className="flex justify-between text-xl font-bold">
                  <span>Итого:</span>
                  <span className="text-blue-600">
                    {total.toLocaleString("ru-RU")} ₽
                  </span>
                </div>

                <Link to="/order" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Оформить заказ
                  </Button>
                </Link>

                <Link to="/catalog">
                  <Button variant="outline" className="w-full">
                    Продолжить покупки
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
