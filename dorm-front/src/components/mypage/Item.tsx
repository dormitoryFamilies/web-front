interface Props {
  title: string;
  contents: string[];
  Icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}
const Item = (props: Props) => {
  const { title, contents, Icon } = props;
  return (
    <div className={"border-[1px] border-gray1 rounded-[24px] py-4 px-5"}>
      <div className={"text-h5 text-gray4"}>{title}</div>
      {contents
        ? contents.map((content, index) => {
            return contents.length - 1 === index ? (
              <div className={"flex justify-between items-center pt-4"}>
                <div className={"text-h4"}>{content}</div>
                {Icon ? <Icon /> : <div>1.123.1</div>}
              </div>
            ) : (
              <div className={"flex justify-between items-center py-4 border-gray1 border-b-[1px]"}>
                <div className={"text-h4"}>{content}</div>
                {Icon ? <Icon /> : <div>1.123.1</div>}
              </div>
            );
          })
        : null}
    </div>
  );
};
export default Item;
