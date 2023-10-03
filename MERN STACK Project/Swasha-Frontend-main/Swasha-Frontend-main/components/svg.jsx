export function HeartWithNumber({ size, ...other }) {
  return (
    <svg
      className="fill-white cursor-pointer"
      viewBox="0 0 512 437.85"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: size, transform: "scale(0.92)" }}
      {...other}
    >
      <path d="m47.6 258.25 180.7 168.7c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9l180.7-168.7c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141-45.6-7.6-92 7.3-124.6 39.9l-12 12-12-12c-32.6-32.6-79-47.5-124.6-39.9-68.9 11.5-119.4 71.1-119.4 141v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
    </svg>
  );
}

export function Person({ size, ...other }) {
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   viewBox="0 0 448 512"
    //   className="w-[18.75px] h-[18.75px] md:w-[30px] md:h-[30px] fill-white cursor-pointer"
    //   {...other}
    // >
    //   <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
    // </svg>
    <svg
      className="fill-white cursor-pointer"
      aria-hidden="true"
      data-icon="fa-user-alt"
      data-prefix="far"
      focusable="false"
      role="img"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: size }}
      {...other}
    >
      <path d="m256 288c79.5 0 144-64.5 144-144s-64.5-144-144-144-144 64.5-144 144 64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-55.1c-70.7 0-128 57.3-128 128v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z" />
    </svg>
  );
}

export function CartSVG({ size, ...other }) {
  return (
    <svg
      className="fill-white cursor-pointer"
      style={{
        height: size,
        // transform: "scale(1.05) translate(0,-2px)",
      }}
      viewBox="0 0 576 512"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <path d="m0 24c0-13.3 10.7-24 24-24h45.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3h-288.5l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5h288.3c13.3 0 24 10.7 24 24s-10.7 24-24 24h-288.3c-34.6 0-64.3-24.6-70.7-58.5l-51.6-271c-0.7-3.8-4-6.5-7.9-6.5h-45.5c-13.3 0-24-10.7-24-24zm128 440a48 48 0 1 1 96 0 48 48 0 1 1-96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
    </svg>
  );
}

