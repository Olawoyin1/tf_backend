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
    interest: {
      type: String,
      required: [true, 'Interest is required'],
      enum: ['business', 'talent', 'both', 'practising'],
    },
    company: {
      type: String,
      default: null,
      trim: true,
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
waitlistSchema.pre('save', async function () {
  if (this.isNew) {
    const count = await mongoose.model('Waitlist').countDocuments();
    this.position = count + 1;
  }
});

module.exports = mongoose.model('Waitlist', waitlistSchema);
