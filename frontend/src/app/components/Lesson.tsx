"use client";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "@/app/lib/firebase";
import { CREATE_LESSON } from "@/app/api/apiAdmin";
import TOAST from "@/app/components/ModalError";

type LessonModalProps = {
  onClose: () => void;
  topic_uid: string;
};
/* eslint-disable max-lines-per-function, complexity */
const LESSON: React.FC<LessonModalProps> = ({ onClose, topic_uid }) => {
  const [resourceType, setResourceType] = useState<
    "video" | "texto" | "imagen" | "slides"
  >("video");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState<number | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (resourceType === "texto" && selectedFile.type !== "application/pdf") {
      setToast({ message: "Debe subir un archivo PDF.", type: "error" });
      return;
    }
    if (
      resourceType === "imagen" &&
      !["image/png", "image/jpeg"].includes(selectedFile.type)
    ) {
      setToast({
        message: "Solo se permiten imágenes PNG o JPG.",
        type: "error",
      });
      return;
    }
    if (
      resourceType === "slides" &&
      selectedFile.name.split(".").pop() !== "pptx"
    ) {
      setToast({ message: "Debe subir un archivo .pptx", type: "error" });
      return;
    }
    setFile(selectedFile);
  };

  const handleSaveLesson = async () => {
    if (!title || !description || !order) {
      setToast({ message: "Completa todos los campos.", type: "error" });
      return;
    }

    let resource_url = "";

    try {
      setUploading(true);

      // Subir PDF a carpeta pdf/
      if (resourceType === "texto") {
        if (!file) {
          setToast({ message: "Selecciona un archivo PDF.", type: "error" });
          return;
        }
        const storageRef = ref(storage, `pdf/${file.name}`);
        await uploadBytes(storageRef, file);
        resource_url = await getDownloadURL(storageRef);
      }

      if (resourceType === "video") {
        if (!youtubeUrl.trim()) {
          setToast({ message: "Ingresa el link de YouTube.", type: "error" });
          return;
        }
        resource_url = youtubeUrl;
      }

      const lessonData = {
        title,
        order: Number(order),
        description,
        resource_url,
        topic_uuid: topic_uid,
      };

      await CREATE_LESSON(lessonData);

      setTitle("");
      setDescription("");
      setOrder("");
      setFile(null);
      setYoutubeUrl("");
      setToast({ message: "Lección guardada correctamente.", type: "success" });
    } catch (error) {
      console.error("Error al guardar la lección:", error);
      setToast({ message: "Error al guardar la lección.", type: "error" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-[550px] rounded-xl shadow-lg p-6 animate-fadeIn relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Nueva Lección</h2>
          <button className="text-gray-500 text-xl" onClick={onClose}>
            <IoClose />
          </button>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium mb-2 block">Titulo</label>
          <input
            className="w-full rounded-xl border bg-[#f3f7f8] px-4 py-2"
            placeholder="Ej: Introducción a Python"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="text-sm font-medium mb-2 block">Descripcion</label>
          <textarea
            className="w-full rounded-lg bg-[#f3f7f8] border py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#0099ae]"
            placeholder="Describe el curso..."
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="text-sm font-medium mb-2 block">Orden</label>
          <input
            className="w-full rounded-lg bg-[#f3f7f8] border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0099ae]"
            placeholder="Ej: 1"
            type="number"
            value={order}
            onChange={(e) =>
              setOrder(e.target.value ? Number(e.target.value) : "")
            }
          />
        </div>

        <div className="flex gap-3 items-center border-b pt-4 pb-2 mb-4">
          {[
            { key: "video", label: "Video" },
            { key: "texto", label: "Texto" },
            { key: "imagen", label: "Imagen" },
            { key: "slides", label: "Slides" },
          ].map((tab) => (
            <button
              className={`px-3 py-1 rounded-md text-sm ${
                resourceType === tab.key
                  ? "bg-[#0098af] text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              key={tab.key}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => setResourceType(tab.key as any)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <input
            className="w-full rounded-xl border bg-[#f3f7f8] px-4 py-3"
            placeholder="Título del recurso"
          />

          {resourceType === "video" && (
            <input
              className="w-full rounded-xl border bg-[#f3f7f8] px-4 py-3"
              placeholder="Link de YouTube"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
          )}

          {resourceType !== "video" && (
            <div className="text-center">
              <input
                accept={
                  resourceType === "texto"
                    ? ".pdf"
                    : resourceType === "imagen"
                      ? ".png,.jpg,.jpeg"
                      : resourceType === "slides"
                        ? ".pptx"
                        : ".txt"
                }
                className="hidden"
                id="files"
                type="file"
                onChange={handleFileSelect}
              />
              <label
                className="w-full border-1 rounded-lg px-6 py-2 cursor-pointer"
                htmlFor="files"
              >
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
          <button
            className="w-full bg-[#0098af] hover:bg-[#19a2b6] text-white py-2 rounded-xl"
            disabled={uploading}
            onClick={handleSaveLesson}
          >
            {uploading ? "Guardando..." : "Guardar lección"}
          </button>
        </div>
        {toast && (
          <TOAST
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
};

export default LESSON;
