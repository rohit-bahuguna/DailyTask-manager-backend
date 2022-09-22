const app = require('./app');
const connnectWithDb = require('./config/db');

// connection with mongonDb
connnectWithDb();

app.listen(process.env.PORT, () => {
	console.log(`server is runing at port ${process.env.PORT}`);
});
