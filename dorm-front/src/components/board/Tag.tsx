interface Props {
  children: React.ReactNode;
}
const Tag = (props: Props) => {
  const { children } = props;

  return <div className="rounded-full bg-gray0 px-4 py-1 text-h5 text-gray5">#{children}</div>;
};
export default Tag;
