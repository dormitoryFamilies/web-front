import useRoomMateDoomzProfile from "@/lib/hooks/useRoomMateDoomzProfile";
import useRoomMateRecommendResultProfile from "@/lib/hooks/useRoomMateRecommendResultProfile";

interface Props {
  memberId: number;
  profileMenu: "프로필" | "생활 습관" | "기타 습관";
}
const RoomMateDoomzMatchingProfile = (props: Props) => {
  const { memberId, profileMenu } = props;
  const { recommendRoomMateProfile } = useRoomMateRecommendResultProfile(memberId);
  const { doomzProfile } = useRoomMateDoomzProfile(memberId);

  function calculateKoreanAge(birthDate: string | undefined) {
    if (!birthDate) return "";

    // 날짜 문자열을 분리
    const [birthYear] = birthDate.split("-");

    // 현재 연도 가져오기
    const currentYear = new Date().getFullYear();

    // 한국 나이 계산 (현재 연도 - 출생 연도 + 1)
    return currentYear - parseInt(birthYear) + 1;
  }

  const renderComponent = (profileMenu: "프로필" | "생활 습관" | "기타 습관") => {
    switch (profileMenu) {
      case "프로필":
        return (
          <section className={"flex flex-col gap-y-4"}>
            <div className={"flex gap-x-4"}>
              <div className={"flex gap-x-2 text-h5"}>
                <span>이름</span>
                <span className={"text-gray5"}>{recommendRoomMateProfile?.data.nickname}</span>
              </div>
              <div className={"flex gap-x-2 text-h5"}>
                <span>나이</span>
                <span className={"text-gray5"}>{calculateKoreanAge(recommendRoomMateProfile?.data.birthDate)}</span>
              </div>
              <div className={"flex gap-x-2 text-h5"}>
                <span>학번</span>
                <span className={"text-gray5"}>{recommendRoomMateProfile?.data.studentNumber}</span>
              </div>
            </div>
            <div className={"flex gap-x-2 text-h5"}>
              <span>학과</span>
              <span className={"text-gray5"}>{recommendRoomMateProfile?.data.departmentType}</span>
            </div>
          </section>
        );
      case "생활 습관":
        return (
          <section className={"grid grid-cols-2 gap-y-4"}>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>취침 시간</span>
              <span className={"text-gray5"}>{doomzProfile?.data.sleepTime}</span>
            </div>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>음주빈도</span>
              <span className={"text-gray5"}>{doomzProfile?.data.drunkHabit}</span>
            </div>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>기상 시간</span>
              <span className={"text-gray5"}>{doomzProfile?.data.wakeUpTime}</span>
            </div>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>주사</span>
              <span className={"text-gray5"}>{doomzProfile?.data.drunkHabit}</span>
            </div>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>잠버릇</span>
              <span className={"text-gray5"}>{doomzProfile?.data.sleepingHabit}</span>
            </div>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>샤워시간</span>
              <span className={"text-gray5"}>{doomzProfile?.data.showerDuration}</span>
            </div>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>잠귀</span>
              <span className={"text-gray5"}>{doomzProfile?.data.sleepingSensitivity}</span>
            </div>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>샤워시간대</span>
              <span className={"text-gray5"}>{doomzProfile?.data.showerTime}</span>
            </div>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>흡연여부</span>
              <span className={"text-gray5"}>{doomzProfile?.data.smoking}</span>
            </div>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>청소</span>
              <span className={"text-gray5"}>{doomzProfile?.data.cleaningFrequency}</span>
            </div>
          </section>
        );
      case "기타 습관":
        return (
          <section className={"grid grid-cols-2 gap-y-4"}>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>더위</span>
              <span className={"text-gray5"}>{doomzProfile?.data.heatTolerance}</span>
            </div>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>휴대폰소리</span>
              <span className={"text-gray5"}>{doomzProfile?.data.phoneSound}</span>
            </div>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>추위</span>
              <span className={"text-gray5"}>{doomzProfile?.data.coldTolerance}</span>
            </div>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>향수</span>
              <span className={"text-gray5"}>{doomzProfile?.data.perfumeUsage}</span>
            </div>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>MBTI</span>
              <span className={"text-gray5"}>{doomzProfile?.data.MBTI}</span>
            </div>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>공부장소</span>
              <span className={"text-gray5"}>{doomzProfile?.data.studyLocation}</span>
            </div>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>본가 빈도</span>
              <span className={"text-gray5"}>{doomzProfile?.data.visitHomeFrequency}</span>
            </div>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>시험</span>
              <span className={"text-gray5"}>{doomzProfile?.data.examPreparation}</span>
            </div>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>야식</span>
              <span className={"text-gray5"}>{doomzProfile?.data.lateNightSnack}</span>
            </div>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>운동</span>
              <span className={"text-gray5"}>{doomzProfile?.data.exercise}</span>
            </div>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>먹는 장소</span>
              <span className={"text-gray5"}>{doomzProfile?.data.snackInRoom}</span>
            </div>
            <div className={"flex gap-x-5 text-h5"}>
              <span className={"w-[80px]"}>벌레</span>
              <span className={"text-gray5"}>{doomzProfile?.data.insectTolerance}</span>
            </div>
          </section>
        );
    }
  };
  return <div className={"mt-5 px-5"}>{renderComponent(profileMenu)}</div>;
};
export default RoomMateDoomzMatchingProfile;
