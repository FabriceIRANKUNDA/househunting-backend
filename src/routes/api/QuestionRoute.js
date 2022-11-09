import express from "express";
import Validator from "../../middlewares/Validator";
import QuestionController from "../../controllers/QuestionController";
import verifyAccess from "../../middlewares/verifyAccess";
import verifyToken from "../../middlewares/verifyToken";

const questionRoute = express.Router();

// add new question
questionRoute.post(
  "/add",
  Validator.newQuestionRules(),
  Validator.validateInput,
  verifyToken,
  verifyAccess('admin'),
  QuestionController.addQuestion
);// add new question
questionRoute.post(
  "/add/manually",
  // Validator.newQuestionRules(),
  // Validator.validateInput,
  // verifyToken,
  // verifyAccess('admin'),
  QuestionController.addQuestionManually
);

// Get all available Questions
questionRoute.get(
    "/",
    verifyToken,
    verifyAccess('admin'),
    QuestionController.getAllQuestion
  );

  // Get One available Questions
  questionRoute.get(
    "/:questionId",
    verifyToken,
    verifyAccess('admin'),
    QuestionController.getSpecificQuestion
  );

  
// delete one available Questions
questionRoute.delete(
    "/:questionId",
    verifyToken,
    verifyAccess('admin'),
    QuestionController.deleteQuestion
  );
  
  // Update one available Questions
  questionRoute.patch(
      "/:questionId",
      verifyToken,
      verifyAccess('admin'),
      QuestionController.updateQuestion
    );


export default questionRoute;