export function Hamburger({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-[15px] ${className}`}
      viewBox="0 0 23 16"
    >
      <g
        id="Group_1436"
        data-name="Group 1436"
        transform="translate(-12972 68)"
      >
        <path
          id="Line_217"
          data-name="Line 217"
          d="M21,1H0A1,1,0,0,1-1,0,1,1,0,0,1,0-1H21a1,1,0,0,1,1,1A1,1,0,0,1,21,1Z"
          transform="translate(12973 -67)"
          fill="#fff"
        />
        <path
          id="Path_2701"
          data-name="Path 2701"
          d="M16.1,1H0A1,1,0,0,1-1,0,1,1,0,0,1,0-1H16.1a1,1,0,0,1,1,1A1,1,0,0,1,16.1,1Z"
          transform="translate(12973 -60)"
          fill="#fff"
        />
        <path
          id="Path_2702"
          data-name="Path 2702"
          d="M11.156,1H0A1,1,0,0,1-1,0,1,1,0,0,1,0-1H11.156a1,1,0,0,1,1,1A1,1,0,0,1,11.156,1Z"
          transform="translate(12973 -53)"
          fill="#fff"
        />
      </g>
    </svg>
  );
}

export function HeartCircle({ active, className, ...other }) {
  return (
    <svg
      version="1.1"
      viewBox="0 0 63 63"
      xmlns="http://www.w3.org/2000/svg"
      className={`cursor-pointer ${className}`}
      {...other}
    >
      <defs>
        <filter
          id="Path_71"
          x={0}
          y={0}
          width={63}
          height={63}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy={1} input="SourceAlpha" />
          <feGaussianBlur result="blur" stdDeviation={3} />
          <feFlood floodOpacity=".161" />
          <feComposite in2="blur" operator="in" result="result1" />
          <feComposite in="SourceGraphic" in2="result1" />
        </filter>
      </defs>
      <g transform="translate(9,8)" data-name="Component 13 – 28">
        <g transform="translate(-9,-8)" filter="url(#Path_71)">
          <path
            transform="translate(9,8)"
            d="M 22.5,0 A 22.5,22.5 0 1 1 0,22.5 22.5,22.5 0 0 1 22.5,0 Z"
            fill="#fff"
            data-name="Path 71"
          />
        </g>
        <g transform="translate(-745,-311)" data-name="Group 199">
          <g
            id="Icon_awesome-heart"
            transform="translate(755.5,323)"
            data-name="Icon awesome-heart"
          >
            <path
              transform="translate(.001 -2.248)"
              d="m21.67 3.684a6.41 6.41 0 0 0-8.747 0.637l-0.923 0.952-0.923-0.952a6.41 6.41 0 0 0-8.747-0.637 6.731 6.731 0 0 0-0.464 9.745l9.07 9.365a1.47 1.47 0 0 0 2.123 0l9.07-9.365a6.727 6.727 0 0 0-0.459-9.745z"
              fill={active ? "#E0115F" : "#b7b7b7"}
              data-name="Icon awesome-heart"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
export function LogoForHeader1({width,height}) {
  const svgWidth = width || '38.75';
  const svgHeight = height || '51.578';
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={svgWidth}
      height={svgHeight}
      viewBox="0 0 38.75 51.578"
    >
      <defs></defs>
      <g id="Group_114" data-name="Group 114" clipPath="url(#clip-path)">
        <path
          id="Path_39"
          data-name="Path 39"
          d="M38.75,25.474l-6.458,4.093L12.917,18.643,18.831,14.6l13.461,7.772V14.289L19.375,6.831,6.458,14.289v8.085L25.289,33.246l-6.458,3.731L0,26.1V10.558L19.375,0,38.75,11.185Z"
          fill="#003c7a"
          fillRule="evenodd"
        />
        <path
          id="Path_40"
          data-name="Path 40"
          d="M38.75,109.12v6.831L19.375,127.139l-6.458-3.731L0,116.578V109.12l19.375,11.185L38.75,109.12"
          transform="translate(0 -75.561)"
          fill="#003c7a"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
}

export function LogoForHeader2({width,height}) {
  const svgWidth = width || '140';
  const svgHeight = height || '32';
  return (
    <svg
      id="Group_532"
      data-name="Group 532"
      xmlns="http://www.w3.org/2000/svg"
      width={svgWidth}
      height={svgHeight}
      viewBox="0 0 169.885 32.043"
    >
      <defs></defs>
      <g
        id="Group_250"
        data-name="Group 250"
        transform="translate(0 0)"
        clipPath="url(#clip-path)"
      >
        <path
          id="Path_175"
          data-name="Path 175"
          d="M.086,28.668a1.791,1.791,0,0,1,2.395-1.089,15.1,15.1,0,0,0,5.657,1.145c4.243,0,6.722-2.167,6.722-5.3,0-2.9-1.716-4.565-6.054-6.178C3.562,15.445.32,12.817.32,8.437.32,3.6,4.467,0,10.712,0a17.064,17.064,0,0,1,5.51.83A1.7,1.7,0,0,1,17.3,3,1.794,1.794,0,0,1,15,4.068a13.374,13.374,0,0,0-4.431-.749c-4.386,0-6.055,2.536-6.055,4.656,0,2.9,1.955,4.334,6.388,5.993,5.435,2.029,8.2,4.565,8.2,9.13,0,4.794-3.671,8.944-11.251,8.944A19.132,19.132,0,0,1,1.079,30.78a1.7,1.7,0,0,1-1-2.083Z"
          transform="translate(0 0)"
          fill="#003c7a"
        />
        <path
          id="Path_176"
          data-name="Path 176"
          d="M51.713,30.817,44.465,3.189a1.738,1.738,0,0,1,1.727-2.148h.682a1.772,1.772,0,0,1,1.736,1.33L52.1,16.763c.953,3.873,1.811,7.746,2.383,10.743h.1c.524-3.09,1.525-6.778,2.622-10.789l3.94-14.393a1.773,1.773,0,0,1,1.723-1.283h1.561a1.771,1.771,0,0,1,1.733,1.322L69.74,16.809c.906,3.689,1.764,7.377,2.241,10.651h.1c.668-3.413,1.573-6.87,2.574-10.743L78.545,2.328a1.774,1.774,0,0,1,1.724-1.287h.509a1.736,1.736,0,0,1,1.715,2.194L74.4,30.863a1.775,1.775,0,0,1-1.715,1.254H71.095A1.771,1.771,0,0,1,69.363,30.8L65.64,15.933a90.92,90.92,0,0,1-2.1-10.143h-.1a94.429,94.429,0,0,1-2.479,10.143L56.751,30.847a1.774,1.774,0,0,1-1.719,1.269H53.44a1.772,1.772,0,0,1-1.727-1.3"
          transform="translate(-22.037 -0.534)"
          fill="#003c7a"
        />
        <path
          id="Path_177"
          data-name="Path 177"
          d="M126.959,23.686l-2.419,7.086a2.02,2.02,0,0,1-1.923,1.344,1.969,1.969,0,0,1-1.917-2.588l9.541-27.159a2.021,2.021,0,0,1,1.917-1.328h2.106a2.022,2.022,0,0,1,1.916,1.326l9.583,27.159a1.969,1.969,0,0,1-1.916,2.591h-.152a2.02,2.02,0,0,1-1.917-1.328l-2.5-7.117a2.02,2.02,0,0,0-1.917-1.329h-8.479a2.02,2.02,0,0,0-1.923,1.344"
          transform="translate(-59.838 -0.534)"
          fill="#003c7a"
        />
        <path
          id="Path_178"
          data-name="Path 178"
          d="M179.3,28.668a1.791,1.791,0,0,1,2.394-1.089,15.1,15.1,0,0,0,5.657,1.145c4.243,0,6.721-2.167,6.721-5.3,0-2.9-1.716-4.565-6.054-6.178-5.244-1.8-8.486-4.426-8.486-8.807C179.529,3.6,183.677,0,189.922,0a17.064,17.064,0,0,1,5.51.83A1.7,1.7,0,0,1,196.508,3h0a1.8,1.8,0,0,1-2.3,1.065,13.374,13.374,0,0,0-4.431-.749c-4.386,0-6.054,2.536-6.054,4.656,0,2.9,1.954,4.334,6.388,5.993,5.435,2.029,8.2,4.565,8.2,9.13,0,4.794-3.671,8.944-11.251,8.944a19.131,19.131,0,0,1-6.773-1.263,1.7,1.7,0,0,1-1-2.083Z"
          transform="translate(-88.926 0)"
          fill="#003c7a"
        />
        <path
          id="Path_179"
          data-name="Path 179"
          d="M232.532,3.046v8.99a2.041,2.041,0,0,0,2.074,2.006H246a2.041,2.041,0,0,0,2.074-2.006V3.046a2.041,2.041,0,0,1,2.074-2.005h.048a2.041,2.041,0,0,1,2.074,2.005V30.111a2.041,2.041,0,0,1-2.074,2.005h-.048a2.041,2.041,0,0,1-2.074-2.005V19.552A2.04,2.04,0,0,0,246,17.547H234.605a2.04,2.04,0,0,0-2.074,2.005V30.111a2.075,2.075,0,0,1-4.148,0V3.046a2.075,2.075,0,0,1,4.148,0"
          transform="translate(-113.327 -0.534)"
          fill="#003c7a"
        />
        <path
          id="Path_180"
          data-name="Path 180"
          d="M293.167,23.525l-2.53,7.408a1.778,1.778,0,0,1-1.692,1.183h-.514a1.733,1.733,0,0,1-1.687-2.278L296.449,2.21a1.78,1.78,0,0,1,1.688-1.169h2.454a1.778,1.778,0,0,1,1.686,1.167l9.748,27.628a1.733,1.733,0,0,1-1.687,2.28h-.666a1.779,1.779,0,0,1-1.688-1.169l-2.611-7.436a1.779,1.779,0,0,0-1.688-1.169h-8.828a1.777,1.777,0,0,0-1.692,1.183"
          transform="translate(-142.238 -0.534)"
          fill="#003c7a"
        />
      </g>
    </svg>
  );
}

export function LogoForHeaderSmall() {
  return (
    <svg
      id="Group_532"
      data-name="Group 532"
      xmlns="http://www.w3.org/2000/svg"
      width="90"
      height="25"
      viewBox="0 0 169.885 32.043"
    >
      <defs></defs>
      <g
        id="Group_250"
        data-name="Group 250"
        transform="translate(0 0)"
        clipPath="url(#clip-path)"
      >
        <path
          id="Path_175"
          data-name="Path 175"
          d="M.086,28.668a1.791,1.791,0,0,1,2.395-1.089,15.1,15.1,0,0,0,5.657,1.145c4.243,0,6.722-2.167,6.722-5.3,0-2.9-1.716-4.565-6.054-6.178C3.562,15.445.32,12.817.32,8.437.32,3.6,4.467,0,10.712,0a17.064,17.064,0,0,1,5.51.83A1.7,1.7,0,0,1,17.3,3,1.794,1.794,0,0,1,15,4.068a13.374,13.374,0,0,0-4.431-.749c-4.386,0-6.055,2.536-6.055,4.656,0,2.9,1.955,4.334,6.388,5.993,5.435,2.029,8.2,4.565,8.2,9.13,0,4.794-3.671,8.944-11.251,8.944A19.132,19.132,0,0,1,1.079,30.78a1.7,1.7,0,0,1-1-2.083Z"
          transform="translate(0 0)"
          fill="#003c7a"
        />
        <path
          id="Path_176"
          data-name="Path 176"
          d="M51.713,30.817,44.465,3.189a1.738,1.738,0,0,1,1.727-2.148h.682a1.772,1.772,0,0,1,1.736,1.33L52.1,16.763c.953,3.873,1.811,7.746,2.383,10.743h.1c.524-3.09,1.525-6.778,2.622-10.789l3.94-14.393a1.773,1.773,0,0,1,1.723-1.283h1.561a1.771,1.771,0,0,1,1.733,1.322L69.74,16.809c.906,3.689,1.764,7.377,2.241,10.651h.1c.668-3.413,1.573-6.87,2.574-10.743L78.545,2.328a1.774,1.774,0,0,1,1.724-1.287h.509a1.736,1.736,0,0,1,1.715,2.194L74.4,30.863a1.775,1.775,0,0,1-1.715,1.254H71.095A1.771,1.771,0,0,1,69.363,30.8L65.64,15.933a90.92,90.92,0,0,1-2.1-10.143h-.1a94.429,94.429,0,0,1-2.479,10.143L56.751,30.847a1.774,1.774,0,0,1-1.719,1.269H53.44a1.772,1.772,0,0,1-1.727-1.3"
          transform="translate(-22.037 -0.534)"
          fill="#003c7a"
        />
        <path
          id="Path_177"
          data-name="Path 177"
          d="M126.959,23.686l-2.419,7.086a2.02,2.02,0,0,1-1.923,1.344,1.969,1.969,0,0,1-1.917-2.588l9.541-27.159a2.021,2.021,0,0,1,1.917-1.328h2.106a2.022,2.022,0,0,1,1.916,1.326l9.583,27.159a1.969,1.969,0,0,1-1.916,2.591h-.152a2.02,2.02,0,0,1-1.917-1.328l-2.5-7.117a2.02,2.02,0,0,0-1.917-1.329h-8.479a2.02,2.02,0,0,0-1.923,1.344"
          transform="translate(-59.838 -0.534)"
          fill="#003c7a"
        />
        <path
          id="Path_178"
          data-name="Path 178"
          d="M179.3,28.668a1.791,1.791,0,0,1,2.394-1.089,15.1,15.1,0,0,0,5.657,1.145c4.243,0,6.721-2.167,6.721-5.3,0-2.9-1.716-4.565-6.054-6.178-5.244-1.8-8.486-4.426-8.486-8.807C179.529,3.6,183.677,0,189.922,0a17.064,17.064,0,0,1,5.51.83A1.7,1.7,0,0,1,196.508,3h0a1.8,1.8,0,0,1-2.3,1.065,13.374,13.374,0,0,0-4.431-.749c-4.386,0-6.054,2.536-6.054,4.656,0,2.9,1.954,4.334,6.388,5.993,5.435,2.029,8.2,4.565,8.2,9.13,0,4.794-3.671,8.944-11.251,8.944a19.131,19.131,0,0,1-6.773-1.263,1.7,1.7,0,0,1-1-2.083Z"
          transform="translate(-88.926 0)"
          fill="#003c7a"
        />
        <path
          id="Path_179"
          data-name="Path 179"
          d="M232.532,3.046v8.99a2.041,2.041,0,0,0,2.074,2.006H246a2.041,2.041,0,0,0,2.074-2.006V3.046a2.041,2.041,0,0,1,2.074-2.005h.048a2.041,2.041,0,0,1,2.074,2.005V30.111a2.041,2.041,0,0,1-2.074,2.005h-.048a2.041,2.041,0,0,1-2.074-2.005V19.552A2.04,2.04,0,0,0,246,17.547H234.605a2.04,2.04,0,0,0-2.074,2.005V30.111a2.075,2.075,0,0,1-4.148,0V3.046a2.075,2.075,0,0,1,4.148,0"
          transform="translate(-113.327 -0.534)"
          fill="#003c7a"
        />
        <path
          id="Path_180"
          data-name="Path 180"
          d="M293.167,23.525l-2.53,7.408a1.778,1.778,0,0,1-1.692,1.183h-.514a1.733,1.733,0,0,1-1.687-2.278L296.449,2.21a1.78,1.78,0,0,1,1.688-1.169h2.454a1.778,1.778,0,0,1,1.686,1.167l9.748,27.628a1.733,1.733,0,0,1-1.687,2.28h-.666a1.779,1.779,0,0,1-1.688-1.169l-2.611-7.436a1.779,1.779,0,0,0-1.688-1.169h-8.828a1.777,1.777,0,0,0-1.692,1.183"
          transform="translate(-142.238 -0.534)"
          fill="#003c7a"
        />
      </g>
    </svg>
  );
}


export function Arrow({color}) {
  if(color === "Blue"){
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="170"
      height="40"
      viewBox="0 0 225 45"
    >
      <g
        id="Path_304"
        data-name="Path 304"
        transform="translate(0 0.264)"
        fill="#003c7a"
      >
        <path d="M 185.832275390625 44.236328125 L 1.859167575836182 44.236328125 L 39.19930648803711 22.58588409423828 L 39.94772338867188 22.15191078186035 L 39.19808197021484 21.72007751464844 L 1.904045820236206 0.236328125 L 185.8652191162109 0.236328125 L 223.9991149902344 22.14139938354492 L 185.832275390625 44.236328125 Z" />
        <path
          d="M 3.773681640625 0.736328125 L 40.94694519042969 22.15050506591797 L 3.718276977539062 43.736328125 L 185.697998046875 43.736328125 L 222.9982299804688 22.14310264587402 L 185.7318267822266 0.736328125 L 3.773681640625 0.736328125 M 0.0344085693359375 -0.263671875 L 185.9985961914062 -0.263671875 L 225 22.13973999023438 L 185.966552734375 44.736328125 L 0 44.736328125 L 38.94847106933594 22.15332794189453 L 0.0344085693359375 -0.263671875 Z"
          fill="#fff"
        />
      </g>
    </svg>
  );}
  else if(color === "Gray"){
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="170"
        height="40"
        viewBox="0 0 225 45"
      >
        <g
          id="Path_303"
          data-name="Path 303"
          transform="translate(0 0.264)"
          fill="#e5e5e5"
        >
          <path d="M 185.832275390625 44.236328125 L 1.859167575836182 44.236328125 L 39.19930648803711 22.58588409423828 L 39.94772338867188 22.15191078186035 L 39.19808197021484 21.72007751464844 L 1.904045820236206 0.236328125 L 185.8652191162109 0.236328125 L 223.9991149902344 22.14139938354492 L 185.832275390625 44.236328125 Z" />
          <path
            d="M 3.773681640625 0.736328125 L 40.94694519042969 22.15050506591797 L 3.718276977539062 43.736328125 L 185.697998046875 43.736328125 L 222.9982299804688 22.14310264587402 L 185.7318267822266 0.736328125 L 3.773681640625 0.736328125 M 0.0344085693359375 -0.263671875 L 185.9985961914062 -0.263671875 L 225 22.13973999023438 L 185.966552734375 44.736328125 L 0 44.736328125 L 38.94847106933594 22.15332794189453 L 0.0344085693359375 -0.263671875 Z"
            fill="#fff"
          />
        </g>
      </svg>
    );
  }
  else{
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="170"
        height="40"
        viewBox="0 0 225 45"
      >
        <g
          id="Path_303"
          data-name="Path 303"
          transform="translate(0 0.264)"
          fill="#FF0000"
        >
          <path d="M 185.832275390625 44.236328125 L 1.859167575836182 44.236328125 L 39.19930648803711 22.58588409423828 L 39.94772338867188 22.15191078186035 L 39.19808197021484 21.72007751464844 L 1.904045820236206 0.236328125 L 185.8652191162109 0.236328125 L 223.9991149902344 22.14139938354492 L 185.832275390625 44.236328125 Z" />
          <path
            d="M 3.773681640625 0.736328125 L 40.94694519042969 22.15050506591797 L 3.718276977539062 43.736328125 L 185.697998046875 43.736328125 L 222.9982299804688 22.14310264587402 L 185.7318267822266 0.736328125 L 3.773681640625 0.736328125 M 0.0344085693359375 -0.263671875 L 185.9985961914062 -0.263671875 L 225 22.13973999023438 L 185.966552734375 44.736328125 L 0 44.736328125 L 38.94847106933594 22.15332794189453 L 0.0344085693359375 -0.263671875 Z"
            fill="#fff"
          />
        </g>
      </svg>
    );
  }
}


export function WhiteArrow2() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="170"
      height="40"
      viewBox="0 0 225 45"
    >
      <g
        id="Path_302"
        data-name="Path 302"
        transform="translate(0 0.264)"
        fill="#e5e5e5"
      >
        <path d="M 185.832275390625 44.236328125 L 0.5 44.236328125 L 0.5 22.53549385070801 L 0.5 0.236328125 L 185.8652191162109 0.236328125 L 223.9991149902344 22.14139938354492 L 185.832275390625 44.236328125 Z" />
        <path
          d="M 1 0.736328125 L 1 43.736328125 L 185.697998046875 43.736328125 L 222.9982299804688 22.14310264587402 L 185.7318267822266 0.736328125 L 1 0.736328125 M 0 -0.263671875 L 185.9985961914062 -0.263671875 L 225 22.13973999023438 L 185.966552734375 44.736328125 L 0 44.736328125 L 0 -0.263671875 Z"
          fill="#fff"
        />
      </g>
    </svg>
  );
}

export function LeftArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function Home() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4 mx-1"
    >
      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
    </svg>
  );
}

export function Office() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4 mx-1"
    >
      <path
        fillRule="evenodd"
        d="M3 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5H15v-18a.75.75 0 000-1.5H3zM6.75 19.5v-2.25a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75zM6 6.75A.75.75 0 016.75 6h.75a.75.75 0 010 1.5h-.75A.75.75 0 016 6.75zM6.75 9a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM6 12.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 6a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm-.75 3.75A.75.75 0 0110.5 9h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 12a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM16.5 6.75v15h5.25a.75.75 0 000-1.5H21v-12a.75.75 0 000-1.5h-4.5zm1.5 4.5a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm.75 2.25a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75h-.008zM18 17.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function Others() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4 mx-2"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM6.262 6.072a8.25 8.25 0 1010.562-.766 4.5 4.5 0 01-1.318 1.357L14.25 7.5l.165.33a.809.809 0 01-1.086 1.085l-.604-.302a1.125 1.125 0 00-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 01-2.288 4.04l-.723.724a1.125 1.125 0 01-1.298.21l-.153-.076a1.125 1.125 0 01-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 01-.21-1.298L9.75 12l-1.64-1.64a6 6 0 01-1.676-3.257l-.172-1.03z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function RadioButton({
  checked = false,
  diameter = "1.6rem",
  ...other
}) {
  return (
    <svg
      style={{ height: diameter, width: diameter, cursor: "pointer" }}
      version="1.1"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <circle cx="15" cy="15" r="15" strokeWidth="3" fill="#0077DD" />
      <circle cx="15" cy="15" r="12.5" strokeWidth="3" fill="white" />
      {checked && <circle cx="15" cy="15" r="9" fill="#0077DD" />}
    </svg>
  );
}

export function SquareRadioButton({
  checked = false,
  sideLength = "1.5rem",
  ...other
}) {
  return (
    <svg
      style={{ height: sideLength, width: sideLength, cursor: "pointer" }}
      version="1.1"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <rect
        x="3"
        y="3"
        width="24"
        height="24"
        strokeWidth="0.5"
        fill="black"
        rx="4" 
      />
      <rect
        x="6"
        y="6"
        width="18"
        height="18"
        strokeWidth="1"
        fill="white"
        rx="1" 
      />
      {checked && (
        <>
        <rect
          x="6"
          y="6"
          width="18"
          height="18"
          fill="#0077DD"
          strokeWidth="1"
          rx="1" 
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-3.5 -3 24 24"
          fill="white"
          width="22"
          height="22"
        >
          <path d="M9 16.17L4.83 12l-1.42 3.41L10 22 22 7l-3.41-2.41z" />
        </svg>
        </>
      )}
    </svg>
  );
}


export function BackButton({ style, ...props }) {
  return (
    <svg
      viewBox="0 0 24 19.8"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "2rem",
        backgroundColor: "#eee",
        padding: "0.65rem",
        borderRadius: "999px",
        cursor: "pointer",
        ...style,
      }}
      {...props}
    >
      <g
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        data-name="Icon feather-arrow-left"
      >
        <path
          d="M28.5 15.9h-21"
          data-name="Path 181"
          transform="translate(-6 -6)"
        />
        <path
          d="M14.85 24.3L7.5 15.9l7.35-8.4"
          data-name="Path 182"
          transform="translate(-6 -6)"
        />
      </g>
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg className="w-5 h-6 pt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
  )
}

export function HamIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 cursor-pointer mt-3 mr-3 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  )
}

export function DownArrowIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-7 ml-2 text-blue-500 ${className}`}>
      <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
    </svg>
  )
}

export function LeftArrowIcon() {
  return (
    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
  )
}

export function RightArrowIcon() {
  return (
    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
  )
}

export function DashboardIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  )
}

export function ProductIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-300">
      <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
    </svg>
  )
}

export function OrderIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-purple-600">
      <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
    </svg>
  )
}

export function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-orange-600">
      <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
    </svg>
  )
}

export function SettingIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-600">
      <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
    </svg>
  )
}

export function LogoutIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-100">
      <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clipRule="evenodd" />
    </svg>
  )
}

export function CancelIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 p-2 h-10">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export function EditIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`rounded-md shadow-md cursor-pointer bg-white p-2 absolute ${className}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    </svg>
  )
}

export function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute top-3 right-3">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )
}

export function Edit2Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[green]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  )
}

export function ViewIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 text-[blue] h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"  />
    </svg>
  )
}