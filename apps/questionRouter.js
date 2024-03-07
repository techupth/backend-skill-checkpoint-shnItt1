import { Router, query } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const questionRouter = Router();
const collection = db.collection("questions");

questionRouter.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    const query = {};

    if (category) {
      query.category = new RegExp(category, "i");
    }

    const questions = await collection.find(query).limit(5).toArray();
    return res.json({ data: questions });
  } catch (error) {
    return res.json({ message: `Request Failed...` });
  }
});

/*questionRouter.get("/:questionId", async (req, res) => {
  const collection = db.collection("questions");
  const questionId = ObjectId(req.params.questionId);

  try {
    return res.json({
      message: `🟢 Complete fetching Data`,
      data: questionId._id,
    });
  } catch (error) {
    return res.status(404).json("⚠️ Cannot fetching Data");
  }
});*/

questionRouter.post("/", async (req, res) => {
  try {
    const questionData = { ...req.body };
    const questions = await collection.insertOne({ ...questionData });
    const questionId = questions.insertedId;

    return res.json({
      message: `🟢 Question No.${questionId} has been created !`,
    });
  } catch (error) {
    return res.status(404).json("⚠️ Create a Question Failed...");
  }
});

questionRouter.put("/:questionId", async (req, res) => {
  try {
    const questionId = new ObjectId(req.params.questionId);
    const newQuestionData = { ...req.body };

    await collection.updateOne(
      {
        _id: questionId,
      },
      { $set: newQuestionData }
    );

    return res.json({
      message: `🟢 message: ${questionId} has been updated !`,
    });
  } catch (error) {
    return res.status(404).json("⚠️ Edit a Question Failed...");
  }
});

questionRouter.delete("/:questionId", async (req, res) => {
  try {
    const questionId = new ObjectId(req.params.questionId);

    await collection.deleteOne({
      _id: questionId,
    });

    return res.json({
      message: `🟢 message: ${questionId} has been updated !`,
    });
  } catch (error) {
    return res.status(404).json("⚠️ Question has been deleted !");
  }
});

export default questionRouter;
