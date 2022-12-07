const express = require('express');
const aws = require('aws-sdk');
const { default: AdminBro } = require('admin-bro');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');
const buildAdminRouter = require('./admin.router');
const options = require('./admin.options');

const app = express();

aws.config.region = 'eu-central-1';
aws.config.accessKeyId = 'AKIAYDTEFI5HCSFSA34U';
aws.config.secretAccessKey = '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';
const S3_BUCKET = 'ideastestingbucket';

app.use(bodyParser.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

const posts = require('./routes/posts');
const enposts = require('./routes/enposts');

app.use('/api/posts', posts);
app.use('/api/enposts', enposts);

const admin = new AdminBro(options);
const router = buildAdminRouter(admin);

app.use(admin.options.rootPath, router);

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  //app.use(express.static(__dirname + '/public/'));
  // Handle SPA
  //app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index-ar.html'));

  const run = async () => {
    await mongoose.connect('mongodb+srv://partner:partner@idea.k7t0bow.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(process.env.PORT, () => console.log(
      `Example app listening at http://UrWebsite:${process.env.PORT}`,
    ));
  };

  module.exports = run;
} else {
  app.use(express.static(__dirname + '/public/'));
  //Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index-ar.html'));
  const run = async () => {

    const port = 80;

    await mongoose.connect('mongodb+srv://partner:partner@idea.k7t0bow.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }); 

    app.listen(port, () => console.log(
      `Example app listening at http://localhost:${port}`,
    )); 
  };

  module.exports = run;
}
