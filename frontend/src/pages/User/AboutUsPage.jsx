import React from "react";
import { useSelector } from "react-redux";
import { FaFacebook } from "react-icons/fa";
const AboutUsPage = () => {
  const { admin } = useSelector((state) => state.admin);
  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom right, #112D60, #DD83E0, #9EBAF3, #CBE7E3 ,#B6C0C5)",
      }}
      className="w-full h-[100vh] flex justify-center items-center"
    >
      <div className="w-[60%] h-[90vh] bg-gray-100 bg-opacity-35 rounded-3xl border-2">
        <div className="border-b-2 border-blue-500 w-full flex">
          <div className="w-[35%] border-r-2 border-blue-500 h-[18vh] mt-6 flex justify-center items-center flex-col">
            <img
              src={`data:image/jpeg;base64,${admin?.avatar}`}
              alt=""
              className="w-[30%] transition-all duration-200 rounded-full cursor-pointer hover:scale-[1.2] overflow-hidden"
            />
            <p className="text-xl font-[600] font-Poppins pt-4">
              CEO: Nguyễn Minh Tâm
            </p>
          </div>
          <div className="w-[65%] p-4">
            <p className="tex-xl font-[700] font-Poppins uppercase">
              Thông tin liên hệ
            </p>
            <p className="mt-3 text-lg font-[500] font-Poppins">
              Số điện thoại:
            </p>
            <p className="mt-3 text-lg font-[500] font-Poppins">Email:</p>
            <p className="mt-3 text-lg font-[500] font-Poppins">
              Liên kết mạng xã hội:{" "}
              <a href="https://www.facebook.com/nguyenbi1234">
                <FaFacebook
                  size={25}
                  className="cursor-pointer mt-4 hover:text-white transition-transform duration-300"
                />
              </a>
            </p>
          </div>
        </div>
        <div className="w-full h-[65vh] flex">
          <div className="w-[35%] pl-3 mt-4 h-full">
            <p className="text-[600] text-xl text-red-500 font-Poppins uppercase">
              Địa chỉ trụ sở chính
            </p>
            <p>06 Trần Văn Ơn, Phú Hoà, Thủ Dầu Một, Bình Dương</p>
          </div>
          <div className="w-[65%]">
            <iframe
              title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.7726638930385!2d106.67289931102822!3d10.98052468913576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d1085e2b1c37%3A0x73bfa5616464d0ee!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBUaOG7pyBE4bqndSBN4buZdA!5e0!3m2!1svi!2s!4v1709386111583!5m2!1svi!2s"
              width="100%"
              height="80%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
