import Questions from "../db/models/Questions";
import removeDuplicateObj from "./removeDuplicateObjects";
import shuffle from "./shuffleArrayRandomly";

const generateRandomTestQuestions = async () => {
  const randomTheoryQuestions = await Questions.aggregate([
    { $match: { $and: [{ category: "theory" }, { is_visible: true }] } },
    { $sample: { size: 30 } },
  ]);

  const randomImageQuestions = await Questions.aggregate([
    { $match: { $and: [{ category: "practical" }, { is_visible: true }] } },
    { $sample: { size: 14 } },
  ]);

  const refinedTheoryQuestions = removeDuplicateObj(
    randomTheoryQuestions,
    (obj) => obj._id
  );
  const refinedImageQuestions = removeDuplicateObj(
    randomImageQuestions,
    (obj) => obj._id
  );
  if (refinedTheoryQuestions.length < 13 || refinedImageQuestions.length < 7)
    generateRandomTestQuestions();

  const neededTheoryQuestions = refinedTheoryQuestions.slice(0, 13);

  const neededImageQuestions = refinedImageQuestions.slice(0, 7);

  const combinedQuestions = neededImageQuestions.concat(neededTheoryQuestions);

  const finalisedQuestions = shuffle(combinedQuestions);

  return finalisedQuestions;
};

export default generateRandomTestQuestions;
