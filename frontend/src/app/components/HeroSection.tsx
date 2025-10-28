import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="bg-yellow-200 w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 rounded-xl shadow-sm">
      <div className="max-w-md space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          ¡Te hemos echado de menos, Richar!
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
          src="/python-illustration.svg"
          alt="Ilustración Python"
          width={300}
          height={300}
          className="rounded-lg"
        />
      </div>
    </section>
  );
}
