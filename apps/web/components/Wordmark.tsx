import Image from "next/image";
import { brandAssets, productName } from "@dream-logic/brand";

type WordmarkProps = {
  mode?: "dark" | "light" | "main";
  width?: number;
};

export function Wordmark({ mode = "dark", width = 174 }: WordmarkProps) {
  const src = mode === "light" ? brandAssets.fullLight : mode === "main" ? brandAssets.main : brandAssets.fullDark;
  return (
    <Image
      alt={`${productName} Astrology suite`}
      className="logo-lockup"
      height={Math.round(width * 0.82)}
      priority
      src={src}
      width={width}
    />
  );
}
