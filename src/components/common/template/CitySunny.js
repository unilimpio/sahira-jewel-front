import { ReactComponent as CitySVG } from '../../../assets/city-sunny.svg';

const CitySunny = () => {
  return (
    <div className=" fixed w-screen h-screen -top-6 left-0 -z-50 opacity-75">
      <CitySVG />
    </div>
  );
};

export default CitySunny;