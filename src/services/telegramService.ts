// Сервис для отправки уведомлений в Telegram
const TELEGRAM_BOT_TOKEN = process.env.VITE_TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.VITE_TELEGRAM_CHAT_ID || "";

class TelegramService {
  private async sendMessage(message: string): Promise<boolean> {
    try {
      if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.warn("Telegram bot token или chat ID не настроены");
        return false;
      }

      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "HTML",
          }),
        },
      );

      return response.ok;
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
      if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.warn("Telegram bot token или chat ID не настроены");
        return false;
      }

      const formData = new FormData();
      formData.append("chat_id", TELEGRAM_CHAT_ID);
      formData.append("document", file, filename);
      if (caption) {
        formData.append("caption", caption);
      }

      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`,
        {
          method: "POST",
          body: formData,
        },
      );

      return response.ok;
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
    const messagesent = await this.sendMessage(message);

    // Затем отправляем файл
    const fileName = `Заказ_OptkaLine_${new Date().toISOString().split("T")[0]}.xlsx`;
    const fileCaption = `📄 Заказ от ${orderData.customerName}`;
    const filesSent = await this.sendDocument(excelFile, fileName, fileCaption);

    return messagesSent && filesSent;
  }
}

export const telegramService = new TelegramService();
