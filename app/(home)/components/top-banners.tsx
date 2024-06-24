import React from "react";
import BannersSlider from "@/components/sliders/banners-slider";

const TopBanners = () => {
  return (
    <BannersSlider
      images={[
        {
          id: "10",
          src: "https://dkstatics-public.digikala.com/digikala-adservice-banners/8c05d01c83f209e683210d1d191c5ce8aa10a417_1710052288.jpg?x-oss-process=image/quality,q_95/format,webp",
        },
        {
          id: "11",
          src: "https://dkstatics-public.digikala.com/digikala-adservice-banners/1f8151dfef58889ac6519156be1ba39d1e8cd2eb_1710589468.jpg?x-oss-process=image/quality,q_95/format,webp",
        },
        {
          id: "12",
          src: "https://dkstatics-public.digikala.com/digikala-adservice-banners/987e2bbcb14272bb0a396b183aea5f646549a597_1710584353.jpg?x-oss-process=image/quality,q_95/format,webp",
        },
        {
          id: "13",
          src: "https://dkstatics-public.digikala.com/digikala-adservice-banners/85125f55c47950518a11fc3dea5468297acdca21_1710918686.jpg?x-oss-process=image/quality,q_95/format,webp",
        },
      ]}
    />
  );
};

export default TopBanners;
