import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/hooks/useCart";
import { OrderData } from "@/types/product";
import * as XLSX from "xlsx";
import { useAuth } from "@/hooks/useAuth";

const Order = () => {
  const navigate = useNavigate();
  const { items, total, clear } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    customerName: user?.name || "",
    company: user?.company || "",
    phone: user?.phone || "",
    email: user?.email || "",
    address: user?.address || "",
  });

  // Обновляем данные формы при изменении пользователя
  React.useEffect(() => {
    if (user) {
      setFormData({
        customerName: user.name,
        company: user.company,
        phone: user.phone,
        email: user.email,
        address: user.address,
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const exportToExcel = () => {
    const orderData: OrderData = {
      ...formData,
      items,
      total,
      orderDate: new Date().toLocaleDateString("ru-RU"),
    };

    // Создаем данные для Excel
    const excelData = [
      ["Заказ OptkaLine", "", "", "", ""],
      ["Дата заказа:", orderData.orderDate, "", "", ""],
      ["", "", "", "", ""],
      ["ИНФОРМАЦИЯ О КЛИЕНТЕ", "", "", "", ""],
      ["Контактное лицо:", orderData.customerName, "", "", ""],
      ["Компания:", orderData.company, "", "", ""],
      ["Телефон:", orderData.phone, "", "", ""],
      ["Email:", orderData.email, "", "", ""],
      ["Адрес:", orderData.address, "", "", ""],
      ["", "", "", "", ""],
      ["ЗАКАЗАННЫЕ ТОВАРЫ", "", "", "", ""],
      ["Наименование", "Бренд", "Количество", "Цена за шт.", "Сумма"],
      ...items.map((item) => [
        item.product.name,
        item.product.brand,
        item.quantity,
        item.product.price,
        item.product.price * item.quantity,
      ]),
      ["", "", "", "", ""],
      ["", "", "", "ИТОГО:", total],
    ];

    // Создаем рабочую книгу
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(excelData);

    // Стилизация (базовая)
    ws["!cols"] = [
      { width: 30 },
      { width: 15 },
      { width: 15 },
      { width: 15 },
      { width: 15 },
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Заказ");

    // Скачиваем файл
    const fileName = `Заказ_OptkaLine_${new Date().toISOString().split("T")[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);

    // Очищаем корзину и переходим на главную
    clear();
    navigate("/", { replace: true });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName || !formData.company || !formData.phone) {
      alert("Пожалуйста, заполните обязательные поля");
      return;
    }

    exportToExcel();
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Форма */}
          <Card>
            <CardHeader>
              <CardTitle>Контактная информация</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="customerName">Контактное лицо *</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) =>
                      handleInputChange("customerName", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="company">Название компании *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="address">Адрес доставки</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Скачать заказ (Excel)
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Сводка заказа */}
          <Card>
            <CardHeader>
              <CardTitle>Ваш заказ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.product.brand} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {(item.product.price * item.quantity).toLocaleString(
                      "ru-RU",
                    )}{" "}
                    ₽
                  </p>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Итого:</span>
                  <span className="text-blue-600">
                    {total.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
              </div>

              <div className="text-sm text-gray-600 mt-4">
                <p>• Заказ будет сформирован в Excel файле</p>
                <p>• Мы свяжемся с вами для подтверждения</p>
                <p>• Срок обработки заказа: 1-2 рабочих дня</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Order;
