import Countdown from 'react-countdown';
import renderer from '../pages/Home/containers/TimerRenderer';

const CountdownTimer = () => (
  <Countdown date={Date.now() + 5000} renderer={renderer} />
);

export default CountdownTimer;
