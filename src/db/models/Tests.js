import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  testCode: {
    type: String,
    unique: true,
  },
  testMarks: {
    type: String,
    default: "",
  },
  isAttempted: {
    type: Boolean,
    default: false,
  },
  smsCode: String,
  timeSpent: String,
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  attemptedOn: {
    type: Date,
  },
  questionsAndAnswers: [
    {
      questionId: {
        type: mongoose.Schema.ObjectId,
        ref: "Questions",
      },
      userChoice: {
        type: String,
        default: "",
      },
    },
  ],
});

testSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "firstname lastName phone",
  }).populate({
    path: "questionsAndAnswers.questionId",
  });
  next();
});

const Tests = mongoose.model("Tests", testSchema);
export default Tests;
