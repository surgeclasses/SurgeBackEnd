const HttpError = require("../models/http-error");
const Contact = require("../models/contact");

const postCreateContact = (req, res, next) => {
  const { name, email, query } = req.body;

  const contact = new Contact({
    name,
    email,
    query,
  });

  contact
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({ message: "success" });
    })
    .catch((err) => {
      console.log(err);
    });
};

// const getAllBlogs = async (req, res, next) => {
//   // console.log("Get Request in Courses");
//   await Blog.find()
//     .then((result) => {
//       DUMMY_BLOGS = result;
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   if (DUMMY_BLOGS.length < 1) {
//     return next(new HttpError("Could not find any blogs", 404));
//   }

//   res.json(DUMMY_BLOGS);
// };

// const getBlogById = (req, res, next) => {
//   const blogId = req.params.bid;
//   let blog;
//   try {
//     Blog.findById(blogId);
//   }catch(err){
//     return next(
//       new HttpError("Could not find the blog for the given id", 500)
//     );
//   }
//   if (!blog) {
//     return next(
//       new HttpError("Could not find the blog for the given id", 404)
//     );
//   }
//   res.json(blog);
// };

// exports.getAllBlogs = getAllBlogs;
// exports.getBlogById = getBlogById;
exports.postCreateContact = postCreateContact;
