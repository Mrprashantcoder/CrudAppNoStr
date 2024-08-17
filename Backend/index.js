import express from "express";
import mongoose, { Model } from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();

app.use(bodyParser());
app.use(cors());
(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/testCrud");
    console.log("DB is Connected");

    app.listen(8080, () => {
      console.log("server is Start");
    });
  } catch (error) {
    console.log(error);
  }
})();
const userSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
});
const User = mongoose.model("user", userSchema);
app.post("/create", async (req, res) => {
  const user = new User();
  user.fname = req.body.fname;
  user.lname = req.body.lname;
  user.email = req.body.email;
  user.password = req.body.password;
  const docs = await user.save();
  res.json({ msg: "User Created Sucessful" });
});
app.get("/getuser", async (req, res) => {
  const docs = await User.find();
  res.json(docs);
});
app.get("/getone/:id", async (req, res) => {
  const id = req.params.id;
  const userExites = await User.findById(id);
  res.json(userExites);
});
app.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const userExites = await User.findById(id);

    if (!userExites) {
      res.json({ msg: "User Note Found !" });
    }
    console.log(req.body);

    const updateData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ msg: "Update Sucessful" });
  } catch (error) {
    res.json({ error: error });
  }
});
app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const userExites = await User.findById(id);

    if (!userExites) {
      res.json({ msg: "User Note Found !" });
    }

    const updateData = await User.findByIdAndDelete(id);
    res.json({ msg: "delete User Sucessful" });
  } catch (error) {
    res.json({ error: error });
  }
});
