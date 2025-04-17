import React from "react";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import image from "../../../public/images/bg-watermark.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        <div className="items-center hidden w-full h-full lg:w-1/2 lg:grid relative bg-brand-950 dark:bg-white/5">
          {/* Watermark Background Image */}
          <div
            className="absolute inset-0 w-[150%] h-[150%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-contain bg-center opacity-20 dark:opacity-10 bg-no-repeat"
            style={{ backgroundImage: `url(${image})` }}
          ></div>

          {/* Content */}
          <div className="relative flex items-center justify-center z-10 w-full h-full">
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-4">
                <span className="text-3xl text-white font-bold text-center">UMC Library Management <br/>System</span>
              </div>
              <p className="text-center text-lg text-gray-300 dark:text-white/70">
                Digital Initiative by Ulhasnagar Municipal Corporation
                <br />
                Transforming library services for citizens
              </p>
            </div>
          </div>
        </div>
        {children}
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div >
  );
}
