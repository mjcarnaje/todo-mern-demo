import express from "express";

const app = express();

connectDb();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(cors());

app.use("/api/tasks", tasks);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
