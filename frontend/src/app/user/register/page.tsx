"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuEye, LuEyeClosed, LuCircleArrowLeft } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

import { REGISTER_USER } from "@/app/api/api";

const REGISTER_SCHEMA = z
  .object({
    name: z
      .string()
      .nonempty("El campo es obligatorio")
      .regex(
        /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
        "El nombre solo puede contener letras",
      ),
    lastname: z
      .string()
      .nonempty("El campo es obligatorio")
      .regex(
        /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
        "El apellido solo puede contener letras",
      ),
    email: z
      .string()
      .nonempty("El campo es obligatorio")
      .regex(
        /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Correo inválido (solo se permiten letras, números y . - _)",
      ),
    password: z
      .string()
      .nonempty("El campo es obligatorio")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
      .regex(
        /[0-9!@#$%^&*]/,
        "Debe contener al menos un número o un caracter especial",
      ),
    confirm_password: z.string().nonempty("El campo es obligatorio"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof REGISTER_SCHEMA>;

/* eslint-disable max-lines-per-function, complexity */

const REGISTER = () => {
  const img = "/img/curso_python.png";
  const [show_password, set_show_password] = useState(false);
  const [show_confirm_password, set_show_confirm_password] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      sessionStorage.setItem("user", JSON.stringify(session.user));
      router.push("/user/home");
  }
}, [session, status, router]);

  const {
    register,
    handleSubmit: handle_submit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(REGISTER_SCHEMA),
    mode: "onChange",
  });

  const on_submit = async (data: RegisterForm) => {
    try {
      await send_user_data(data);
    } catch (error) {
      handle_error(error);
    }
  };

  const send_user_data = async (data: RegisterForm) => {
    const { ...user_data } = data;
    const res = await REGISTER_USER(user_data);
    console.log("Respuesta del servidor:", res);
    alert("Registro exitoso. Por favor, inicia sesión.");
    router.push("/user/login");
  };

  const handle_error = (error: unknown) => {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("Error al registrar usuario");
    }
    console.error(error);
  };

  return (
    <div className="flex justify-center items-center h-screen overflow-hidden">
      {/* lado izq */}
      <div className="hidden lg:block w-1/2 h-screen overflow-hidden">
        <Image
          alt="Imagen python"
          className=" w-full h-full object-cover"
          height={800}
          src={img}
          width={800}
        />
      </div>
      {/* lado der */}
      <div className="bg-white min-h-screen lg:p-20 md:p-16 sm:p-10 w-full lg:w-1/2 overflow-y-auto">
        <form onSubmit={handle_submit(on_submit)}>
          <button
            className="text-[#306998] text-3xl font-bold mx-4 "
            onClick={() => router.push("/user/login")}
          >
            <LuCircleArrowLeft />
          </button>
          <h2 className="text-[#306998] text-3xl font-bold mb-6 mt-5 mx-4">
            Regístrate
          </h2>
          <p className="text-gray-600 mx-4">Crea tu cuenta para empezar</p>
          {/* nombre y apellido */}
          <div className="mb-4 md:justify-between m-4 grid grid-cols-2 gap-4">
            <div className="mb-4 md:mr-2 md:mb-0">
              <label
                className="text-[#190E5D] font-bold block text-sm mb-1"
                htmlFor="name"
              >
                Nombre <span className="text-red-500"> *</span>
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#306998]"
                placeholder="Nombre"
              />
              {errors.name ? (
                <p className="text-xs text-red-500 h-4">
                  {errors.name.message}
                </p>
              ) : (
                <p className=""></p>
              )}
            </div>

            <div className="md:ml-2">
              <label
                className="text-[#190E5D] font-bold block text-sm mb-1"
                htmlFor="lastname"
              >
                Apellidos <span className="text-red-500"> *</span>
              </label>
              <input
                id="lastname"
                type="text"
                {...register("lastname")}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#306998]"
                placeholder="Apellido"
              />
              {errors.lastname ? (
                <p className="text-xs text-red-500 h-4">
                  {errors.lastname.message}
                </p>
              ) : (
                <p className=""></p>
              )}
            </div>
          </div>
          {/* Email */}
          <div className="mb-4 m-4">
            <label
              className="text-[#190E5D] font-bold  block text-sm mb-1"
              htmlFor="email"
            >
              Email <span className="text-red-500"> *</span>
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#306998]"
              placeholder="ejemplo@gmail.com"
            />
            {errors.email ? (
              <p className="text-xs text-red-500 h-4">{errors.email.message}</p>
            ) : (
              <p className="h3-4"></p>
            )}
          </div>
          {/* contrasenia y confirmar contrasenia */}
          <div className="mb-4 md:justify-between m-4 grid grid-cols-2 gap-4">
            <div className="mb-4 md:mr-2 md:mb-0">
              <label
                className="text-[#190E5D] font-bold  block text-sm mb-1"
                htmlFor="password"
              >
                Contraseña <span className="text-red-500"> *</span>
              </label>
              <div className="relative">
                <input
                  data-testid="password"
                  id="password"
                  type={show_password ? "text" : "password"}
                  {...register("password")}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#306998]"
                  placeholder="********"
                />
                <button
                  className="flex right-3 inset-y-0 absolute items-center hover:text-black"
                  type="button"
                  onClick={() => set_show_password(!show_password)}
                >
                  {show_password ? (
                    <LuEyeClosed color="black" />
                  ) : (
                    <LuEye color="black" />
                  )}
                </button>
              </div>
              {errors.password ? (
                <p className="text-xs text-red-500 h-4">
                  {errors.password.message}
                </p>
              ) : (
                <p className=""></p>
              )}
            </div>
            <div className="md:ml-2">
              <label
                className="text-[#190E5D] font-bold  block text-sm mb-1"
                htmlFor="confirm_password"
              >
                Confirmar contraseña <span className="text-red-500"> *</span>
              </label>
              <div className="relative">
                <input
                  data-testid="confirm_password"
                  id="confirm_password"
                  type={show_confirm_password ? "text" : "password"}
                  {...register("confirm_password")}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#306998]"
                  placeholder="********"
                />
                <button
                  className="absolute inset-y-0 right-3 flex hover:text-black items-center"
                  type="button"
                  onClick={() =>
                    set_show_confirm_password(!show_confirm_password)
                  }
                >
                  {show_confirm_password ? (
                    <LuEyeClosed color="black" />
                  ) : (
                    <LuEye color="black" />
                  )}
                </button>
              </div>
              {errors.confirm_password ? (
                <p className="text-xs text-red-500 h-4">
                  {errors.confirm_password.message}
                </p>
              ) : (
                <p></p>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-2 mx-10">
            <button className="w-full rounded-lg bg-[#65a30d] px-4 py-2 text-white font-semibold hover:from-lime-600 transition transform hover:scale-105 shadow-md cursor-pointer">
              Crear cuenta
            </button>
          </div>
        </form>
        <div className="mt-4">
          <p className="text-center text-gray-600 text-sm mb-3">
            {" "}
            ¿Ya tienes cuenta?{" "}
            <button
              className="font-bold text-[#190E5D] underline hover:text-lime-500"
              onClick={() => router.push("/user/login")}
            >
              Inicia sesión
            </button>
          </p>
        </div>
        <div className="flex justify-center items-center mb-4">
          <hr className="w-16 border-gray-600" />
          <span className="px-3 text-gray-400">O</span>
          <hr className="w-16 border-gray-600" />
        </div>
        <div className="flex justify-center mt-2 mx-10">
          <button
            className="px-10 border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition transform hover:scale-105 shadow-sm"
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/user/home" })}
          >
            <FcGoogle />
            <span className="text-black font-medium">
              Registrarse con Google
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default REGISTER;
