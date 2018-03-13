import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
// https://www.npmjs.com/package/express-session
import * as session from 'express-session';
// https://www.npmjs.com/package/connect-redis
import * as connectRedis from 'connect-redis';

import login from './api/login';
import signup from './api/sign-up';

console.log('__dirname : ',__dirname);
const index = require(path.join(__dirname,'..','src','views','index.js'));
console.log('did we got something ', index);
// const users = require('../routes/users');
// import user from './routes/app-user-info';

const app = express();
const RedisStore = connectRedis(session);
const sessionOptions = {
	// @ts-ignore
	store: new RedisStore({
		host: 'localhost',
		port: 6379,
		logErrors: function (...args) {
			console.error(...args);
		}
	}),
	resave: false,
	rolling: false,
	saveUninitialized: false,
	secret: '@CCE$$',
	cookie: {
		maxAge: 7 * 24 * 60 * 1000, // Enabling persistance cookies
		sameSite: true,
		secure: false // as it is development environment.
	}
};

const sessionMiddleware = session(sessionOptions);

// view engine setup
app.set('views', path.join(__dirname, '../', 'dist', 'views'));
// app.set('view engine', 'jade');
// @ts-ignore
app.use(sessionMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(path.join('../', __dirname, 'public')));
app.use(express.static(path.join(__dirname,'..','dist','views')));

app.use('/', index);
app.use('/login', login);
app.use('/signup', signup);

app.get('/echo', function (req, res) {
	res.send(req.query);
});

// BASED on env we are showing stacktrace.
// eslint-disable-next-line
app.use(function (err, req, res, next) {
	let code = err.status || 500;
	if(err.message === 'validation error') {
		// Error is joi validation error
		err.isJoi = true;
		err.message = err
			.errors
			.reduce((acc, nextErrorMessageObj) => {
				let msg = nextErrorMessageObj.messages.join(',');
				if(!acc) {
					return `${msg} `;
				}
				return `${acc} , ${msg} `;
			}, '');
	}

	res.set('connection', 'close');
	res
		.status(code)
		.send({
			code,
			status: 'failure',
			stack: err.stack,
			message: err.message
		});
});

export default app;