import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Order } from "@/types/product";
import Icon from "@/components/ui/icon";

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-purple-100 text-purple-800";
      case "shipped":
        return "bg-orange-100 text-orange-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Ожидает";
      case "confirmed":
        return "Подтвержден";
      case "processing":
        return "Обрабатывается";
      case "shipped":
        return "Отправлен";
      case "delivered":
        return "Доставлен";
      case "cancelled":
        return "Отменен";
      default:
        return status;
    }
  };

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Icon
            name="ShoppingBag"
            size={48}
            className="mx-auto text-gray-400 mb-4"
          />
          <p className="text-gray-600">У вас пока нет заказов</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">Заказ #{order.id}</h3>
                <p className="text-sm text-gray-600">{order.orderDate}</p>
              </div>
              <Badge className={getStatusColor(order.status)}>
                {getStatusText(order.status)}
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  Товаров: {order.items.length}
                </p>
                <p className="font-semibold text-lg">
                  {order.total.toLocaleString("ru-RU")} ₽
                </p>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedOrder(order)}
                  >
                    Подробнее
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Заказ #{order.id}</DialogTitle>
                  </DialogHeader>

                  {selectedOrder && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">
                            Информация о заказе
                          </h4>
                          <p className="text-sm">
                            <strong>Дата:</strong> {selectedOrder.orderDate}
                          </p>
                          <p className="text-sm">
                            <strong>Статус:</strong>{" "}
                            {getStatusText(selectedOrder.status)}
                          </p>
                          <p className="text-sm">
                            <strong>Telegram:</strong>{" "}
                            {selectedOrder.telegramSent
                              ? "Отправлен"
                              : "Не отправлен"}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">
                            Контактная информация
                          </h4>
                          <p className="text-sm">
                            <strong>Имя:</strong> {selectedOrder.customerName}
                          </p>
                          <p className="text-sm">
                            <strong>Компания:</strong> {selectedOrder.company}
                          </p>
                          <p className="text-sm">
                            <strong>Телефон:</strong> {selectedOrder.phone}
                          </p>
                          <p className="text-sm">
                            <strong>Email:</strong> {selectedOrder.email}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Адрес доставки</h4>
                        <p className="text-sm">{selectedOrder.address}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Товары</h4>
                        <div className="space-y-2">
                          {selectedOrder.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-2 bg-gray-50 rounded"
                            >
                              <div>
                                <p className="font-medium">
                                  {item.product.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {item.product.brand} × {item.quantity}
                                </p>
                              </div>
                              <p className="font-semibold">
                                {(
                                  item.product.price * item.quantity
                                ).toLocaleString("ru-RU")}{" "}
                                ₽
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center text-xl font-bold">
                          <span>Итого:</span>
                          <span className="text-blue-600">
                            {selectedOrder.total.toLocaleString("ru-RU")} ₽
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderHistory;
