import { ReactComponent as CitySVG } from '../../../assets/city-rainy.svg';

const CityRainy = ({isNight}) => {
  return (
    <div className={`fixed -top-12 left-0 -z-50 w-screen opacity-50  ${isNight?('bg-zinc-900'):('bg-slate-400')}`}>
      <CitySVG />
    </div>
  );
};

export default CityRainy;