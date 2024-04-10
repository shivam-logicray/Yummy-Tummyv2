import React, { useState } from "react";
import "./Css/ImageSlider.css";
import ReactImageMagnify from "react-image-magnify";

const ImageSlider = ({ imgg }) => {
  const [image, setImage] = useState(imgg[0]);
  const [val, setVal] = useState(0);

  const handleClick = (index) => {
    setVal(index);
    setImage(imgg[index]);
  };

  return (
    <>
      <div className="main">
        {/* <ReactImageMagnify
        {...{
          smallImage: {
            height: 300,
            width: 280,
            src:image
          },
          largeImage:{
            src:image,
            height:1200,
            width:1200,
          }
        }}
      /> */}

        <img src={image} />
      </div>
      <div className="flex_row">
        {imgg.map((data, i) => {
          return (
            <div className="thumbnail " key={i}>
              <img
                className={val === i ? "clicked" : ""}
                src={data}
                onClick={() => handleClick(i)}
                height={70}
                width={100}
                alt={`Thumbnail ${i}`}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ImageSlider;
