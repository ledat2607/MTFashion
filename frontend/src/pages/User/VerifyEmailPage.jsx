import React, { useRef, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";

const VerifyEmailPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
  const handleChange = (index, value) => {
    const filteredValue = value.replace(/\D/g, "");
    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = filteredValue.slice(0, 1); // Only keep the first character
      return newCode;
    });

    if (filteredValue.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }
    if (filteredValue.length === 0 && index > 0) {
      const prevInputRef = inputRefs.current[index - 1];
      if (prevInputRef && prevInputRef.current) {
        prevInputRef.current.focus();
      }
    }
  };
  return (
    <div className="bg-[#47947c] w-full h-screen flex justify-center items-center">
      <div className="sm:max-w-[55%] bg-white sm:h-[45vh] h-[60vh] w-[85%] rounded-lg shadow-lg shadow-teal-500/30 p-2 grid justify-center items-center flex-col">
        <h1 className="text-center text-4xl uppercase font-[700]">
          Xác nhận email
        </h1>
        <p className="text-center text-2xl mt-3">
          Vui lòng điền mã code gồm 6 chữ số gửi về email bạn đã đăng ký:
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-6 sm:gap-2 mt-8 justify-items-center items-center">
          {code.map((value, index) => (
            <input
              key={index}
              type="text"
              className="border border-black mt-4 sm:mt-0 w-[50px] h-[50px] text-center"
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              ref={inputRefs.current[index]}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && value === "") {
                  const prevIndex = index - 1;
                  const prevInputRef = inputRefs.current[prevIndex];

                  if (prevInputRef && prevInputRef.current) {
                    prevInputRef.current.focus();
                  }
                }
              }}
            />
          ))}
        </div>

        <div className="mt-8 opacity-45 hover:opacity-100 h-[40px] w-[150px] text-xl font-[600] hover:bg-[#368565] hover:text-[#ffffff] hover:border-[#ffffff] rounded-lg bg-white border-2 border-[#4dcb9b] mx-auto flex items-center justify-center cursor-pointer">
          <AiOutlineReload />
          <p className="ml-4 ">Gửi lại mã</p>
        </div>
        <div className="w-[150px] text-xl hover:bg-slate-800 hover:text-[#ffffff] font-[600] h-[40px] mx-auto mt-2 flex justify-center items-center bg-slate-200 rounded-lg cursor-pointer">Xác nhận</div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
