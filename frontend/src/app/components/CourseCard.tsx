import Image from "next/image";
// import { Play } from "lucide-react";

type CourseCardProps = {
  title: string;
  duration: string;
  image: string;
};

const COURSELCARD = ({ title, duration, image }: CourseCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer">
      {/* Contenedor relativo para que Image funcione con fill */}
      <div className="relative w-full h-40">
        <Image
          fill
          alt={title}
          className="object-cover"
          sizes="100vw"
          src={image}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center text-gray-600 text-sm mt-2">
          <button className="w-4 h-4 mr-1" /> Clase • {duration}
        </div>
      </div>
    </div>
  );
};

export default COURSELCARD;
