import React from "react";

const CustomImage = ({ src, id }) => (
  <div style={{ display: "inline-block" }}>
    <img src={src} alt={id} />
  </div>
);

export default CustomImage;
