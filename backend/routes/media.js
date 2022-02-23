const express = require("express");
const router = express.Router();
const multer = require("multer");
const Media = require("../models/Media");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check if there is a public folder created else create a public folder
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    // Check if there is a public folder created else create a public folder
    if (!fs.existsSync("public/videos")) {
      fs.mkdirSync("public/videos");
    }
    cb(null, "public/videos");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);

    if (ext !== ".mkv" && ext !== ".mp4") {
      return cb(new Error("Only Video files are allowed"));
    }

    cb(null, true);
  },
});

// Post a video
router.post(
  "/create",
  upload.fields([
    {
      name: "Videos",
      maxCount: 5,
    },
  ]),
   async (req, res) => {
    const { name } = req.body;
    // console.log(name);
    let videoPath = [];

    if (Array.isArray(req.files.Videos) && req.files.Videos.length > 0) {
      for (let video of req.files.Videos) {
        videoPath.push("/" + video.path);
      }
    }

    //   Add Path and name of the video to tha database
    try {
        const createMedia = await Media.create({
            name,
            videos : videoPath
        })

        res.status(200).json({msg : "Media Created Successfully!!!", createMedia})
    } catch (error) {
        console.log(error);
        res.status(404).json("Something went wrong in Post video")
    }
  }
);

// Getting all the videos in the database
router.get("/getAll", async (req, res) => {
  try {
    // Listing all the medias in the database
    const media = await Media.find();

    res.status(200).json(media);
  } catch (error) {
    console.log(error);
    res.status(400).json("Something went wrong in media.js in /getAll route");
  }
});

module.exports = router;
