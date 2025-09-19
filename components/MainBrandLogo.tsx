"use client";

import Image from "next/image";
import React from "react";

interface MainBrandLogoProps {
  logoSrc: string; // Link ảnh logo
  mainDomain: string; // Ví dụ: 'soft.io.vn'
  altText?: string;
  size?: number; // Chiều cao logo
}

const MainBrandLogo: React.FC<MainBrandLogoProps> = ({
  logoSrc,
  mainDomain,
  altText = "Logo chính",
  size = 12,
}) => {
  return (
    <div
      className="absolute top-0 left-0 m-3 me-2 flex items-center bg-white rounded shadow-sm p-2"
      style={{ zIndex: 1050 }}
    >
      <a
        href={`https://${mainDomain}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={logoSrc} alt={altText} height={size} className="me-2" />
      </a>
    </div>
  );
};

export default MainBrandLogo;
