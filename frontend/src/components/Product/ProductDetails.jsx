import React, { useState } from "react";

const ProductDetails = ({ data }) => {
  const [selected_image, setSelectedImage] = useState(0);
  return (
    <div className="h-full w-full mx-auto pb-8">
      <div className="w-[95%] mt-2 mx-auto">link params</div>
      <div className="bg-gradient-to-r from-gray-200 via-teal-200 to-gray-300/20 rounded-3xl w-[95%] h-screen mx-auto mt-4">
        {data ? (
          <div className="w-full flex justify-between">
            <div className="w-[45%] mt-6 h-[80vh] flex items-center flex-col">
              <img
                src={data.image_Url[selected_image].url}
                alt=""
                className="rounded-2xl h-[60vh] object-contain"
              />
              <div className="mt-4 flex justify-center items-center  w-full h-[20vh]">
                {data.image_Url?.map((i, index) => (
                  <img
                    key={index}
                    src={i.url}
                    alt=""
                    className={`${
                      selected_image === index ? "border-2 border-red-500" : ""
                    } rounded-lg h-[18vh] cursor-pointer hover:scale-[1.1] duration-300 p-1 object-contain`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </div>
            <div className="w-[45%]">des</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductDetails;
