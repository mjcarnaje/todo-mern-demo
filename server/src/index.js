import express from "express";
import cors from "cors";
import connectDb from "./db";
import tasks from "./routes/tasks";

const app = express();

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/api/tasks", tasks);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
