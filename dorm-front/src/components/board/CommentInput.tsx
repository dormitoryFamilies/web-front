const CommentInput = () => {
  return (
    <div className="flex w-full rounded-[22px] py-2 pr-2 pl-4 bg-gray0 text-h5 justify-between">
      <input placeholder={"댓글을 남겨주세요"} className="bg-gray0 rounded-[22px] py-2 focus:outline-0"></input>
      <button type={"submit"} className="px-4 py-2 bg-primary text-white rounded-full">
        등록
      </button>
    </div>
  );
};
export default CommentInput;
