const mongoose = require('mongoose');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const dompurify = createDomPurify(new JSDOM().window);

const enpostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  section: [{ type: String, enum: ['A', 'B', 'C'] }],
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
enpostSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }


  next();
});

const enPost = mongoose.model('enPost', enpostSchema);

module.exports = { enpostSchema, enPost };
