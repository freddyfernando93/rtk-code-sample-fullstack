import cors from "cors";
import express from "express";
import orders from "./api/orders";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", orders);

const server = app.listen(3001, () =>
  console.log("Server ready at: http://localhost:3001")
);