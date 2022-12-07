const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

const CompanyPosts = require('./Posts/Posts.admin');
const enCompanyPosts = require('./Posts/enPosts.admin');


/** @type {import('admin-bro').AdminBroOptions} */
const options = {
  resources: [CompanyPosts, enCompanyPosts],
  branding: {
    logo: '/uploads/favicon.png',
    companyName: 'IDEA',
  },
};

module.exports = options;
