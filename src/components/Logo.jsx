export default function Logo({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M32 5 L56 14 V31 C56 46 46 57 32 61 C18 57 8 46 8 31 V14 Z"
        fill="#0d0d0d"
        stroke="#d9793d"
        strokeWidth="2"
      />
      <path
        d="M32 11 L50 18 V31 C50 43 42.5 51.5 32 55 C21.5 51.5 14 43 14 31 V18 Z"
        fill="none"
        stroke="#d9793d"
        strokeWidth="1.4"
        opacity="0.6"
      />
      <path
        d="M20 24c1.5-4 4-6 6-6.5-1 2-1 3.5-.3 4.8C27 20.6 29.4 20 32 20s5 .6 6.3 2.3c.7-1.3.7-2.8-.3-4.8 2 .5 4.5 2.5 6 6.5-1.8-.6-3.4-.6-4.6.2 1.6 1.1 2.6 2.8 2.6 5-2-1.6-4-2-5.7-1.2 1 1.2 1.4 2.6 1 4.2-1.6-1.6-3.5-2.4-5.3-2.4s-3.7.8-5.3 2.4c-.4-1.6 0-3 1-4.2-1.7-.8-3.7-.4-5.7 1.2 0-2.2 1-3.9 2.6-5-1.2-.8-2.8-.8-4.6-.2Z"
        fill="#d9793d"
      />
      <circle cx="32" cy="33" r="6.2" fill="#d9793d" />
      <path
        d="M27.5 32.5c0-1.6 2-3 4.5-3s4.5 1.4 4.5 3-2 4.5-4.5 4.5-4.5-2.9-4.5-4.5Z"
        fill="#0d0d0d"
      />
    </svg>
  );
}
