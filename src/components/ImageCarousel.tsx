import { useState } from "react";
import Image from "next/image";

interface CarouselImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function ImageCarousel({
  images,
  containerRef,
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const prevImage = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center"
      ref={containerRef}
    >
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white text-black rounded-full p-2 shadow transition"
        aria-label="Previous image"
        type="button"
      >
        &#8592;
      </button>
      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white text-black rounded-full p-2 shadow transition"
        aria-label="Next image"
        type="button"
      >
        &#8594;
      </button>

      <Image
        src={images[current].src}
        alt={images[current].alt}
        width={images[current].width}
        height={images[current].height}
        className="w-full h-full object-cover object-top cursor-pointer transition duration-300"
        onClick={() => setShowModal(true)}
        priority
      />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full border border-white ${
              current === index ? "bg-white" : "bg-transparent"
            }`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to image ${index + 1}`}
            type="button"
          />
        ))}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative max-w-4xl w-full p-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white text-2xl z-10"
              onClick={() => setShowModal(false)}
              aria-label="Close"
              type="button"
            >
              &times;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white text-black rounded-full p-2 shadow transition"
              aria-label="Previous image"
              type="button"
            >
              &#8592;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white text-black rounded-full p-2 shadow transition"
              aria-label="Next image"
              type="button"
            >
              &#8594;
            </button>
            <Image
              src={images[current].src}
              alt={images[current].alt}
              width={images[current].width}
              height={images[current].height}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl bg-white"
              priority
            />
            <div className="flex gap-2 mt-4 z-20">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full border border-white ${
                    current === index ? "bg-white" : "bg-transparent"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(index);
                  }}
                  aria-label={`Go to image ${index + 1}`}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
