const HttpError = require("../models/http-error");
const Technology = require("../models/technology");

const postAddTechnology = (req, res, next) => {
  const { title } = req.body;

  const tech = new Technology({
    title,
  });
  
  console.log(req.body);
  tech
    .save()
    .then((result) => {
      res.status(201).json({ message: "success" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllTechnologies = async (req, res, next) => {
  let AllTechnologies = [];
  await Technology.find()
    .then((result) => {
      AllTechnologies = result;
    })
    .catch((err) => {
      console.log(err);
    });

  if (AllTechnologies.length < 1) {
    return next(new HttpError("Could not find any technologies", 404));
  }

  res.json(AllTechnologies);
};


exports.getAllTechnologies = getAllTechnologies;
exports.postAddTechnology = postAddTechnology;
