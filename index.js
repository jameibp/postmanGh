const { default: mongoose } = require("mongoose");

const express = require("express"),
  app = express(),
  Student = require("./model"),
  connectDb = require("./connectDb"),
  cors = require("cors");

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDb();

app.use(cors());
app.use(express.json());

app.post("/newStudent", async (req, res) => {
  try {
    let newStudent = await Student.create({
      name: req.body.name,
      studentId: req.body.id,
      creator: req.body.creator,
    });
    res.json(newStudent);
  } catch (error) {
    console.log(error.message);
    res.json({
      msg: error.message,
    });
  }
});

app.get("/allStudents", async (req, res) => {
  try {
    let all = await Student.find();
    res.json(all);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/otp/:pass", (req, res) => {
  try {
    if (req.params.pass == "123") {
      res.status(200).json("your otp is 203492");
    } else {
      res.status(403).json("Access Denied!");
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    let del = await Student.findOneAndDelete({
      studentId: req.params.id,
    });
    res.status(202).json(del);
  } catch (error) {
    console.log(error.message);
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const updated = await Student.findOneAndUpdate(
      { studentId: req.params.id },
      { name: req.body.name }
    );
    await updated.save();
    console.log(req.body);
    res.json({
      msg: "Succesfull",
    });
  } catch (error) {
    res.json({
      msg: error.message,
    });
  }
});

app.listen((port = 3001), () => {
  console.log("Server Running On Port " + port + "!!!");
  console.log(`http://localhost:${port}`);
});
