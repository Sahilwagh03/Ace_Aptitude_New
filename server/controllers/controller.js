import Questions from "../models/questionSchema.js";
import questions, { answers } from "../database/data.js";

/** get all questions */
export async function getQuestions(req, res) {
  try {
    const q = await Questions.find();
    res.json(q);
  } catch (error) {
    res.json({ error });
  }
}

/** insert all questions */
export async function insertQuestions(req, res) {
  try {
    await Questions.insertMany([{ questions, answers }]);
    res.json({ msg: "Data Saved Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
}

/** Delete all Questions */
export async function dropQuestions(req, res) {
  res.json("questions api delete request");
}

/** get all result */
export async function getResult(req, res) {
  res.json("result api get request");
}

/** post all result */
export async function storeResult(req, res) {
  res.json("result api post request");
}

/** delete all result */
export async function dropResult(req, res) {
  res.json("result api delete request");
}
