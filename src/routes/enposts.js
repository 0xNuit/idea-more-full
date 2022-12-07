/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable func-names */
const express = require('express');

const app = express();
const request = require('request');

const mongodb = require('mongodb');

const slugify = require('slugify');

const createDomPurify = require('dompurify');

const { JSDOM } = require('jsdom');

const dompurify = createDomPurify(new JSDOM().window);
// const mongoose = require('mongoose')
const router = express.Router();
const multer = require('multer');

const { enPost } = require('../Posts/enPosts.entity'); //

// define storage for the images

const storage = multer.diskStorage({
  // destination for files
  // eslint-disable-next-line no-shadow
  destination(request, file, callback) {
    callback(null, './uploads'); // '../s/src/images'
  },

  // add back the extension
  // eslint-disable-next-line no-shadow
  filename(request, file, callback) {
    callback(null, file.originalname); // `${file.originalname}-${Date.now()}` // file.fieldname + '-' + Date.now() /old/ Date.now() + file.originalname
  },
});


// eslint-disable-next-line consistent-return
const fileFilter = function (req, file, cb) {
  const allowedTypes = ['image/jpeg', 'image/png', 'iamge/gif'];

  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('Wrong file type');
    error.code = 'LIMIT_FILE_TYPES';
    return cb(error, false);
  }
  cb(null, true);
};

// upload parameters for multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});



// Get Posts < mongoose version >
router.get('/', async (req, res) => {
  const posts = await enPost.find({}, (err, posts) => {
    res.send(posts);
  }); // .sort({ createdAt: 'desc' }); // Post.find({})
});

// get slug  <  mongoose version >
router.get('/:slug', async (req, res) => {
  const posts = await enPost.findOne({ slug: req.params.slug });
  res.send(posts);
});

// INSERT < mongoose version >
router.post('/', upload.single('file'), async (req, res) => {
  if (req.file === undefined) {
    try {
      const posts = new enPost({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
      });

      posts.save((err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.send('Data inserted');
        }
      });
    } catch (err) {
      console.log('~ err', err);
    }
  } else {
    try {
      const posts = new enPost({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
        formData: req.file.filename,
      });

      posts.save((err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.send('Data inserted');
        }
      });
    } catch (err) {
      console.log('~ err', err);
    }
  }
});

// put req
router.put('/:slug', upload.single('file'), async (req, res) => {
  console.log(req.file);
  const filter = { slug: req.params.slug };
  const update = {
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
    slug: slugify(req.body.title, { lower: true, strick: true }), // to make slug get updated automatically when title is changed
  // sanitizedHtml: dompurify.sanitize(marked(req.body.markdown)) // ...
  };
  if (req.file === undefined) {
    try {
      console.log('firstsssssss');
      const posts = await enPost.findOneAndUpdate(filter, update, {
        new: true, // returnOriginal: false
      // upsert: true // if no document matches filter, MongoDB will insert one by combining filter and update.
      });
      // await posts.save();
      res.status(201).send('Post updated successfully'); // {}
    } catch (err) {
      console.log('--err', err);
    }
  } else {
    try {
      console.log('seconsssssssssse');
      const updateFile = {
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
        slug: slugify(req.body.title, { lower: true, strick: true }),
        // sanitizedHtml: dompurify.sanitize(marked(req.body.markdown)) // ...
        formData: req.file.filename,
      };
      const posts = await enPost.findOneAndUpdate(filter, updateFile, {
        new: true, // returnOriginal: false
        // upsert: true // if no document matches filter, MongoDB will insert one by combining filter and update.
      });
      // await posts.save();
      res.status(201).send('Post updated successfully'); // {}
    } catch (err) {
      console.log('--err', err);
    }
  }
});


app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_TYPES') {
    res.status(422).json({ error: 'Only images are allowed' });
    return;
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    res.status(422).json({ error: 'too large' });
  }
});
// Delete Post delete req based on id => '/:id'  .deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
router.delete('/:slug', async (req, res) => {
  const posts = await enPost.deleteOne({ slug: req.params.slug });
  res.status(200).send('Post has been deleted successfully');
});


module.exports = router;
