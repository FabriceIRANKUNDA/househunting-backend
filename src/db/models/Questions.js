import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({

title: {
    type: String,
    required:[true,"question title is required"]
},
category:{
    type: String,
    required:[true,"question category is required"]

},
choices: [  {
    description:{
        type: String,
        required:[true,"Choice description is required"]},
    answer: {
        type: Boolean,
        required:[true,"Choice answer is required"]}
  }],
  is_visible:{
      type:Boolean,
    default:true},
  registeredBy:{
      type:String,
      default:"603d5620774f845394831fd0"
  }
});

const Questions = mongoose.model("Questions",questionSchema);
export default Questions;
