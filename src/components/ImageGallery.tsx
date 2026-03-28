import Image from "next/image";

const galleryImages = Array.from({ length: 10 }, (_, i) => ({
  src: `/images/delivery/${i + 3}.jpg`,
  alt: `Доволен клиент ${i + 1}`,
}));

export function ImageGallery() {
  return (
    <section
      id="image-catalog-section"
      className="py-8"
      style={{ backgroundColor: "rgb(17, 24, 39)" }}
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="mb-2 text-[30px] font-bold text-white">
            Нашите Доволни Клиенти
          </h2>
          <p className="mx-auto max-w-2xl text-[16px] text-gray-400">
            Разгледайте нашата галерия от щастливи клиенти, получаващи своите
            автомобили от цял свят
          </p>
        </div>

        {/* Gallery horizontal scroll */}
        <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
          {galleryImages.map((image) => (
            <div key={image.src} className="relative min-w-[300px] shrink-0">
              <Image
                src={image.src}
                alt={image.alt}
                width={300}
                height={250}
                className="h-[250px] w-full rounded-xl object-cover"
              />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-6 flex justify-center">
          <a
            href="#"
            className="rounded-full border border-white px-8 py-3 text-white transition-colors hover:bg-white hover:text-gray-900"
          >
            Потърси автомобил &#8599;
          </a>
        </div>
      </div>
    </section>
  );
}
