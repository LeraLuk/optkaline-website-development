// Сервис для отправки уведомлений в Telegram
// Заглушки для клиентской части - настоящая интеграция требует серверного API
const TELEGRAM_BOT_TOKEN = "";
const TELEGRAM_CHAT_ID = "";

class TelegramService {
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

  async notifyNewOrder(orderData: any, excelFile?: Blob): Promise<boolean> {
    if (excelFile) {
      // Отправляем Excel файл
      const fileName = `Заказ_OptkaLine_${new Date().toISOString().split("T")[0]}.xlsx`;
      const caption = `📦 Новый заказ от ${orderData.customerName} (${orderData.company})`;

      return this.sendDocument(excelFile, fileName, caption);
    }

    // Fallback: отправляем текстовое сообщение если файл не предоставлен
    const itemsTable = orderData.items
      .map(
        (item: any, index: number) =>
          `${index + 1}. ${item.name}\n   Цена: ${item.price.toLocaleString("ru-RU")} ₽\n   Кол-во: ${item.quantity} шт.\n   Итого: ${(item.price * item.quantity).toLocaleString("ru-RU")} ₽`,
      )
      .join("\n\n");

    const message = `📦 <b>Новый заказ!</b>

👤 <b>Клиент:</b> ${orderData.customerName}
🏢 <b>Компания:</b> ${orderData.company}
📞 <b>Телефон:</b> ${orderData.phone}
📧 <b>Email:</b> ${orderData.email}

📋 <b>ТОВАРЫ:</b>
${itemsTable}

💰 <b>ОБЩАЯ СУММА: ${orderData.total.toLocaleString("ru-RU")} ₽</b>

📩 Отправлено пользователю @leradeen`;

    return this.sendMessage(message);
  }
}

export const telegramService = new TelegramService();
