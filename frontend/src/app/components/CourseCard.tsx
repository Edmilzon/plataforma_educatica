//import { Play } from "lucide-react";

interface CourseCardProps {
  title: string;
  duration: string;
  image: string;
}

export default function CourseCard({ title, duration, image }: CourseCardProps) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center text-gray-600 text-sm mt-2">
          <button className="w-4 h-4 mr-1" /> Clase • {duration}
        </div>
      </div>
    </div>
  );
}
