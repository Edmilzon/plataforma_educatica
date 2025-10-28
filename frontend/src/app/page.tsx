import Image from "next/image";

import Navbar from "./components/Navbar";

const HOME = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          ¡Bienvenido al curso de Python!
        </h1>
        <p className="mt-4 text-gray-700">
          Descubre cómo aprender Python de manera interactiva y divertida.
        </p>
      </header>

      <main className="flex flex-col items-center justify-center">
        <Image
          alt="Imagen de Python"
          className="w-64 h-64 rounded-lg shadow-lg mb-8"
          height={500}
          src="/img/python1.jpg"
          width={500}
        />

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Por qué elegir este curso?
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Contenido interactivo y divertido</li>
            <li>Aprende de manera práctica y efectiva</li>
            <li>Acceso a recursos adicionales</li>
          </ul>
        </div>

        <div className="mt-8">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Comenzar ahora
          </button>
        </div>
      </main>
    </div>
  );
};

export default HOME;
