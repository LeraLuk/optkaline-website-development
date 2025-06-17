// Сервис для отправки уведомлений в Telegram
// Заглушки для клиентской части - настоящая интеграция требует серверного API
import * as XLSX from "xlsx";

const TELEGRAM_BOT_TOKEN = "";
const TELEGRAM_CHAT_ID = "";

class TelegramService {
  private createExcelFile(orderData: any): Blob {
    // Создаем данные для Excel
    const excelData = [
      ["ЗАКАЗ OPTKALINE", "", "", "", ""],
      ["Дата заказа:", orderData.orderDate, "", "", ""],
      ["", "", "", "", ""],
      ["ИНФОРМАЦИЯ О КЛИЕНТЕ", "", "", "", ""],
      ["Контактное лицо:", orderData.customerName, "", "", ""],
      ["Компания:", orderData.company, "", "", ""],
      ["Телефон:", orderData.phone, "", "", ""],
      ["Email:", orderData.email, "", "", ""],
      ["Адрес доставки:", orderData.address, "", "", ""],
      ["", "", "", "", ""],
      ["ЗАКАЗАННЫЕ ТОВАРЫ", "", "", "", ""],
      ["№", "Наименование", "Бренд", "Кол-во", "Цена", "Сумма"],
      ...orderData.items.map((item: any, index: number) => [
        index + 1,
        item.product.name,
        item.product.brand,
        item.quantity,
        `${item.product.price.toLocaleString("ru-RU")} ₽`,
        `${(item.product.price * item.quantity).toLocaleString("ru-RU")} ₽`,
      ]),
      ["", "", "", "", "", ""],
      [
        "",
        "",
        "",
        "",
        "ИТОГО:",
        `${orderData.total.toLocaleString("ru-RU")} ₽`,
      ],
    ];

    // Создаем рабочую книгу
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(excelData);

    // Настройка ширины колонок
    ws["!cols"] = [
      { width: 5 }, // №
      { width: 35 }, // Наименование
      { width: 15 }, // Бренд
      { width: 10 }, // Кол-во
      { width: 15 }, // Цена
      { width: 15 }, // Сумма
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Заказ");

    // Создаем Blob
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    return new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  }

  private async sendMessage(message: string): Promise<boolean> {
    try {
      // Имитация отправки сообщения
      console.log("📨 Telegram сообщение:", message);

      // Имитация задержки API
      await new Promise((resolve) => setTimeout(resolve, 500));

      return true;
    } catch (error) {
      console.error("Ошибка отправки в Telegram:", error);
      return false;
    }
  }

  private async sendDocument(
    file: Blob,
    filename: string,
    caption: string = "",
  ): Promise<boolean> {
    try {
      // Имитация отправки файла
      console.log("📎 Telegram файл:", filename, caption);
      console.log("📄 Размер файла:", file.size, "байт");

      // Имитация задержки API
      await new Promise((resolve) => setTimeout(resolve, 800));

      return true;
    } catch (error) {
      console.error("Ошибка отправки файла в Telegram:", error);
      return false;
    }
  }

  async notifyNewRegistration(name: string, phone: string): Promise<boolean> {
    const message = `🆕 <b>Новая регистрация!</b>\n\n👤 <b>Имя:</b> ${name}\n📞 <b>Телефон:</b> ${phone}`;
    return this.sendMessage(message);
  }

  async sendUserRegistration(userData: {
    name: string;
    company: string;
    phone: string;
  }): Promise<boolean> {
    const message = `🆕 <b>НОВАЯ РЕГИСТРАЦИЯ OPTKALINE</b>

👤 <b>ФИО:</b> ${userData.name}
🏢 <b>Компания:</b> ${userData.company}
📞 <b>Телефон:</b> ${userData.phone}`;

    return this.sendMessage(message);
  }

  async notifyNewOrder(orderData: any): Promise<boolean> {
    try {
      // Создаем Excel файл
      const excelFile = this.createExcelFile(orderData);
      const fileName = `Заказ_OptkaLine_${new Date().toISOString().split("T")[0]}_${Date.now()}.xlsx`;

      // Формируем сообщение для Telegram
      const caption = `📦 НОВЫЙ ЗАКАЗ OPTKALINE

👤 Клиент: ${orderData.customerName}
🏢 Компания: ${orderData.company}
📞 Телефон: ${orderData.phone}
📧 Email: ${orderData.email}
📍 Адрес: ${orderData.address}

📦 Товаров: ${orderData.items.length} шт.
💰 Сумма: ${orderData.total.toLocaleString("ru-RU")} ₽

📋 Подробности в Excel файле`;

      // Отправляем файл с подписью
      const success = await this.sendDocument(excelFile, fileName, caption);

      if (success) {
        // Дополнительно скачиваем файл локально
        const url = URL.createObjectURL(excelFile);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      return success;
    } catch (error) {
      console.error("Ошибка создания и отправки заказа:", error);
      return false;
    }
  }
}

export const telegramService = new TelegramService();
