import React from "react";
import { BACKEND_URI } from "../config/constant";

const UploadList = ({ media }) => {
  return (
    <>
    <h1>Videos</h1>
      {media &&
        media.map((medias) => {
          return (
            <div className="card p-2 my-2" style={{ width: " 100%"}}>
                    <div className="card-body">
                      <h5 className="card-text">
                        Uploaded by {medias.name}
                      </h5>
                      <small>{medias.createdAt}</small>
                    </div>
              {medias.videos.map((vid) => {
                return (
                  <div className="video mx-auto border-2">
                    <video preload="auto" width="400" height="400" controls>
                      <source src={`${BACKEND_URI}${vid}`} />
                    </video>
                  </div>
                );
              })}
            </div>
          );
        })}
    </>
  );
};

export default UploadList;



