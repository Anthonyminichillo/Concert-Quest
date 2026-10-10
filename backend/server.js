import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { connect } from "./db/connection.js";
import concertsRouter from "./routes/concerts.js";
import reviewsRouter from "./routes/reviews.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/api/concerts", concertsRouter);
app.use("/api/reviews", reviewsRouter);

await connect();
app.listen(PORT, () => {
  console.log(`Concert Quest listening on http://localhost:${PORT}`);
});
