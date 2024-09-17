const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

// Инициализация Express приложения
const app = express();
const port = 3000;
app.use(
  cors({
    origin: [
      'https://snejannatumanova.github.io/site_Stom/',
      'http://localhost:3000',
      'http://127.0.0.1:5500', // Добавьте этот источник
    ],
    methods: ['GET', 'POST'],
  })
);

app.use(bodyParser.urlencoded({ extended: true })); // Для application/x-www-form-urlencoded
app.use(bodyParser.json());

// Обрабатываем запрос на отправку формы
app.post('/sendmail', (req, res) => {
  const { name, phone, message } = req.body;
  console.log('Получен POST-запрос на /sendmail с данными:', req.body);
  console.log('Получен POST-запрос на /sendmail');
  console.log('Заголовки запроса:', req.headers);
  console.log('Тело запроса (req.body):', req.body);

  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru', // SMTP сервер Mail.ru
    port: 587, // Порт для STARTTLS (587 для Mail.ru)
    secure: false, // Используйте false для порта 587
    auth: {
      user: 'Sneganna.snow@mail.ru', // Ваш email на Mail.ru
      pass: 'zYNGNjHB9Vmj1GEcaSbN', // Ваш пароль от Mail.ru
    },
  });

  // Пример использования транспортера для отправки email
  const mailOptions = {
    from: 'Sneganna.snow@mail.ru', // От кого
    to: 'snegannatumanova@gmail.com', // Кому
    subject: message ? 'Новое сообщение с сайта' : 'Запись на приём',
    text: message
      ? `Имя клиента: ${name}\nТелефон клиента: ${phone}\nСообщение о сути обращения: ${message}`
      : `Имя клиента: ${name}\nТелефон клиента: ${phone}\n Ожидает звонка для записи на приём`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      // Отправляем клиенту ответ об ошибке
      res.status(500).send('Ошибка отправки сообщения');
    } else {
      console.log('Письмо отправлено: ' + info.response);
      // Отправляем клиенту успешный ответ
      res.status(200).send('Сообщение успешно отправлено');
    }
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
