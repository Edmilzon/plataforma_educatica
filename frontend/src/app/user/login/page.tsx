"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { FaGoogle, FaMicrosoft } from "react-icons/fa";

import { LOGIN_USER } from "@/app/api/api";

const LOGIN_SCHEMA = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type LoginForm = z.infer<typeof LOGIN_SCHEMA>;

const LOGIN_PAGE = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit: handle_submit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LOGIN_SCHEMA),
  });

  const [show_password, set_show_password] = useState(false);
  const [loading, set_loading] = useState(false);
  const [error, set_error] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/user/home");
  }, [router]);

  const on_submit = async (data: LoginForm) => {
    try {
      set_loading(true);
      set_error("");
      const response = await LOGIN_USER(data);

      if (response?.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.login));
        router.push("/user/home"); 
      }
    } catch (error: unknown) {
    
      set_error("Usuario o email no registrado");
      console.log(error);
    } finally {
      set_loading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-100 p-6">
        <div className="w-80 h-80 md:w-96 md:h-96 relative rounded-full overflow-hidden shadow-lg">
          <Image
            fill
            priority
            alt="Logo Python"
            className="object-cover"
            src="/img/python1.jpg"
          />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-6 animate-fadeIn">
          <h1 className="text-3xl font-bold text-[#306998]">
            Bienvenido de nuevo
          </h1>
          <p className="text-gray-600">Ingresa tus credenciales para acceder</p>

          <form className="space-y-4" onSubmit={handle_submit(on_submit)}>
            <div>
              <label className="block text-sm font-medium text-black">
                Correo
              </label>
              <input
                type="email"
                {...register("email")}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#306998]"
                placeholder="ejemplo@correo.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={show_password ? "text" : "password"}
                  {...register("password")}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD43B]"
                  placeholder="********"
                />
                <button
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-black cursor-pointer"
                  type="button"
                  onClick={() => set_show_password(!show_password)}
                >
                  {show_password ? <LuEye /> : <LuEyeClosed />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-black">
                <input className="rounded border-gray-300" type="checkbox" />
                Recuérdame
              </label>
              <a className="text-sm text-[#306998] hover:underline" href="#">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              className="w-full rounded-lg bg-[#306998] px-4 py-2 text-white font-semibold hover:bg-[#205375] transition transform hover:scale-105 shadow-md cursor-pointer"
              disabled={loading}
              type="submit"
            >
              {loading ? "Iniciando..." : "Iniciar sesión"}
            </button>
          </form>

          {error && (
            <p className="text-left text-red-500 text-sm mt-2">{error}</p>
          )}

          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-gray-300"></div>
            <span className="text-sm text-gray-500">o</span>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition transform hover:scale-105 shadow-sm cursor-pointer">
              <FaGoogle className="text-red-500" size={20} />
              <span className="text-black font-medium ">Google</span>
            </button>
            <button className="flex-1 border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition transform hover:scale-105 shadow-sm cursor-pointer">
              <FaMicrosoft className="text-blue-500" size={20} />
              <span className="text-black font-medium ">Apple</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 ">
            ¿No tienes cuenta?{" "}
            <Link
              className="text-[#FFD43B] font-medium hover:underline cursor-pointer"
              href="/user/register"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LOGIN_PAGE;
