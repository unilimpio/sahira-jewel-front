import { ReactComponent as CitySVG } from '../../../assets/city-sunny.svg';

const CityBackground = () => {
  return (
    <div className=" fixed w-screen h-screen top-0 left-0 -z-40">
      <CitySVG />
    </div>
  );
};

export default CityBackground;