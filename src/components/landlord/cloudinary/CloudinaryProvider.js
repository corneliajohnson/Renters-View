import React, { createContext, useState } from "react";

export const CloudinaryContext = createContext();

export const CloudinaryProvider = (props) => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "rentersview");
    setLoading(true);
    //wait fir image to load
    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/cornelia/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    setImage(file.secure_url);
    setLoading(false);
  };

  return (
    <CloudinaryContext.Provider value={{ uploadImage, image, loading }}>
      {props.children}
    </CloudinaryContext.Provider>
  );
};
