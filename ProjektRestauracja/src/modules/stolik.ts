import express from "express";
import { Request, Response } from "express";
import { readlink } from "fs";
import { MongoClient, ObjectId } from "mongodb";

const router = express.Router();
router.use(express.json());
const client = new MongoClient(
  "mongodb+srv://admin:Book54321@cluster0.qxenmyc.mongodb.net/Restauracja"
);

router.get("/", async (req: Request, res: Response) => {
  await client.connect();
  const db = client.db();
  const collection = db.collection("stoliki");
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
  const collection = db.collection("stoliki");
  await collection
    .insertOne(req.body)
    .then(() => res.status(200).send("Dodano stolik"));
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("stolik");
    const id = new ObjectId(req.params.id);
    const result = await collection.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      res.status(200).send("Usunięto stolik");
    } else {
      res.status(404).send("Brak stolika do usnuięcia");
    }
  } catch (e) {
    res.status(400).send("Brak stolika do usnuięcia");
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  await client.connect();
  const db = client.db();
  const collection = db.collection("stolik");
  const id = new ObjectId(req.params.id);
  await collection.updateOne({ _id: id }, { $set: req.body });
  res.status(200).send("Zmieniono dane stolika");
});

router.get("/wolne", async (req: Request, res: Response) => {
  await client.connect();
  const db = client.db();
  const collection = db.collection("stoliki");
  const result = await collection.find({ status: "wolne" });
  let aray: Object[] = [];
  result
    .forEach((element) => {
      if (element.iloscOsob >= req.body.ilosc) {
        aray.push(element);
      }
    })
    .then(() => {
      res.status(200).send(aray);
    });
});

router.get("/zajete", async (req: Request, res: Response) => {
  await client.connect();
  const db = client.db();
  const collection = db.collection("stoliki");
  const result = await collection.find({ status: "zajęte" });
  let aray: Object[] = [];
  result
    .forEach((element) => {
      if (element.iloscOsob >= req.body.ilosc) {
        aray.push(element);
      }
    })
    .then(() => {
      res.status(200).send(aray);
    });
});

router.get("/niedostepne", async (req: Request, res: Response) => {
  await client.connect();
  const db = client.db();
  const collection = db.collection("stoliki");
  const result = await collection.find({ status: "niedostepne" });
  let aray: Object[] = [];
  result
    .forEach((element) => {
      if (element.iloscOsob >= req.body.ilosc) {
        aray.push(element);
      }
    })
    .then(() => {
      res.status(200).send(aray);
    });
});

module.exports = router;
