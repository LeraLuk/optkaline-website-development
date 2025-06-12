import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Glasses, ShoppingCart, FileText, Truck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">OptkaLine</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ваш надёжный партнёр в оптовых поставках очков премиум-класса.
            Работаем с ведущими мировыми брендами.
          </p>
          <Link to={isAuthenticated ? "/catalog" : "/login"}>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Glasses className="mr-2 h-5 w-5" />
              {isAuthenticated
                ? "Перейти в каталог"
                : "Войти для просмотра каталога"}
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Почему выбирают нас
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Glasses className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Премиум бренды</h3>
                <p className="text-gray-600 text-sm">
                  Ray-Ban, Oakley, Prada, Tom Ford и другие ведущие
                  производители
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <ShoppingCart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Оптовые цены</h3>
                <p className="text-gray-600 text-sm">
                  Выгодные условия для розничных магазинов и дистрибьюторов
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Простое оформление</h3>
                <p className="text-gray-600 text-sm">
                  Удобная корзина и экспорт заказов в Excel для бухгалтерии
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Быстрая доставка</h3>
                <p className="text-gray-600 text-sm">
                  Отгрузка в течение 1-2 рабочих дней по всей России
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">О компании OptkaLine</h2>
            <p className="text-lg text-gray-600 mb-8">
              Более 10 лет мы специализируемся на оптовых поставках качественной
              оптики. Наша миссия — предоставить розничным магазинам доступ к
              лучшим брендам по конкурентным ценам с высоким уровнем сервиса.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  500+
                </div>
                <div className="text-gray-600">Довольных клиентов</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  50 000+
                </div>
                <div className="text-gray-600">Очков в наличии</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  24/7
                </div>
                <div className="text-gray-600">Поддержка клиентов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Готовы начать сотрудничество?
          </h2>
          <p className="text-gray-600 mb-8">
            Откройте каталог и выберите товары для вашего магазина
          </p>
          <Link to={isAuthenticated ? "/catalog" : "/login"}>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              {isAuthenticated ? "Открыть каталог" : "Войти в систему"}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
