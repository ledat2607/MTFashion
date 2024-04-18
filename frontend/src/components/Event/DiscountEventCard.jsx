import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DiscountEventCard = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const dateParts = dateString.split("-");
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    return formattedDate;
  };

  function formatVietnameseCurrency(number) {
    const roundedNumber = Math.round(number / 1000) * 1000;
    const formattedNumber = roundedNumber.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

    return formattedNumber;
  }

  return (
    <Slider {...settings}>
      {data?.map((i, index) => {
        const itemStartDate = new Date(i?.isOnSale?.start_date);
        const itemEndDate = new Date(i?.isOnSale?.finish_date);
        const utcCurrentDate = new Date();
        const utcItemStartDate = new Date(itemStartDate);
        const utcItemEndDate = new Date(itemEndDate);

        const isEndingSoon =
          utcItemEndDate - utcCurrentDate < 12 * 60 * 60 * 1000 &&
          utcCurrentDate.getUTCHours() < utcItemEndDate.getUTCHours();

        const isUpcoming = utcItemStartDate > utcCurrentDate;

        const isOngoing =
          utcItemStartDate <= utcCurrentDate &&
          utcCurrentDate < utcItemEndDate &&
          !isEndingSoon;

        return (
          <div key={index} className="p-8" style={{ outline: "none" }}>
            <div className="border border-teal-500 shadow-lg shadow-teal-800/60 rounded-xl p-3 hover:shadow-lg transition-all duration-300 cursor-pointer relative">
              {isEndingSoon && (
                <span className="absolute top-0 z-[800] left-0 bg-red-500 text-white py-1 px-2 rounded-tl-xl rounded-br-md">
                  Sắp kết thúc
                </span>
              )}
              {isUpcoming && (
                <span className="absolute top-0 z-[800] left-0 bg-blue-500 text-white py-1 px-2 rounded-tl-xl rounded-br-md">
                  Sắp diễn ra
                </span>
              )}
              {isOngoing && (
                <span className="absolute top-0 z-[800] left-0 bg-green-500 text-white py-1 px-2 rounded-tl-xl rounded-br-md">
                  Đang diễn ra
                </span>
              )}
              <div className="flex justify-center items-center sm:h-[35vh] h-[18vh]">
                <img
                  src={`data:image/jpeg;base64,${i?.imgProduct[0].url}`}
                  alt=""
                  className="sm:w-[80%] sm:h-[30vh] w-[50%] h-[10vh] sm:object-contain object-cover hover:scale-[1.1] transition-all duration-300 cursor-pointer"
                />
              </div>
              <div className="w-full flex justify-between items-center">
                <div>
                  <h1 className="mt-3 font-DM font-[600] text-[12px] sm:text-sm lg:text-lg md:text-md">
                    {i?.productName}
                  </h1>
                </div>
                <div className="mt-3 font-Paci text-[12px] sm:text-sm lg:text-lg md:text-md">
                  {i?.isOnSale?.discount_rate_on_sale <= 100 ? (
                    <h1>-{i?.isOnSale?.discount_rate_on_sale}%</h1>
                  ) : (
                    <h1>
                      -
                      {formatVietnameseCurrency(
                        i?.isOnSale?.discount_rate_on_sale
                      )}
                    </h1>
                  )}
                </div>
              </div>
              <div className="w-full flex justify-between items-center">
                <h1 className="mt-3 font-Paci text-[12px] sm:text-sm lg:text-lg md:text-md">
                  {formatDate(i?.isOnSale?.start_date.slice(0, 10))}
                </h1>{" "}
                <h1 className="mt-3 font-Paci text-[12px] sm:text-sm lg:text-lg md:text-md">
                  {formatDate(i?.isOnSale?.finish_date.slice(0, 10))}
                </h1>
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default DiscountEventCard;
