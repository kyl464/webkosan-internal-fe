import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";

const ListKosanPage = () => {
  const router = useRouter();

  const [kosanData, setKosanData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      setIsLoading(true);
      setError(null);

      const queryParams = new URLSearchParams(router.query).toString();
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/kosan?${queryParams}`;

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Gagal mengambil data. Periksa koneksi backend Anda."
            );
          }
          return response.json();
        })
        .then((data) => {
          setKosanData(data);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [router.isReady, router.query]);

  return (
    <div className="bg-[#F8F3D9] min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto pt-28 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Hasil Pencarian Kosan 🏡
          </h1>
        </div>
        <hr />
        <div className="mt-10">
          {isLoading ? (
            <p className="text-center text-gray-500">Mencari kosan...</p>
          ) : error ? (
            <p className="text-center text-red-600">Error: {error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {kosanData.length > 0 ? (
                kosanData.map((kos) => (
                  <Link
                    href={`/kosan/${kos._id}`}
                    key={kos._id}
                    // ===== PERUBAHAN WARNA KARTU DI SINI =====
                    className="block bg-[#EBE5C2] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
                  >
                    <div className="relative">
                      <img
                        src={
                          kos.foto && kos.foto.length > 0
                            ? kos.foto[0]
                            : "https://via.placeholder.com/300x200?text=Kosan"
                        }
                        alt={kos.nama}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate group-hover:text-blue-600">
                        {kos.nama}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        📍 {kos.kota || kos.alamat}
                      </p>
                      <p className="text-md font-bold text-blue-600">
                        IDR {kos.harga.toLocaleString()}/bulan
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  Tidak ada kosan yang cocok.
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ListKosanPage;
