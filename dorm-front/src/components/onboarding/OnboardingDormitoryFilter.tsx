import React from "react";

interface Props {
  contents: string[];
  setPostData:
  isClickFilter:
}
const ProfileFilter = (props: Props) => {
  const { contents, isClickFilter, setPostData } = props;

  const updatePostData = () => {

  }

  return (
    <>
      <div className="absolute top-20 bg-white z-10 w-full rounded-[20px] border-[1px] border-gray1">
        {contents.map((content, index) => {
          return (
            <div
              key={index}
              className="py-3 px-4 hover:bg-gray0"
              onClick={() => {

              }}>
              {content}
            </div>
          );
        })}
      </div>

    </>
  );
};
export default ProfileFilter;
