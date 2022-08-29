import express from "express";
import { Request, Response } from "express";

const app = express();
app.use(express.json());

const restauracja = require("./modules/restauracja");
app.use("/restauracja", restauracja);

const pracownik = require("./modules/pracownik");
app.use("/pracownicy", pracownik);

const stolik = require("./modules/stolik");
app.use("/stolik", stolik);

const rezerwacja = require("./modules/rezerwacja");
app.use("/rezerwacja", rezerwacja);

const produkt = require("./modules/produkt");
app.use("/produkt", produkt);

const danie = require("./modules/danie");
app.use("/danie", danie);

const zamowienie = require("./modules/zamowienie");
app.use("/zamowienie", zamowienie);

app.listen(3000, () => {
  console.log("Application started on port 3000!");
});
