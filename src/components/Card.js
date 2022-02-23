import React from "react";

const Card = (props) => {
  return (
    <>
      <div className="col-md-6">
        <div
          className="card mx-4 my-3"
          style={{
            height: "auto",
            width: "700px",
            border: "1px solid black",
          }}
        >
            <div className="card-body">
                {props.name}
            </div>
        </div>
      </div>
    </>
  );
};

export default Card;
