import LogoComp from "@/assets/LogoVector.svg?react";


export default function Logo() {
  return (
    <div className="h-14 w-16">
      <LogoComp
        className="p-3 w-auto h-full bg-center bg-contain bg-no-repeat"
      />
    </div>
  );
}
