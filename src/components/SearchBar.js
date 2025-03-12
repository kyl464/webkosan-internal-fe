import { useState, useRef, useEffect } from "react";

const SearchBar = () => {
  const [showLocation, setShowLocation] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const [showBudget, setShowBudget] = useState(false);
  const [location, setLocation] = useState("pilih lokasi");
  const [availability, setAvailability] = useState("cek ketersediaan");
  const [minBudget, setMinBudget] = useState(1000000);
  const [maxBudget, setMaxBudget] = useState(13000000);

  const locationRef = useRef(null);
  const availabilityRef = useRef(null);
  const budgetRef = useRef(null);

  // Fungsi untuk menutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target) &&
        availabilityRef.current &&
        !availabilityRef.current.contains(event.target) &&
        budgetRef.current &&
        !budgetRef.current.contains(event.target)
      ) {
        setShowLocation(false);
        setShowAvailability(false);
        setShowBudget(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 w-full max-w-[1100px] mx-auto bg-[#EBE5C2] rounded-[40px] p-4 shadow-lg z-10">
      {/* Pilihan Waktu Tinggal */}
      <div className="flex items-center justify-start space-x-4 text-gray-700 mb-4">
        <span className="font-semibold">pilih ketentuan waktu tinggal</span>
        <div className="flex bg-gray-200 p-1 rounded-full">
          <button className="px-4 py-1 bg-white rounded-full text-gray-700 font-medium shadow-sm">
            per bulan
          </button>
          <button className="px-4 py-1 text-gray-500">per malam</button>
        </div>
      </div>

      {/* Input Fields */}
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 relative">
        {/* Lokasi */}
        <div
          className="flex items-center flex-1 border-r border-gray-300 pr-4 relative"
          ref={locationRef}
        >
          <i className="fas fa-map-marker-alt text-gray-500 mr-2"></i>
          <div onClick={() => setShowLocation(!showLocation)}>
            <p className="text-sm font-semibold text-gray-700">lokasi</p>
            <p className="text-sm text-gray-500 cursor-pointer">{location}</p>
          </div>

          {showLocation && (
            <div className="absolute top-full left-0 bg-white shadow-md rounded-md mt-2 w-[200px]">
              {["Jakarta", "Bandung", "Surabaya", "Yogyakarta"].map((loc) => (
                <p
                  key={loc}
                  onClick={() => {
                    setLocation(loc);
                    setShowLocation(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {loc}
                </p>
              ))}
            </div>
          )}
        </div>
        {/* Ketersediaan */}
        <div
          className="flex items-center flex-1 border-r border-gray-300 px-4 relative"
          ref={availabilityRef}
        >
          <i className="far fa-calendar-alt text-gray-500 mr-2"></i>
          <div onClick={() => setShowAvailability(!showAvailability)}>
            <p className="text-sm font-semibold text-gray-700">ketersediaan</p>
            <p className="text-sm text-gray-500 cursor-pointer">
              {availability}
            </p>
          </div>

          {showAvailability && (
            <div className="absolute top-full left-0 bg-white shadow-md rounded-md mt-2 w-[200px]">
              {[
                "dalam 2 hari",
                "dalam 2 minggu",
                "dalam sebulan",
                "lebih dari 2 bulan",
              ].map((time) => (
                <p
                  key={time}
                  onClick={() => {
                    setAvailability(time);
                    setShowAvailability(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {time}
                </p>
              ))}
            </div>
          )}
        </div>
        {/* Budget */}
        <div className="flex items-center flex-1 px-4 relative" ref={budgetRef}>
          <i className="fas fa-wallet text-gray-500 mr-2"></i>
          <div onClick={() => setShowBudget(!showBudget)}>
            <p className="text-sm font-semibold text-gray-700">
              budget per bulan
            </p>
            <p className="text-sm text-gray-500 cursor-pointer">
              IDR {minBudget.toLocaleString()} - {maxBudget.toLocaleString()}
            </p>
          </div>

          {showBudget && (
            <div className="absolute top-full left-0 bg-white shadow-md rounded-md mt-2 p-4 w-[250px]">
              <label className="text-sm font-semibold">Min Budget</label>
              <input
                type="range"
                min="1000000"
                max="13000000"
                step="500000"
                value={minBudget}
                onChange={(e) => setMinBudget(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-sm text-gray-700">
                IDR {minBudget.toLocaleString()}
              </p>

              <label className="text-sm font-semibold mt-2">Max Budget</label>
              <input
                type="range"
                min="1000000"
                max="13000000"
                step="500000"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-sm text-gray-700">
                IDR {maxBudget.toLocaleString()}
              </p>
            </div>
          )}
        </div>
        {/* Tombol Search */}
        <button className="bg-[#D6CBA8] hover:bg-[#EBE5C2] text-white w-10 h-10 rounded-full flex items-center justify-center ml-4">
          <i className="fas fa-search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </i>
        </button>
      </div>

      {/* Kategori */}
      <div className="mt-4 text-gray-700">
        <p className="text-sm font-semibold">telusuri berdasarkan kategori</p>
        <div className="flex space-x-2 mt-2">
          <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium">
            Binus Square
          </span>
          <span className="bg-teal-400 text-white px-3 py-1 rounded-full text-sm font-medium">
            Cove Classics
          </span>
          <span className="bg-red-300 text-white px-3 py-1 rounded-full text-sm font-medium">
            Cove Basic
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
