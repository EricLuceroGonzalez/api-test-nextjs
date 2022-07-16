import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-utils";

async function handler(req, res) {
  const eventId = req.query.eventId;
  let clientDB;

  try {
    clientDB = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to db failed.!" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    // add server side  validation
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input.." });
      clientDB.close();
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    // Store in DB:
    let result;
    try {
      result = await insertDocument(clientDB, "comments", newComment);
      newComment.id = result.insertedId;
      res.status(201).json({ message: "Added comment", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed!" });
    }
  }
  if (req.method === "GET") {
    let documents;
    try {
      // Connect and get all comments from db
      documents = await getAllDocuments(clientDB, "comments", {
        _id: -1,
      });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed!" });
    }
    res.status(201).json({ comments: documents });
  }

  clientDB.close();
}

export default handler;
