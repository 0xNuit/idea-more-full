const mongoose = require('mongoose');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const dompurify = createDomPurify(new JSDOM().window);

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  section: [{ type: String, enum: ['وسائل وهدايا دعائية', 'مجسمات واعمدة اعلانية', 'لوحات اعلانية', 'لوحات ارشادية', 'طباعة(دجيتال-اوفست)', 'تصميم جرافك', 'اعمال كلادينج', 'اكشاك القهوة', 'اعمال استيكرات'] }],
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  profilePhotoLocation: {
    type: String,
  },
  formData: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    // required: true,
    unique: true,
  },
});

// eslint-disable-next-line func-names
postSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }


  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = { postSchema, Post };
