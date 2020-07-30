const Enquiry = require("../models/enquiry");

const postEnquiry = async (req, res, next) => {
  const { name, email, mobile, course } = req.body;
  const enquiry = new Enquiry({
    name,
    email,
    mobile,
    course,
  });

  enquiry
    .save()
    .then((result) => {
      console.log("Enquiry: " + result);
      res.status(201).json({ message: "success" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllEnquiries = async (req, res, next) => {
  // console.log("Get Request in Courses");
  let Enquiries;
  await Enquiry.find()
    .then((result) => {
      Enquiries = result;
    })
    .catch((err) => {
      console.log(err);
    });

  if (Enquiries.length < 1) {
    return next(new HttpError("Could not find any course", 404));
  }

  res.json(Enquiries);
};

const updateEnquiry = async (req, res, next) => {
  const eid = req.params.eid;
  let enquiry;
  try {
    enquiry = await Enquiry.findById(eid);
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Could not find the enquiry for the given id", 500)
    );
  }
  enquiry.isContacted = true;

  try {
    await enquiry.save();
  } catch (err) {
    console.log(err);
  }

  res.json(enquiry);
};

exports.postEnquiry = postEnquiry;
exports.getAllEnquiries = getAllEnquiries;
exports.updateEnquiry = updateEnquiry;
