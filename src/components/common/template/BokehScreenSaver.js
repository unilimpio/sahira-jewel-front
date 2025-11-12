import React from "react";

/**
 * BokehScreenSaver (Responsive)
 * Fondo animado tipo bokeh (gold/pinkgold)
 * - 100% responsive (usa viewBox + slice)
 * - Animaciones SMIL (sin <style>, compatible con SVGR)
 * - Props: colors, intensity, speed
 */

const BokehScreenSaver = ({
  goldColor = "#FFD86B",
  pinkColor = "#F2B7A9",
  intensity = 0.6,
  speed = 0.5,
  className = "fixed -top-6 left-0 w-screen -z-40",
  style = {},
}) => {
  const dur = (s) => `${(s / speed).toFixed(1)}s`;
  const opacityScale = (v) => Math.min(1, v * intensity).toFixed(2);

  return (
    <div
      className={className}
      
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
    
      >
        <defs>
          {/* Fondo base */}
          <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a0c09" />
            <stop offset="50%" stopColor="#2b0e10" />
            <stop offset="100%" stopColor="#120606" />
          </linearGradient>

          {/* Gradientes de luz */}
          <radialGradient id="gold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff6cf" />
            <stop offset="40%" stopColor={goldColor} />
            <stop offset="100%" stopColor="#B48A1D" stopOpacity="0.6" />
          </radialGradient>

          <radialGradient id="pinkgold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff2ee" />
            <stop offset="40%" stopColor={pinkColor} />
            <stop offset="100%" stopColor="#C98A7D" stopOpacity="0.6" />
          </radialGradient>

          <filter id="blurBig">
            <feGaussianBlur stdDeviation="36" />
          </filter>
          <filter id="blurMed">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id="blurSmall">
            <feGaussianBlur stdDeviation="8" />
          </filter>

          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="60%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.45)" />
          </radialGradient>
        </defs>

        {/* Fondo */}
        <rect width="1200" height="800" fill="url(#bg)" />

        {/* Grandes */}
        <g filter="url(#blurBig)" opacity="0.9">
          <circle cx="300" cy="200" r="180" fill="url(#gold)" opacity="0.3">
            <animate
              attributeName="opacity"
              values={`${opacityScale(0.18)};${opacityScale(
                0.92
              )};${opacityScale(0.18)}`}
              dur={dur(8)}
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="160;220;160"
              dur={dur(8)}
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              values="300;360;300"
              dur={dur(22)}
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="200;170;200"
              dur={dur(28)}
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="950" cy="150" r="220" fill="url(#pinkgold)" opacity="0.22">
            <animate
              attributeName="opacity"
              values={`${opacityScale(0.12)};${opacityScale(
                0.86
              )};${opacityScale(0.12)}`}
              dur={dur(9.5)}
              repeatCount="indefinite"
              begin="1.2s"
            />
            <animate
              attributeName="r"
              values="190;260;190"
              dur={dur(9.5)}
              repeatCount="indefinite"
              begin="1.2s"
            />
            <animate
              attributeName="cx"
              values="950;880;950"
              dur={dur(30)}
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="150;130;150"
              dur={dur(25)}
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Medianos */}
        <g filter="url(#blurMed)" opacity="0.98">
          <circle cx="450" cy="340" r="110" fill="url(#pinkgold)" opacity="0.35">
            <animate
              attributeName="opacity"
              values={`${opacityScale(0.18)};${opacityScale(
                0.9
              )};${opacityScale(0.18)}`}
              dur={dur(6)}
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="85;130;85"
              dur={dur(6)}
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="750" cy="250" r="90" fill="url(#gold)" opacity="0.34">
            <animate
              attributeName="opacity"
              values={`${opacityScale(0.2)};${opacityScale(
                0.95
              )};${opacityScale(0.2)}`}
              dur={dur(3.9)}
              repeatCount="indefinite"
              begin="0.4s"
            />
            <animate
              attributeName="r"
              values="70;110;70"
              dur={dur(5.4)}
              repeatCount="indefinite"
              begin="0.4s"
            />
          </circle>
           <circle cx="850" cy="650" r="90" fill="url(#gold)" opacity="0.34">
            <animate
              attributeName="opacity"
              values={`${opacityScale(0.2)};${opacityScale(
                0.95
              )};${opacityScale(0.2)}`}
              dur={dur(5.2)}
              repeatCount="indefinite"
              begin="0.4s"
            />
            <animate
              attributeName="r"
              values="70;110;70"
              dur={dur(4.8)}
              repeatCount="indefinite"
              begin="0.4s"
            />
          </circle>
        </g>

        {/* Pequeños */}
        <g filter="url(#blurSmall)" opacity="0.98">
          <circle cx="180" cy="620" r="40" fill="url(#pinkgold)" opacity="0.6">
            <animate
              attributeName="opacity"
              values={`${opacityScale(0.18)};${opacityScale(
                0.92
              )};${opacityScale(0.18)}`}
              dur={dur(2.9)}
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="30;46;30"
              dur={dur(3.6)}
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="980" cy="620" r="40" fill="url(#pinkgold)" opacity="0.6">
            <animate
              attributeName="opacity"
              values={`${opacityScale(0.18)};${opacityScale(
                0.92
              )};${opacityScale(0.18)}`}
              dur={dur(3.6)}
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="30;46;30"
              dur={dur(4.1)}
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="680" cy="420" r="40" fill="url(#pinkgold)" opacity="0.6">
            <animate
              attributeName="opacity"
              values={`${opacityScale(0.18)};${opacityScale(
                0.92
              )};${opacityScale(0.18)}`}
              dur={dur(3.2)}
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="30;46;30"
              dur={dur(3.6)}
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="560" cy="140" r="36" fill="url(#gold)" opacity="0.66">
            <animate
              attributeName="opacity"
              values={`${opacityScale(0.2)};${opacityScale(
                0.98
              )};${opacityScale(0.2)}`}
              dur={dur(4.2)}
              repeatCount="indefinite"
              begin="0.5s"
            />
            <animate
              attributeName="r"
              values="24;44;24"
              dur={dur(4.2)}
              repeatCount="indefinite"
              begin="0.5s"
            />
          </circle>
        </g>

        {/* Vignette */}
        <rect width="1200" height="800" fill="url(#vignette)" opacity="0.7" />
      </svg>
    </div>
  );
};

export default BokehScreenSaver;
