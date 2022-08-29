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
  const collection = db.collection("zamowienie");
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
  const collection = db.collection("zamowienie");
  if (req.body.kwota != undefined) {
    await collection
      .insertOne(req.body)
      .then(() => res.status(200).send("Dodano zamównienie"));
  } else {
    const dania = req.body.pozycje;
    const collection2 = db.collection("danie");
    let kwota = 0;
    const result = collection2.find({ nazwa: { $in: dania } }) as any;
    result
      .forEach((element: { cena: any }) => {
        kwota += element.cena;
      })
      .then(() => {
        req.body.kwota = kwota;
        collection
          .insertOne(req.body)
          .then(() => res.status(200).send("Dodano zamównienie"));
      });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("zamowienie");
    const id = new ObjectId(req.params.id);
    const result = await collection.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      res.status(200).send("Usunięto zamównienie");
    } else {
      res.status(404).send("Brak zamówienia do usnuięcia");
    }
  } catch (e) {
    res.status(400).send("Brak zamówienia do usnuięcia");
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  await client.connect();
  const db = client.db();
  const collection = db.collection("zamowienie");
  const id = new ObjectId(req.params.id);
  await collection.updateOne({ _id: id }, { $set: req.body });
  res.status(200).send("Zmieniono dane zamównienia");
});

module.exports = router;
