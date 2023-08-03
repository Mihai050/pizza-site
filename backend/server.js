
const fs = require("fs");
const express = require("express");
const path = require("path");
const cors = require("cors");
const easyEdit = require("./easyedit.js");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "frontend", "static")));

app.get("/api/pizza", (req, res) => {
  res.sendFile(path.join(__dirname, "pizzas.json"));
});

app.get("/api/allergen", (req, res) => {
  res.sendFile(path.join(__dirname, "allergens.json"));
});

app.get("/api/orders", (req, res) => {
  res.sendFile(path.join(__dirname, "orders.json"));
});

app.get("/api/main", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.get("/api/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.get("/api/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

app.post("/api/delete/order", async (req, res) => {
  try {
    const deletedId = req.body.id;
    await easyEdit("orders", removeOrder, deletedId);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error:", error);
    res.sendStatus(500);
  }
});

app.post("/api/data", async (req, res) => {
  try {
    const orderPackage = req.body;
    console.log(orderPackage);
    await easyEdit("orders", addOrder, orderPackage);
  } catch (error) {
    console.error("Error:", error);
    res.sendStatus(500);
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`http://localhost:${port}/api/main`);
  console.log(`http://localhost:${port}/api/admin`);
});

function addUser(data, object) {
  data["users"].push({ ...object });
  return data;
}

function removeOrder(data, orderId) {
  const location = data.orderList.findIndex((order) => order.id === orderId);
  console.log(location);
  if (location != -1) {
    data.orderList.splice(location, 1);
    console.log("succes");
    return data;
  } else {
    console.log("fail");
    return data;
  }
}

function addOrder(data, object) {
  data.orderList.push({ ...object });
  data.orderId = Date.now() + Math.random();
  return data;
}
