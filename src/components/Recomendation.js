import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link"; // 1. Impor Link untuk membuat kartu bisa diklik

const Recomendation = () => {
  const [kosanList, setKosanList] = useState([]);
  // 2. State baru untuk mengatur jumlah kartu yang terlihat
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchKosan = async () => {
      try {
        const res = await axios.get(
          // Mengambil semua data kosan tanpa filter
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/kosan`
        );
        setKosanList(res.data);
      } catch (error) {
        console.error("Gagal ambil data kosan:", error);
      }
    };
    fetchKosan();
  }, []);

  // 3. Fungsi untuk menambah jumlah kartu yang terlihat
  const handleLoadMore = () => {
    // Logika khusus: klik pertama jadi 9, klik berikutnya tambah 9
    if (visibleCount === 3) {
      setVisibleCount(9);
    } else {
      setVisibleCount((prevCount) => prevCount + 9);
    }
  };

  return (
    <section className="py-6">
      <div className="container mx-auto px-4 border border-black rounded-lg mt-18 pb-6 pt-6">
        {/* Filter Kategori (saat ini belum fungsional) */}
        <div className="w-full p-4">
          <div className="flex justify-center space-x-6 mb-4">
            {/* ... Tombol filter kategori Anda ... */}
          </div>
        </div>

        {/* Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* 4. Gunakan .slice() untuk menampilkan sebagian data saja */}
          {kosanList.slice(0, visibleCount).map((kosan) => (
            <Link href={`/kosan/${kosan._id}`} key={kosan._id}>
              <a className="block max-w-sm bg-transparent border border-gray-400 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                <img
                  className="rounded-t-lg w-full h-48 object-cover"
                  src={
                    kosan.foto?.[0] ||
                    "https://via.placeholder.com/400x200.png?text=No+Image"
                  }
                  alt={kosan.nama}
                />
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 truncate">
                    {kosan.nama}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 h-20 overflow-hidden">
                    {kosan.deskripsi}
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    Rp {kosan.harga.toLocaleString("id-ID")}/bulan
                  </p>
                </div>
              </a>
            </Link>
          ))}
        </div>

        {/* 5. Tombol "Lihat Semua" yang dinamis */}
        {visibleCount < kosanList.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="bg-[#F2E8C6] text-black font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-[#e5d5b2] transition"
            >
              Lihat Semua
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Recomendation;
