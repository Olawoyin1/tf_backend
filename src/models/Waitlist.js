const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    role: {
      type: String,
      required: [true, 'Role/category is required'],
      enum: [
        'athlete',
        'coach',
        'agent',
        'scout',
        'club',
        'brand',
        'journalist',
        'analyst',
        'medical',
        'fan',
        'other',
      ],
    },
    sport: {
      type: String,
      default: null,
      trim: true,
    },
    country: {
      type: String,
      default: null,
      trim: true,
    },
    referralSource: {
      type: String,
      default: null,
    },
    confirmationSent: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Number,
    },
  },
  { timestamps: true }
);

// Auto-assign waitlist position before saving
waitlistSchema.pre('save', async function (next) {
  if (this.isNew) {
    const count = await mongoose.model('Waitlist').countDocuments();
    this.position = count + 1;
  }
  next();
});

module.exports = mongoose.model('Waitlist', waitlistSchema);
