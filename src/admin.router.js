const { default: AdminBro } = require('admin-bro');
const { buildRouter } = require('admin-bro-expressjs');
const { buildAuthenticatedRouter } = require('admin-bro-expressjs');
const express = require('express');
const argon2 = require('argon2');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const AdminBroExpress = require('admin-bro-expressjs');

const { Post } = require('./Posts/Posts.entity');


/**
 * @param {AdminBro} admin
 * @return {express.Router} router
 */
const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@idea.com',
  password: process.env.ADMIN_PASSWORD || 'idea',
};

const buildAdminRouter = (admin) => {
  const router = buildAuthenticatedRouter(admin, {
    cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
    cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersecret-and-long-password-for-a-cookie-in-the-browser',
    authenticate: async (email, password) => {
      if (email === ADMIN.email && password === ADMIN.password) {
        return ADMIN;
      }
      return null;
    },

  });
  return router;
};
module.exports = buildAdminRouter;
