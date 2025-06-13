import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Glasses, Eye } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";

const brandInfo = {
  mustang: {
    name: "Mustang",
    description:
      "Американский бренд с богатой историей, предлагающий стильные и качественные очки для активного образа жизни. Mustang сочетает классические формы с современными материалами.",
    features: [
      "Прочные материалы",
      "Спортивный дизайн",
      "UV-защита",
      "Комфортная посадка",
    ],
    image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600",
  },
  osse: {
    name: "Osse",
    description:
      "Турецкий премиум-бренд, известный своими инновационными решениями в области оптики. Osse предлагает элегантные модели для требовательных клиентов.",
    features: [
      "Итальянский дизайн",
      "Премиум материалы",
      "Эргономичность",
      "Стильные решения",
    ],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
  },
  hawk: {
    name: "Hawk",
    description:
      "Динамичный бренд для тех, кто ценит скорость и точность. Hawk создает очки для активных людей, которые не идут на компромиссы в качестве.",
    features: [
      "Спортивные технологии",
      "Легкий вес",
      "Ударопрочность",
      "Антибликовое покрытие",
    ],
    image: "https://images.unsplash.com/photo-1556306535-38febf6782e7?w=600",
  },
  diverso: {
    name: "Diverso",
    description:
      "Универсальный бренд, предлагающий широкий выбор моделей для любого случая. Diverso — это разнообразие стилей и доступность качественной оптики.",
    features: [
      "Разнообразие моделей",
      "Доступные цены",
      "Качественная оптика",
      "Современный стиль",
    ],
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600",
  },
};

const BrandPage = () => {
  const { brandName } = useParams<{ brandName: string }>();
  const { isAuthenticated } = useAuth();

  if (!brandName || !brandInfo[brandName as keyof typeof brandInfo]) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Бренд не найден
          </h1>
          <p className="text-gray-600 mb-6">
            Возможно, вы перешли по неверной ссылке
          </p>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  const info = brandInfo[brandName as keyof typeof brandInfo];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl font-bold mb-6 text-gray-900">
              Очки {info.name}
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {info.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {info.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center text-sm text-gray-600"
                >
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                  {feature}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link
                to={
                  isAuthenticated
                    ? `/catalog/${brandName}/солнцезащитные`
                    : "/login"
                }
              >
                <Button
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Glasses className="mr-2 h-5 w-5" />
                  Посмотреть С/З
                </Button>
              </Link>

              <Link
                to={
                  isAuthenticated
                    ? `/catalog/${brandName}/медицинская оптика`
                    : "/login"
                }
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <Eye className="mr-2 h-5 w-5" />
                  Посмотреть мед.Оптику
                </Button>
              </Link>
            </div>

            {!isAuthenticated && (
              <p className="text-sm text-gray-500 mt-4 text-center">
                Для просмотра каталога необходима авторизация
              </p>
            )}
          </div>

          <div>
            <img
              src={info.image}
              alt={`Очки ${info.name}`}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Additional Info */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Почему выбирают {info.name}
            </h2>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
                <div className="text-gray-600">Лет на рынке</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  1000+
                </div>
                <div className="text-gray-600">Довольных клиентов</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
                <div className="text-gray-600">Положительных отзывов</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrandPage;
