const express = require('express');
const { engine } = require('express-handlebars');
const dotenv = require('dotenv');
const path = require('path');
require('colors');
const connectDb = require('../config/db');
const bcrypt = require('bcrypt');
const errorHandler = require('./midlewares/errorHandler');
const asyncHandler = require('express-async-handler');
const authMidleware = require('./midlewares/authMidleware');
const RoleModel = require('./models/RoleModel');

const configPath = path.join(__dirname, '..', 'config', '.env');
dotenv.config({ path: configPath });
const UserModel = require('./models/UsersModel');
const jwt = require('jsonwebtoken');
const sendEmail = require('./services/emailService');

const app = express();

app.use(express.static('public'));

// Set template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'backend/views');

app.use(express.urlencoded({ extended: false })); // обробляти форми
app.use(express.json()); // як і app.use(express.urlencoded({extended: false})), але для json

app.use('/api/v1', require('./routes/moviesRouter')); //вказуємо що будемо виконувати і де всі роути прописані

// Set routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/send', async (req, res) => {
  try {
    res.render('send', {
      name: req.body.userName,
      email: req.body.userEmail,
      message: 'success',
    });

    await sendEmail(req.body);
  } catch (error) {
    console.log(error.message);
  }
});

//реєстрація - це збереження користувача в базі данних
//аутентифікація - це перевірка данних, які надав користувач з тим, що є в базі данних
//авторизація - це перевірка прав доступу виконувати на сайті певні дії або мати доступ до певних ресурсів сайту
//logOut - вихід із застосунку

app.post(
  '/register',
  (req, res, next) => {
    console.log('Спрацював ДЖОИ');
    next();
  },
  asyncHandler(async (req, res) => {
    //1.Отримання даних від користувача
    const { email, password } = req.body;
    //2.Валідація отриманних даних
    if (!email || !password) {
      res.status(400);
      throw new Error('provide all required fields');
    }
    //3.Перевірка чи є користувач у базі данних
    const candidat = await UserModel.findOne({ email });

    //4.Якщо знайшли, повідомляємо "Такий користувач вже існує"
    if (candidat) {
      res.status(400);
      throw new Error('User already exists');
    }
    //5.Якщо не знайшли - хешуємо пароль
    const hashPassword = bcrypt.hashSync(password, 5);
    const userRole = await RoleModel.findOne({ value: 'ADMIN' });
    //6.Зберігаємо користувача у базі даних
    const newUser = await UserModel.create({
      ...req.body,
      password: hashPassword,
      roles: [userRole.value],
    });
    if (!newUser) {
      res.status(409);
      throw new Error('Unable to save database');
    }
    return res
      .status(201)
      .json({ data: { name: newUser.name, email: newUser.email } });
  })
);

app.post(
  '/login',
  asyncHandler(async (req, res) => {
    //1.Отримання даних від користувача
    const { email, password } = req.body;

    //2.Валідація отриманних даних
    if (!email || !password) {
      res.status(400);
      throw new Error('provide all required fields');
    }
    //3.Шукаємо користувача по имейлу
    const user = await UserModel.findOne({ email });

    //4. Якщо не знайшли фбо не розшифрували пароль - "Не вірний логін обо пароль"
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!user || !isValidPassword) {
      res.status(400);
      throw new Error('Invalid login or password');
    }
    //5. Якщо знайшли і розшифровали пароль то видаєм токен
    const friends = ['pasha', 'oleg', 'andriy', 'alyona', 'julia'];

    user.token = generateToken({ friends, id: user._id });

    const userWithToken = await user.save();
    if (!userWithToken) {
      res.status(400);
      throw new Error('Unable to save token');
    }
    return res
      .status(200)
      .json({ data: { token: user.token, email: user.email } });
    //6. Слідкуємо за валідністю токена (рефреш токен)
  })
);

app.get(
  '/logout',
  authMidleware,
  asyncHandler(async (req, res) => {
    const id = req.user;
    await UserModel.findByIdAndUpdate(id, { token: null });
    res.json({ message: 'logout succes' });
  })
);

function generateToken(data) {
  const payload = { ...data };
  return jwt.sign(payload, 'pizza', { expiresIn: '5h' });
}

app.use('*', (req, res, next) => {
  //якщо невірна адреса
  res.status(404);
  res.json({
    code: 404,
    message: 'not found',
  });
  next();
});

app.use(errorHandler);

connectDb();
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT}`.green.bold.italic
  );
});
