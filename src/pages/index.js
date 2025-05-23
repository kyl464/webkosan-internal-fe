import { useEffect } from "react";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/home"); // Redirect ke halaman utama
  }, [router]);

  return null;
};

export default Index;
