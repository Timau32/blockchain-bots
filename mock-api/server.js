const jsonServer = require('json-server');
const auth = require('json-server-auth');
const path = require('path');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const SECRET = 'super-secret';
const ACCESS_TOKEN_EXPIRES = 3600;
const REFRESH_TOKEN_EXPIRES = 86400;

app.use(middlewares);
const jsonParser = bodyParser.json();

app.post('/login', jsonParser, (req, res) => {
	const { email, password } = req.body;
	const user = router.db.get('users').find({ email }).value();

	if (!user || !bcrypt.compareSync(password, user.password)) {
		return res.status(401).json({ error: 'Неверный email или пароль' });
	}

	const payload = { sub: user.id, name: user.email };

	const access_token = jwt.sign(payload, SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
	const refresh_token = jwt.sign(payload, SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES });

	res.json({
		access_token,
		refresh_token,
		access_expires: ACCESS_TOKEN_EXPIRES,
		refresh_expires: REFRESH_TOKEN_EXPIRES,
		token_type: 'Bearer',
	});
});

app.post('/refresh', jsonParser, (req, res) => {
	const { refresh_token } = req.body;
	if (!refresh_token) return res.status(401).json({ error: 'Отсутствует токен обновления' });

	try {
		const payload = jwt.verify(refresh_token, SECRET);

		const newAccessToken = jwt.sign({ sub: payload.sub, name: payload.name }, SECRET, {
			expiresIn: ACCESS_TOKEN_EXPIRES,
		});

		res.json({
			access_token: newAccessToken,
			access_expires: ACCESS_TOKEN_EXPIRES,
			token_type: 'Bearer',
		});
	} catch (err) {
		res.status(403).json({ error: 'Неверный токен обновления' });
	}
});

app.post('/register', jsonParser, async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: 'Необходимо указать email и пароль' });
	}

	const userExists = router.db.get('users').find({ email }).value();

	if (userExists) {
		return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = {
		id: Date.now(),
		email,
		password: hashedPassword,
	};

	router.db.get('users').push(newUser).write();
	const payload = { sub: newUser.id, name: newUser.email };

	const access_token = jwt.sign(payload, SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
	const refresh_token = jwt.sign(payload, SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES });

	res.status(201).json({
		access_token,
		refresh_token,
		access_expires: ACCESS_TOKEN_EXPIRES,
		refresh_expires: REFRESH_TOKEN_EXPIRES,
		token_type: 'Bearer',
	});
});

const rules = auth.rewriter({
	users: 600,
	bots: 666,
	stats: 666,
});

app.db = router.db;
app.use(rules);
app.use(auth);
app.use(router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`JSON Server запущен: http://localhost:${PORT}`);
});
