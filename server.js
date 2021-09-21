const express = require('express');
const app = express();

app.use(express.static('public'));
app.use('/files', express.static('files'));

app.get('/', (req, res) => res.send('Server is up.'));

module.exports = () => {
	app.listen(3000);
};