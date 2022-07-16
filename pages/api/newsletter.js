import { async } from "@firebase/util";
import { connectDatabase, insertDocument } from "../../helpers/db-utils";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }
    // Connection
    let clientDB;
    try {
      clientDB = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connection to database failed" });
      return;
    }

    let doc;
    try {
      doc = await insertDocument(clientDB, "newsletter", { email: userEmail });
      clientDB.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting to database failed" });
    }

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
