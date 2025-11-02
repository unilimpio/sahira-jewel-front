import { ReactComponent as CitySVG } from '../../../assets/city-rainy.svg';

const CityRainy = ({isNight}) => {
  return (
    <div className={`fixed -top-24 left-0 -z-40  ${isNight?('bg-zinc-900'):('bg-slate-400')}`}>
      <CitySVG />
    </div>
  );
};

export default CityRainy;