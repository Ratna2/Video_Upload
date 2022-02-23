import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "../config/constant";

const UploadForm = ({ getall }) => {
  const [name, setname] = useState("");
  const [videos, setvideos] = useState([]);
  // For Upload Bar
  const [uploaded, setUploaded] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();

    let formdata = new FormData();
    for (let key in videos) {
      formdata.append("Videos", videos[key]);
    }

    formdata.append("name", name);

    // Api call with axios
    axios
      .post(`${BACKEND_URI}/api/media/create`, formdata, {
        onUploadProgress: (data) => {
          // console.log(Math.round((data.loaded / data.total) * 100));
          setUploaded(Math.round((data.loaded / data.total) * 100));
        },
      })
      .then((success) => {
        getall();
        alert("Video Uploaded Successfully!!!")
      })
      .catch((error) => {
        console.log(error);
        alert("Error Happened");
      });
  };

  const onChange = (e) => {
    setname(e.target.value);
  };

  const onChangevideo = (e) => {
    setvideos(e.target.files);
  };
  return (
    <>
      <form onSubmit={handleClick}>
        <div className="form-group my-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control my-1"
            onChange={onChange}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="Videos">Upload</label>
          <input
            type="file"
            name="Videos"
            id="videos"
            multiple
            className="form-control my-1"
            accept=".mp4, .mkv"
            onChange={onChangevideo}
          />
        </div>
        {/* Progress Bar */}
        {uploaded && <div className="progress">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow={uploaded}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: `${uploaded}%` }}
          >
            {`${uploaded}%`}
          </div>
        </div>}
        <button type="Submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </>
  );
};

export default UploadForm;
