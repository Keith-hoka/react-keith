import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://Keith-Next:MiMNk0yG6uCkRbn2@keithcluster.qhg7v.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupCollection = db.collection("meetups");

    const result = await meetupCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "Meetup inserted successfully!" });
  }
}

export default handler;
