function handler(req, res) {
  const eventId = req.query.eventId;
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
      return;
    }
    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    console.log(newComment);
    res.status(201).json({ message: "Added comment", comment: newComment });
  }
  if (req.method === "GET") {
    console.log('inhere GET method');
    const dummyList = [
      {
        id: "idA",
        name: "Test Name",
        email: "emal@mail.cm",
        text: "Test comment A",
      },
      {
        id: "idB",
        name: "Test Lastana",
        email: "emal@outlook.cm",
        text: "Test comment B",
      },
    ];
    res.status(201).json({ comments: dummyList });
  }
}

export default handler;
