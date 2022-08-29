import express from "express";
import { Request, Response } from "express";
import { MongoClient, ObjectId } from "mongodb";

const router = express.Router();
router.use(express.json());
const client = new MongoClient(
  "mongodb+srv://admin:Book54321@cluster0.qxenmyc.mongodb.net/Restauracja"
);

router.get("/", async (req: Request, res: Response) => {
  await client.connect();
  const db = client.db();
  const collection = db.collection("produkt");
  const result = await collection.find();
  let aray: Object[] = [];
  result
    .forEach((element) => {
      aray.push(element);
    })
    .then(() => {
      res.status(200).send(aray);
    });
});

router.post("/", async (req: Request, res: Response) => {
  await client.connect();
  const db = client.db();
  const collection = db.collection("produkt");
  await collection
    .insertOne(req.body)
    .then(() => res.status(200).send("Dodano produkt"));
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("produkt");
    const id = new ObjectId(req.params.id);
    const result = await collection.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      res.status(200).send("Usunięto produkt");
    } else {
      res.status(404).send("Brak produktu do usnuięcia");
    }
  } catch (e) {
    res.status(400).send("Brak produktu do usnuięcia");
  }
});

router.put("/kupno", async (req: Request, res: Response) => {
  await client.connect();
  const db = client.db();
  const collection = db.collection("produkt");
  let result = collection
    .findOne({ nazwa: req.body.nazwa })
    .then(async (result: any) => {
      result.ilosc = parseInt(result.ilosc) + parseInt(req.body.ilosc);
      await collection.updateOne(
        { nazwa: req.body.nazwa },
        { $set: { ilosc: result.ilosc } }
      );
      res.status(200).send("Zmieniono dane produktu");
    });
});

router.put("/:id", async (req: Request, res: Response) => {
  await client.connect();
  const db = client.db();
  const collection = db.collection("produkt");
  const id = new ObjectId(req.params.id);
  await collection.updateOne({ _id: id }, { $set: req.body });
  res.status(200).send("Zmieniono dane produktu");
});

module.exports = router;
