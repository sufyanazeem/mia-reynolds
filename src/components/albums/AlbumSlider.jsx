"use client";

import { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { AudioPlayer } from "react-audio-play";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, FreeMode, Navigation, Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Fetcher function
const fetcher = (url) => fetch(url).then((res) => res.json());

const AlbumSlider = () => {
  const [thumbsSwiper, setThumbSwiper] = useState(null);

  const { data, error } = useSWR("http://localhost:4000/albums", fetcher);



  if (error) return "Failed to fetch data";
  if (!data) return "Loading...";

  return (
    <>
      {/* Main Slider */}
      <Swiper
        effect={"coverflow"}
        speed={1000}
        spaceBetween={80}
        allowTouchMove={false}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, EffectCoverflow]}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slidesShadows: true,
        }}
        className="album-slider"
      >
        {data.map((album) => (
          <SwiperSlide key={album.id} className="mb-12">
            <div className="w-full bg-secondary/80 rounded-[10px] flex flex-col xl:flex-row items-center p-6 xl:p-12 gap-x-12">
              {/* Image */}
              <div
                className="hidden xl:flex w-[450px] h-[450px] xl:h-[500px] relative cursor-pointer rounded-[10px] overflow-hidden"
              >
                <Image
                  src={album.img}
                  fill
                  priority
                  alt=""
                  className="object-cover rounded-[10px]"
                />
              </div>
              {/* Track container */}
              <div className="flex flex-1 w-full h-[500px]">
                {/* Tracks */}
                <div className="flex-1 flex flex-col xl:px-12">
                  {album.tracks?.map((track, index) => (
                    <div className="flex flex-1 w-full h-[500px]" key={index}>
                      {/* track name */}
                      <div className="flex flex-1 items-center gap-x-2 capitalize font-semibold xl:font-extrabold">
                        <div className="text-accent text-sm xl:text-lg">
                          0{index + 1}.
                        </div>
                        <div className="text-sm xl:text-base">{track.name}</div>
                      </div>
                      {/* player */}
                      <div>
                        <AudioPlayer
                          style={{
                            background: "transparent",
                            boxShadow: "none",
                            width: "100%",
                          }}
                          src={track.src}
                          loop={false}
                          preload="none"
                          color="white"
                          // width={700}
                          volume={40}
                          volumePlacement="bottom"
                          className="album-player"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumb Slider (if needed) */}
      <Swiper
        onSwiper={setThumbSwiper}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          425: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1310: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        spaceBetween={20}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        className="thumb-slider"
      >
        {data?.map((thumb, index) => (
          <SwiperSlide
            key={index}
            className="relative group overflow-hidden border-2 border-transparent w-[254px] rounded-[10px]"
          >
            {/* image */}
            <div className="relative w-[195px] h-[195px] sm:w-[360px] sm:h-[360px] md:w-[240px] md:h-[240px] cursor-pointer rounded-[10px] overflow-hidden">
              <Image
                src={thumb.img}
                fill
                priority
                alt=""
                className="object-cover rounded-[10px] group-hover:scale-105 transition-all duration-300 "
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default AlbumSlider;
