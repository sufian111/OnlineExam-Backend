const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World e!");
});

const uri =
  "mongodb+srv://admin:admin@cluster0.14gjb.mongodb.net/exam?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const questionCollection = client.db("exam").collection("questionDb");
  const reimaginationQuestionCollection = client
    .db("exam")
    .collection("reimaginationQuestionDb");
  const reorientQuestionCollection = client
    .db("exam")
    .collection("reorientQuestionDb");
  const reframingQuestionCollection = client
    .db("exam")
    .collection("reframingQuestionDb");
  const resonanceQuestionCollection = client
    .db("exam")
    .collection("resonanceQuestionDb");

  console.log("conect");

  /*   get relatability the question */
  app.get("/relatabilityQuestion", (req, res) => {
    questionCollection.find({}).toArray((err, result) => {
      res.send(result);
    });
  });

  /*   get resonance the question */
  app.get("/resonanceQuestion", (req, res) => {
    resonanceQuestionCollection.find({}).toArray((err, result) => {
      res.send(result);
    });
  });

  /*   get reframing the question */
  app.get("/reframingQuestion", (req, res) => {
    reframingQuestionCollection.find({}).toArray((err, result) => {
      res.send(result);
    });
  });

  /*   get reorient the question */
  app.get("/reorientQuestion", (req, res) => {
    reorientQuestionCollection.find({}).toArray((err, result) => {
      res.send(result);
    });
  });

  /*   get reimagination the question */
  app.get("/reimaginationQuestion", (req, res) => {
    reimaginationQuestionCollection.find({}).toArray((err, result) => {
      res.send(result);
    });
  });

  /* finished */
});

////get user order details

// app.listen(process.env.PORT || port);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
