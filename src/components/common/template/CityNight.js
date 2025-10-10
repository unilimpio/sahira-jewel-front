import { ReactComponent as CitySVG } from '../../../assets/city-night.svg';

const CityNight = () => {
  return (
    <div className=" fixed -top-6 left-0 -z-40 scale-y-95 bg-slate-900">
      <CitySVG />
    </div>
  );
};

export default CityNight;