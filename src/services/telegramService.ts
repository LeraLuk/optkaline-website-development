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

  async notifyNewOrder(orderData: any, excelFile: Blob): Promise<boolean> {
    const message = `📦 <b>Новый заказ!</b>\n\n👤 <b>Клиент:</b> ${orderData.customerName}\n🏢 <b>Компания:</b> ${orderData.company}\n📞 <b>Телефон:</b> ${orderData.phone}\n📧 <b>Email:</b> ${orderData.email}\n💰 <b>Сумма:</b> ${orderData.total} ₽`;

    // Сначала отправляем сообщение
    const messageSent = await this.sendMessage(message);

    // Затем отправляем файл
    const fileName = `Заказ_OptkaLine_${new Date().toISOString().split("T")[0]}.xlsx`;
    const fileCaption = `📄 Заказ от ${orderData.customerName}`;
    const fileSent = await this.sendDocument(excelFile, fileName, fileCaption);

    return messageSent && fileSent;
  }
}

export const telegramService = new TelegramService();
