import { InnerBar, OuterBar, ProgressNumber } from "./progressbar.styles";

const ProgressBar = (props) => {
  const { goal, current } = props;
  const progressPercentage = (current / goal) * 100;

  return (
    <OuterBar>
      <ProgressNumber progress={progressPercentage}>{Math.round(progressPercentage)}%</ProgressNumber>
      <InnerBar progress={progressPercentage}></InnerBar>
    </OuterBar>
  );
};

export default ProgressBar;
