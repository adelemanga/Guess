import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Timer(props) {
  console.info(">", props);
  const { time } = props;
  const [counter, setCounter] = useState(time);
  //   console.info(props.time);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div>
      <div className="textTimer"> {counter} s</div>
    </div>
  );
}

Timer.propTypes = {
  time: PropTypes.string.isRequired,
};

export default Timer;
