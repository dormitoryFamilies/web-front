import { PostDetailType } from "@/types/board/type";

export const postDetail: PostDetailType = {
  articleId: 1,
  dormitoryId: 1,
  nickName: "sominZzang",
  profileUrl: "/unnimm.jpg",
  boardType: "함께해요",
  tags: ["공포", "바퀴벌레", "도움 필요"],
  title: "바퀴벌레 잡아주실 분",
  content: "ㅠㅠㅠ 무서워용",
  wishCount: 4,
  commentCount: 2,
  status: 0,
  createdDate: "2023-12-22T15:30:00",
  images: [
    {
      imageId: 1,
      imageName: "image1.jpg",
      s3Url: "/item.webp",
    },
    {
      imageId: 2,
      imageName: "image2.jpg",
      s3Url: "/iamge.jpeg",
    },
  ],
  comments: [
    {
      commentId: 1,
      memberId: 23,
      profileUrl: "/unnimm.jpg",
      nickName: "해나만세",
      createdDate: "2023-12-26T15:30:00",
      content: "블라블라블라",
    },
    {
      commentId: 2,
      memberId: 12,
      profileUrl: "/unnimm.jpg",
      nickName: "휴학하고 싶다",
      createdDate: "2023-12-29T15:30:00",
      content: "ㅋㅋㅋㅋㅋㅋ 메롱",
      replyComments: [
        {
          commentId: 45,
          memberId: 3,
          profileUrl: "/unnimm.jpg",
          nickName: "우라라",
          createdDate: "2023-12-29T15:30:00",
          content: "대댓글 테스트용",
        },
        {
          commentId: 31,
          memberId: 87,
          profileUrl: "/unnimm.jpg",
          nickName: "하이용",
          createdDate: "2023-12-30T15:30:00",
          content:
            "대댓글 테스트용 대댓글 테스트용 대댓글 테스트용 대댓글 테스트용 대댓글 테스트용 대댓글 테스트용 대댓글 테스트용",
        },
      ],
    },
    {
      commentId: 3,
      memberId: 12,
      profileUrl: "/unnimm.jpg",
      nickName: "휴학하고 싶다",
      createdDate: "2023-12-29T15:30:00",
      content: "ㅋㅋㅋㅋㅋㅋ 메롱",
      replyComments: [
        {
          commentId: 45,
          memberId: 3,
          profileUrl: "/unnimm.jpg",
          nickName: "우라라",
          createdDate: "2023-12-29T15:30:00",
          content: "대댓글 테스트용",
        },
        {
          commentId: 31,
          memberId: 87,
          profileUrl: "/unnimm.jpg",
          nickName: "하이용",
          createdDate: "2023-12-30T15:30:00",
          content: "대댓글 테스트용",
        },
      ],
    },
  ],
};
