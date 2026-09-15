import Image from "next/image";

type FrameTheme = "maison" | "gross" | "lab";

type Props = {
  src: string;
  alt: string;
  theme: FrameTheme;
  size?: number;
  priority?: boolean;
};

/** Contained product SVG on a solid panel — never cropped as a background. */
export default function ProductArtFrame({ src, alt, theme, size = 280, priority }: Props) {
  return (
    <div className={`product-art-frame product-art-frame--${theme}`}>
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        priority={priority}
        className="product-art-frame-img"
      />
    </div>
  );
}
