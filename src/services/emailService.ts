// Сервис для отправки email уведомлений
class EmailService {
  private readonly targetEmail = "valerialukomskaa@gmail.com";

  async sendRegistrationNotification(
    name: string,
    phone: string,
  ): Promise<boolean> {
    try {
      // Формируем данные для отправки
      const emailData = {
        to: this.targetEmail,
        subject: "Новая регистрация в OptkaLine",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">🆕 Новая регистрация в OptkaLine</h2>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0;"><strong>👤 Имя:</strong> ${name}</p>
              <p style="margin: 0;"><strong>📞 Телефон:</strong> ${phone}</p>
            </div>
            <p style="color: #64748b; font-size: 12px;">
              Сообщение отправлено автоматически из системы OptkaLine
            </p>
          </div>
        `,
      };

      // В реальном проекте здесь будет API вызов к email сервису
      // Например: await fetch('/api/send-email', { method: 'POST', body: JSON.stringify(emailData) })

      // Для демонстрации логируем в консоль
      console.log("📧 Email отправлен:", emailData);

      // Имитация задержки отправки
      await new Promise((resolve) => setTimeout(resolve, 300));

      return true;
    } catch (error) {
      console.error("Ошибка отправки email:", error);
      return false;
    }
  }
}

export const emailService = new EmailService();
