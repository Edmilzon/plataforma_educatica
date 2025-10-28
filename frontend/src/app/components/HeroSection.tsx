import Image from "next/image";
import { useEffect, useState } from "react";
type User = {
  uuid_user: string;
  email: string;
  name: string;
  lastname: string;
  role: string;
  isConfirmed: boolean;
  confirmationToken: string | null;
};
const HEROSECTION = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <p>No hay usuario logueado</p>;
  return (
    <section className="bg-yellow-200 w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 rounded-xl shadow-sm">
      <div className="max-w-md space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          ¡Te hemos echado de menos, {user.name} {user.lastname}!
        </h1>
        <p className="text-gray-700">
          Retoma el ritmo y alcanza tus metas en Python. Dedica solo 5 a 10
          minutos al día para seguir aprendiendo.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
          Retomar curso
        </button>
      </div>

      <div className="mt-10 md:mt-0">
        <Image
          alt="Ilustración Python"
          className="rounded-lg"
          height={300}
          src="/img/images5.jfif"
          width={300}
        />
      </div>
    </section>
  );
};
export default HEROSECTION;
