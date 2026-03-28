"use client";

import { useState, useCallback } from "react";
import PhotoAlbum, { type Photo } from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const photos: Photo[] = [
  { src: "/assets/images/gallery/01.jpg", width: 591,  height: 1280 },
  { src: "/assets/images/gallery/02.jpg", width: 728,  height: 1280 },
  { src: "/assets/images/gallery/03.jpg", width: 671,  height: 1280 },
  { src: "/assets/images/gallery/04.jpg", width: 633,  height: 1280 },
  { src: "/assets/images/gallery/05.jpg", width: 637,  height: 1280 },
  { src: "/assets/images/gallery/06.jpg", width: 731,  height: 1280 },
  { src: "/assets/images/gallery/07.jpg", width: 641,  height: 1280 },
  { src: "/assets/images/gallery/08.jpg", width: 647,  height: 1280 },
  { src: "/assets/images/gallery/09.jpg", width: 647,  height: 1280 },
  { src: "/assets/images/gallery/10.jpg", width: 634,  height: 1280 },
  { src: "/assets/images/gallery/11.jpg", width: 633,  height: 1280 },
  { src: "/assets/images/gallery/12.jpg", width: 651,  height: 1280 },
  { src: "/assets/images/gallery/13.jpg", width: 752,  height: 1280 },
  { src: "/assets/images/gallery/14.jpg", width: 652,  height: 1280 },
  { src: "/assets/images/gallery/15.jpg", width: 649,  height: 1280 },
  { src: "/assets/images/gallery/16.jpg", width: 746,  height: 1280 },
  { src: "/assets/images/gallery/17.jpg", width: 720,  height: 1280 },
  { src: "/assets/images/gallery/18.jpg", width: 752,  height: 1280 },
  { src: "/assets/images/gallery/19.jpg", width: 696,  height: 1280 },
  { src: "/assets/images/gallery/20.jpg", width: 674,  height: 1280 },
  { src: "/assets/images/gallery/21.jpg", width: 1080, height: 1237 },
  { src: "/assets/images/gallery/22.jpg", width: 1080, height: 1270 },
  { src: "/assets/images/gallery/23.jpg", width: 650,  height: 1280 },
  { src: "/assets/images/gallery/24.jpg", width: 687,  height: 1280 },
];

export function GallerySection() {
  const [index, setIndex] = useState(-1);

  const handleClick = useCallback(({ index }: { index: number }) => {
    setIndex(index);
  }, []);

  return (
    <section id="gallery" className="py-16 lg:py-24" style={{ backgroundColor: "rgb(17, 24, 39)" }}>
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-customYellow">
            Галерия
          </span>
          <h2 className="mt-2 text-2xl font-bold text-white lg:text-3xl">
            Реални снимки от аукциони
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Автомобили, намерени и внесени от нашия екип
          </p>
        </div>

        {/* Masonry grid */}
        <PhotoAlbum
          photos={photos}
          layout="masonry"
          columns={(width) => {
            if (width < 480) return 2;
            if (width < 768) return 3;
            return 4;
          }}
          spacing={8}
          onClick={handleClick}
          renderPhoto={({ photo, imageProps: { alt, style, ...rest } }) => (
            <img
              alt={alt}
              style={{ ...style, cursor: "pointer", borderRadius: 8 }}
              {...rest}
            />
          )}
        />

        {/* Lightbox */}
        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={photos}
          on={{ view: ({ index: i }) => setIndex(i) }}
          styles={{
            container: { backgroundColor: "rgba(0,0,0,0.95)" },
          }}
        />
      </div>
    </section>
  );
}
