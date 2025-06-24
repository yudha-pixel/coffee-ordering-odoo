// src/components/Logo.tsx
import imgLogo from "../assets/LogoVector.svg";

export default function Logo() {
  return (
    <div className="h-14 w-16">
      <div
        className="w-full h-full bg-center bg-contain bg-no-repeat"
        style={{ backgroundImage: `url('${imgLogo}')` }}
      />
    </div>
  );
}