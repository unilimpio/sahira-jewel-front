import { ReactComponent as CitySVG } from '../../../assets/city-rainy.svg';

const CityRainy = ({isNight}) => {
  return (
    <div className={`fixed -top-6 left-0 -z-40  scale-y-95 ${isNight?('bg-slate-600'):('bg-slate-400')}`}>
      <CitySVG />
    </div>
  );
};

export default CityRainy;