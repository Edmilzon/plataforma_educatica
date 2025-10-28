import Link from "next/link";
import { LuSparkles } from "react-icons/lu";
import { AiTwotoneCode } from "react-icons/ai";
import { DiPython } from "react-icons/di";

/* eslint-disable max-lines-per-function*/
const HOME = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-[#1A2332]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#17A2B8]/5 via-transparent to-[#007BFF]/5" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#17A2B8]/10 px-4 py-1.5 text-sm font-medium text-[#17A2B8]">
                  <LuSparkles className="h-4 w-4" />
                  Aprende programación a tu ritmo
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance text-black">
                Domina Python{" "}
                <span className="bg-gradient-to-r from-[#17A2B8] to-[#007BFF] bg-clip-text text-transparent">
                  desde Cero
                </span>
              </h1>
              <p className="text-lg text-[#9CA3AF] text-pretty leading-relaxed max-w-xl">
                Aprende Python paso a paso con ejercicios prácticos, ejemplos
                reales y proyectos diseñados para fortalecer tus habilidades
                desde lo básico hasta lo avanzado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#0098af] hover:bg-[#19a2b6] px-4 py-2 rounded-4xl text-white transition cursor-pointer">
                  <Link href="/user/login">Comenzar Ahora</Link>
                </button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      className="h-10 w-10 rounded-full border-2 border-[#0A1929] bg-gradient-to-br from-[#17A2B8] to-[#007BFF]"
                      key={i}
                    />
                  ))}
                </div>
                <p className="text-sm text-[#9CA3AF]">
                  <span className="font-semibold text-black">+5,000</span>{" "}
                  estudiantes ya están aprendiendo
                </p>
              </div>
            </div>
            <div className="relative lg:h-[500px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#17A2B8]/20 to-[#007BFF]/20 blur-3xl rounded-full" />
              <div className="relative">
                <div className="rounded-2xl border border-[#e3f3f6] bg-[#e3f3f6]/50 backdrop-blur p-8 shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-[#17A2B8] to-[#007BFF] flex items-center justify-center shadow-lg animate-pulse">
                      <AiTwotoneCode className="h-8 w-8 text-white" />
                    </div>
                    <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-[#17A2B8] to-[#007BFF] flex items-center justify-center shadow-lg animate-pulse">
                      <DiPython className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 w-full rounded-full bg-[#b8e1e8]" />
                    <div className="h-3 w-4/5 rounded-full bg-[#b8e1e8]" />
                    <div className="h-3 w-3/5 rounded-full bg-[#b8e1e8]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HOME;
