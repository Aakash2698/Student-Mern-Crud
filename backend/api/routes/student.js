const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const Student = require("../models/Student");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "." + file.originalname.split(".").pop());
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("ProfileImage"), (req, res, next) => {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false,
    });
  } else {
    console.log("file received");
    return res.send({
      success: true,
      data: req.file,
    });
  }
});
//INSERT DATA //
router.post("/", (req, res, next) => {
  const student = new Student({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Gender: req.body.Gender,
    DOB: req.body.DOB,
    Hobbies: req.body.Hobbies,
    ProfileImage: req.body.filename,
  });
  student
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Student Created Successfully",
        createdStudent: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
//all data //
router.post("/list/:skip/:limit", (req, res, next) => {
  let condition = {};
  if (req.body.searchText) {
    let searchText = new RegExp(req.body.searchText, "i");
    condition = {
      $or: [
        { FirstName: searchText },
        { LastName: searchText },
        { Gender: searchText },
        { DOB: searchText },
        { Hobbies: searchText },
      ],
    };
  }
  Student.find(condition)
    .skip(parseInt(req.params.skip))
    .limit(parseInt(req.params.limit))
    .then((result) => {
      Student.count().then((total) => {
        let count = total;
        res.status(200).json({ result, count });
      });
    })
    .catch((error) => {
      console.log("err===>", error);
      res.send(error);
    });
});

//GET BY ID//
router.get("/:studentId", (req, res, next) => {
  const id = req.params.studentId;
  Student.findById(id)
    .exec()
    .then((doc) => {
      console.log("From Database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "No valid record found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
// EDIT BY ID //
router.put("/:studentId", (req, res, next) => {
  const id = req.params.studentId;
  console.log("*-*-*-", req.body);
  Student.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Gender: req.body.Gender,
        DOB: req.body.DOB,
        Hobbies: req.body.Hobbies,
        ProfileImage: req.body.ProfileImage,
      },
    },
    { new: true }
  )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// DELETE BY ID //
router.delete("/:studentId", (req, res, next) => {
  const id = req.params.studentId;
  Student.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Student Data Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
