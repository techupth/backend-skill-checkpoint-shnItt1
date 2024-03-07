import { MongoClient } from "mongodb";

const connectionString = "mongodb://127.0.0.1:27017";

export const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
});
// กำหนดให้ DB ที่จะใช้งาน
export const db = client.db("question-web");
