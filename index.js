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

  const answerCollection = client.db("exam").collection("allAnswerWithEmail");

  const allAssessmentCollection = client
    .db("exam")
    .collection("allAssessmentQuestion");

  console.log("conect");

  /*   get all assessment questionCollection the question */
  app.get("/allAssessmentQuestion", (req, res) => {
    allAssessmentCollection.find({}).toArray((err, result) => {
      res.send(result);
    });
  });

  //   all questionBy header
  app.post("/questionByHeader", (req, res) => {
    //---------------- get a users Ordered Items by email
    allAssessmentCollection
      .find({ header: req.body.header })
      .toArray((err, documents) => {
        res.send(documents);
      });

    /*all answer with email address */
    app.post("/addAnswer", (req, res) => {
      const answer = req.body;
      console.log(answer);
      // answerCollection.insertOne(review, (err) => {
      //   if (err) {
      //     throw err;
      //   } else {
      //     res.send({ status: "document added" });
      //   }
      // });
    });
  });

  /* finished */
});

////get user order details

app.listen(process.env.PORT || port);
