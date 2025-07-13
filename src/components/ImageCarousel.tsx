import { useState, memo, lazy, Suspense } from "react";
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

const ModalContent = lazy(() =>
  import("./ImageCarouselModal").then((mod) => ({
    default: mod.ImageCarouselModal,
  }))
);

const ImageCarousel = memo(function ImageCarousel({
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
    <>
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
          priority={current === 0}
          quality={75}
          sizes="(max-width: 768px) 100vw, 40vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-6 h-6 rounded-full border border-white transition-colors flex items-center justify-center mx-1
    ${current === index ? "bg-white" : "bg-transparent"}`}
              onClick={() => setCurrent(index)}
              aria-label={`Go to image ${index + 1}`}
              type="button"
            >
              <span className="sr-only">{`Go to image ${index + 1}`}</span>
            </button>
          ))}
        </div>
      </div>

      {showModal && (
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          }
        >
          <ModalContent
            images={images}
            current={current}
            setCurrent={setCurrent}
            onClose={() => setShowModal(false)}
            prevImage={prevImage}
            nextImage={nextImage}
          />
        </Suspense>
      )}
    </>
  );
});

export default ImageCarousel;
