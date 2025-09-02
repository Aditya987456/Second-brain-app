const DarkmodeButton = () => {
  return (
    <div className="cursor-pointer p-2 rounded-full hover:bg-gray-200 dark:hover:bg-purple-200 bg-purple-100 transition">
      <svg
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        className="w-6 h-6 text-gray-900  dark:text-black"
      >
        <path
          d="M31.75,6.479c6.7339,3.8881,10.3177,11.5721,8.969,19.23-1.3496,7.6616-7.3484,13.6604-15.01,15.01-7.6579,1.3487-15.3419-2.2351-19.23-8.969"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32.02,6.75c4.1858,7.2511,2.98,16.4095-2.94,22.33-5.9205,5.92-15.0789,7.1258-22.33,2.94"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M10,8v4" strokeLinecap="round" />
        <path d="M8,10h4" strokeLinecap="round" />
        <path d="M12,18v3" strokeLinecap="round" />
        <path d="M10.5,19.5h3" strokeLinecap="round" />
        <path d="M30.5,14v3" strokeLinecap="round" />
        <path d="M29,15.5h3" strokeLinecap="round" />
        <path d="M38.5,5.5v3" strokeLinecap="round" />
        <path d="M37,7h3" strokeLinecap="round" />
        <path d="M7.5,41h3" strokeLinecap="round" />
        <path d="M9,39.5v3" strokeLinecap="round" />
        <path d="M39.5,36h3" strokeLinecap="round" />
        <path d="M41,34.5l.02,3" strokeLinecap="round" />
      </svg>
    </div>
  );
};
