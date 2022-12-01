import mongoose from "mongoose";

const houseSchema = new mongoose.Schema(
  {
    bedRooms: {
      type: Number,
      required: [true, "A house must have a rooms"],
    },
    bathRooms: {
      type: Number,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    internet: [
      {
        type: String,
        enum: ["CanalBox", "Liquid", "MTN", "None"],
        default: ["None"],
      },
    ],
    available: {
      type: Boolean,
      default: true,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    priceMonthly: {
      type: Number,
      required: [true, "A house must have a price"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val <= this.price;
        },
        message: "Discount price ({ VALUE }) should be below regular price",
      },
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A house must have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      select: false,
      default: Date.now(),
    },
    visible: {
      type: Boolean,
      default: true,
    },
    location: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
    },
    ownerInfo: {
      phone: {
        type: String,
        required: [true, "Owner's phone number is required"],
      },
      names: String,
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

houseSchema.index({ price: 1, ratingsAverage: -1 });
houseSchema.index({ location: "2dsphere" });

houseSchema.pre(/^find/, function (next) {
  this.find({ visible: { $ne: false }, available: { $ne: false } });
  next();
});

houseSchema.pre(/^find/, function (next) {
  this.populate({
    path: "postedBy",
  });
  next();
});

const House = mongoose.model("House", houseSchema);
export default House;
