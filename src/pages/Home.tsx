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

      {/* Brand Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Наши бренды</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Mustang",
                image:
                  "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400",
                description: "Американский стиль и качество",
              },
              {
                name: "Osse",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
                description: "Турецкий премиум-бренд",
              },
              {
                name: "Hawk",
                image:
                  "https://images.unsplash.com/photo-1556306535-38febf6782e7?w=400",
                description: "Для активного образа жизни",
              },
              {
                name: "Diverso",
                image:
                  "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400",
                description: "Разнообразие стилей",
              },
            ].map((brand) => (
              <Link key={brand.name} to={`/brand/${brand.name.toLowerCase()}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <img
                      src={brand.image}
                      alt={`Очки ${brand.name}`}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-2">{brand.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {brand.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
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
