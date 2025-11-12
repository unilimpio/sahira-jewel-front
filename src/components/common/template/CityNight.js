import { ReactComponent as CitySVG } from '../../../assets/city-night.svg';

const CityNight = () => {
  return (
    <div className=" fixed -top-6 left-0 w-screen -z-50 bg-slate-900 opacity-75">
      <CitySVG />
    </div>
  );
};

export default CityNight;