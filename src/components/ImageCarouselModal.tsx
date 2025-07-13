import Image from "next/image";

interface CarouselImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ModalContentProps {
  images: CarouselImage[];
  current: number;
  setCurrent: (index: number) => void;
  onClose: () => void;
  prevImage: () => void;
  nextImage: () => void;
}

export function ImageCarouselModal({
  images,
  current,
  setCurrent,
  onClose,
  prevImage,
  nextImage,
}: ModalContentProps) {
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full p-4 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-white text-2xl z-10 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center"
          onClick={onClose}
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
          quality={85}
          sizes="(max-width: 768px) 100vw, 80vw"
        />
        <div className="flex gap-2 mt-4 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-6 h-6 rounded-full border border-white transition-colors flex items-center justify-center mx-1
      ${current === index ? "bg-white" : "bg-transparent"}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrent(index);
              }}
              aria-label={`Go to image ${index + 1}`}
              type="button"
            >
              <span className="sr-only">{`Go to image ${index + 1}`}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
