const express = require('express');
const { default: AdminBro } = require('admin-bro');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
const buildAdminRouter = require('./admin.router');
const options = require('./admin.options');
const fallback = require("express-history-api-fallback");


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

const posts = require('./routes/posts');
const enposts = require('./routes/enposts');

app.use('/api/posts', posts);
app.use('/api/enposts', enposts);

const admin = new AdminBro(options);
  const router = buildAdminRouter(admin);



// Handle production
if (process.env.NODE_ENV === 'production') {
 // Static folder
 // https://github.comapp.use(express.static(__dirname + '/public/'));
 // Handle SPA
 const root = `${__dirname}/public`;
app.use(express.static(root));

// history fallback
app.use(fallback('index.html', { root }));
 //app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

 const run = async () => {
  await mongoose.connect('mongodb+srv://A1:passon@passon.m1dnd.mongodb.net/passes?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  PORT = process.env.PORT
  app.listen(process.env.PORT, () => console.log(
    `Example app listening at http://UrWebsite:${PORT}`,
  ));
};

module.exports = run;

} else {

const run = async () => {
  const port = 5400;

  await mongoose.connect('mongodb+srv://A1:passon@passon.m1dnd.mongodb.net/passes?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.listen(port, () => console.log(
    `Example app listening at http://localhost:${port}`,
  ));
};

module.exports = run;

}




