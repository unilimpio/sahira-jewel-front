import { ReactComponent as CitySVG } from '../../../assets/city-sunny.svg';

const CitySunny = () => {
  return (
    <div className=" fixed w-screen h-screen top-0 left-0 -z-40">
      <CitySVG />
    </div>
  );
};

export default CitySunny;