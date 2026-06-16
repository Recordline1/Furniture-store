'use server'; 

import { CheckoutFormValues } from '../model/checkoutSchema';

export const sendTelegramMessage = async (
  data: CheckoutFormValues,
  items: any[],
  totalPrice: number
) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('Не настроены ключи Telegram в .env');
    return;
  }

  
  const itemsList = items
    .map((item) => `▫️ ${item.name} (x${item.quantity}) - Rs. ${item.price.toLocaleString()}`)
    .join('\n');

  
  const message = `
🛒 <b>Новый заказ!</b>

👤 <b>Имя:</b> ${data.fullName}
📞 <b>Телефон:</b> ${data.phone}
📧 <b>Email:</b> ${data.email}
🚚 <b>Доставка:</b> ${data.deliveryMethod}
📍 <b>Город:</b> ${data.city || '-'}
🏠 <b>Адрес:</b> ${data.address || '-'}
💳 <b>Оплата:</b> ${data.payment}
💬 <b>Комментарий:</b> ${data.comment || '-'}

📦 <b>Товары:</b>
${itemsList}

💰 <b>Итого: Rs. ${totalPrice.toLocaleString()}</b>
  `;

  
  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML', 
      }),
    });

    if (!response.ok) {
      console.error('Ошибка при отправке в Telegram:', await response.text());
    }
  } catch (error) {
    console.error('Сбой сети при отправке в Telegram:', error);
  }
};