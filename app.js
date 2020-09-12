const fs = require('fs');
const path = require('path');
const express = require("express");
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const courseRouter = require("./routes/courses-routes");
const authRouter = require("./routes/auth-routes");
const blogsRouter = require("./routes/blogs-routes");
const contactRouter = require("./routes/contact-routes");
const studentRouter = require("./routes/student-routes");
const instructorRouter = require("./routes/instructor-routes");
const adminRouter = require("./routes/admin-routes");
const techRouter = require("./routes/tech-routes");
const enquiryRouter = require("./routes/enquiry-routes");
const forumRouter = require('./routes/forum-routes');

const app = express();

app.use(bodyParser.json());

app.use(fileUpload());

app.use('/uploads/classfiles', express.static(path.join('uploads','classfiles')));
app.use('/uploads/classvideos', express.static(path.join('uploads','classvideos')));
app.use('/uploads/lectures', express.static(path.join('uploads','lectures')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/courses", courseRouter);
app.use("/api/user", authRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/contact", contactRouter);
app.use("/api/student", studentRouter);
app.use("/api/instructor", instructorRouter);
app.use("/api/admin", adminRouter);
app.use("/api/technologies", techRouter);
app.use("/api/enquiry", enquiryRouter);
app.use("/api/forum", forumRouter);


app.use((error, req, res, nexts) => {
  if (res.headerSent) {
    return nexts(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "Something Went Wrong" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSWD}@surge-2sgo8.gcp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    , { useNewUrlParser: true, useUnifiedTopology: true }
    
  )
  .then((client) => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log("Error: ".err);
    throw err;
  });
