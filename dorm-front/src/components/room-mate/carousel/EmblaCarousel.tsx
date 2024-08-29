import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import RoommateMatchCard from "@/components/room-mate/RoommateMatchCard";
import { selectedRoomMateMemberIdAtom } from "@/recoil/room-mate/atom";

import { SelectedSnapDisplay, useSelectedSnapDisplay } from "./EmblaCarouselSelectedSnapDisplay";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedRoomMateMemberId, setSelectedRoomMateMemberId] = useRecoilState(selectedRoomMateMemberIdAtom);
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

  //룸메 신청하기 버튼을 클릭할 때 선택될 memberId
  useEffect(() => {
    setSelectedRoomMateMemberId(selectedSnap);
  }, [selectedSnap]);

  useEffect(() => {
    console.log("selectedRoomMateMemberId", selectedRoomMateMemberId)
  }, [selectedRoomMateMemberId]);

  const embla_styles: React.CSSProperties = {
    "--slide-height": "19rem",
    "--slide-spacing": "1rem",
    "--slide-size": "50%",
  } as React.CSSProperties;

  return (
    <section className="max-w-3xl mx-auto mt-4" style={embla_styles}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom" style={{ marginLeft: "calc(var(--slide-spacing) * -1)" }}>
          {slides.map((index) => (
            <div
              key={index}
              className="transform-gpu flex-shrink-0 flex-grow-0 "
              style={{ flexBasis: "var(--slide-size)", paddingLeft: "var(--slide-spacing)" }}>
              <RoommateMatchCard memberId={index} />
            </div>
          ))}
        </div>
      </div>

      <div className={""}>
        <SelectedSnapDisplay selectedSnap={selectedSnap} snapCount={slides.length} />
      </div>
    </section>
  );
};

export default EmblaCarousel;
