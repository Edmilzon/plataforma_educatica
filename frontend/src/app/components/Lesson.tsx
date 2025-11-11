"use client";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";


interface LessonModalProps {
  onClose: () => void;
}

const LESSON: React.FC<LessonModalProps> = ({ onClose }) => {
  const [resourceType, setResourceType] = useState<"video" | "texto" | "imagen" | "slides" >("video");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (resourceType === "texto" && selectedFile.type !== "application/pdf") {
      alert("Debe subir un archivo PDF.");
      return;
    }
    if (resourceType === "imagen" && !["image/png", "image/jpeg"].includes(selectedFile.type)) {
      alert("Solo se permiten imágenes PNG o JPG.");
      return;
    }
    if (resourceType === "slides" && selectedFile.name.split(".").pop() !== "pptx") {
      alert("Debe subir un archivo .pptx");
      return;
    }
    setFile(selectedFile);
  };

  return (
    <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-[550px] rounded-xl shadow-lg p-6 animate-fadeIn">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Nueva Lección</h2>
          <button onClick={onClose} className="text-gray-500 text-xl">
            <IoClose />
          </button>
        </div>

        <div className="space-y-4">
        <label className="text-sm font-medium mb-2 block">Titulo</label>
          <input
            className="w-full rounded-xl border bg-[#f3f7f8] px-4 py-2"
            placeholder="Ej: Introducción a Python"
          />
        <label className="text-sm font-medium mb-2 block">Descripcion</label>
          <textarea
                  className="w-full rounded-lg bg-[#f3f7f8] border py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#0099ae]"
                  placeholder="Describe el curso..."
                  rows={2}
                />
          <label className="text-sm font-medium mb-2 block">Orden</label>
          <input
            className="w-full rounded-lg bg-[#f3f7f8] border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0099ae]"
            placeholder="Ej: 1"
            type="number"
            />
        </div>
        {/* recursos */}
        <div className="flex gap-3 items-center border-b pt-4 pb-2 mb-4">
          {[
            { key: "video", label: "Video" },
            { key: "texto", label: "Texto" },
            { key: "imagen", label: "Imagen" },
            { key: "slides", label: "Slides" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setResourceType(tab.key as any)}
              className={`px-3 py-1 rounded-md text-sm ${
                resourceType === tab.key
                  ? "bg-[#0098af] text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

                <div className="space-y-4">

          {/* Título */}
          <input
            className="w-full rounded-xl border bg-[#f3f7f8] px-4 py-3"
            placeholder="Título del recurso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* VIDEO */}
          {resourceType === "video" && (
            <input
              className="w-full rounded-xl border bg-[#f3f7f8] px-4 py-3"
              placeholder="Link de YouTube"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
          )}

          {/* ARCHIVOS */}
          {resourceType !== "video" && (
            <div className="text-center">
              <input
                id="files"
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                accept={
                  resourceType === "texto"
                    ? ".pdf"
                    : resourceType === "imagen"
                    ? ".png,.jpg,.jpeg"
                    : resourceType === "slides"
                    ? ".pptx"
                    : ".txt"
                }
              />
              <label
              htmlFor="files"
              className="w-full border-1 rounded-lg px-6 py-2">
                 Seleccionar archivo
              </label>
              {file && (
                <p className="text-sm text-green-600 mt-1">
                  Archivo seleccionado: {file.name}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="py-4">
            <button className="w-full bg-[#0098af] hover:bg-[#19a2b6] text-white py-2 rounded-xl">
                Guardar lección
            </button>
        </div>
      </div>
    </div>
  );
};
export default LESSON;
