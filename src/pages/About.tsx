import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Glasses, Award, Users, Target } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Glasses className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">О компании OptkaLine</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы предлагаем качественную оптику от ведущих брендов с 2010 года.
            Наша миссия — помочь каждому клиенту видеть мир ярче и четче.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Качество</h3>
              <p className="text-gray-600">
                Работаем только с проверенными брендами и поставщиками
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Опыт</h3>
              <p className="text-gray-600">
                Более 13 лет на рынке оптических услуг
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Сервис</h3>
              <p className="text-gray-600">
                Индивидуальный подход к каждому клиенту
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Story */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Наша история</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              OptkaLine была основана в 2010 году с простой идеей: предоставить
              качественную оптику по доступным ценам. За годы работы мы выросли
              от небольшого магазина до надежного поставщика оптических товаров.
            </p>
            <p className="text-gray-700 mb-6">
              Сегодня в нашем ассортименте представлены ведущие бренды: Mustang,
              Osse, Hawk и Diverso. Мы тщательно отбираем каждую модель, чтобы
              гарантировать высокое качество и стиль.
            </p>
            <p className="text-gray-700">
              Наша команда состоит из опытных специалистов, которые помогут
              подобрать идеальную оптику для ваших потребностей. Мы ценим
              доверие наших клиентов и стремимся превзойти их ожидания.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
