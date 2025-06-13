import { Link } from "react-router-dom";
import { Glasses, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Glasses className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">OptkaLine</span>
            </Link>
            <p className="text-gray-400">
              Качественная оптика от ведущих брендов. Работаем с 2010 года.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Навигация</h3>
            <div className="space-y-2">
              <Link
                to="/"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Главная
              </Link>
              <Link
                to="/about"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                О нас
              </Link>
              <Link
                to="/contacts"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Контакты
              </Link>
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="font-semibold mb-4">Бренды</h3>
            <div className="space-y-2">
              <Link
                to="/brand/mustang"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Mustang
              </Link>
              <Link
                to="/brand/osse"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Osse
              </Link>
              <Link
                to="/brand/hawk"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Hawk
              </Link>
              <Link
                to="/brand/diverso"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Diverso
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">+7 (495) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">info@optkaline.ru</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-blue-400 mt-1" />
                <span className="text-gray-400">
                  г. Москва, ул. Тверская, д. 15
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2023 OptkaLine. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
