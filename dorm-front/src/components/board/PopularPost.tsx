interface Props {
  title: string;
}
const PopularPost = (props: Props) => {
  const { title } = props;
  return (
    <div className="flex rounded-[20px] bg-gray0 py-2 px-4 gap-x-2 text-h5">
      <div className="text-primary font-semibold">인기글</div>
      <div className="truncate">{title}</div>
    </div>
  );
};
export default PopularPost;
