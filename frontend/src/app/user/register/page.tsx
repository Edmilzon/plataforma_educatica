"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuEye, LuEyeClosed } from "react-icons/lu";
// import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { REGISTER_USER } from "@/app/api/user";

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
    phone: z
      .string()
      .nonempty("El campo es obligatorio")
      .regex(
        /^[67]\d{7}$/,
        "El número debe empezar con 6 o 7 y tener 8 dígitos",
      ),
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
        <h2 className="text-black text-2xl font-semibold text-center  mb-6 mt-5">
          Crea tu cuenta
        </h2>
        <form onSubmit={handle_submit(on_submit)}>
          {/* nombre y apellido */}
          <div className="mb-4 md:justify-between m-4 grid grid-cols-2 gap-4">
            <div className="mb-4 md:mr-2 md:mb-0">
              <label className="text-[#190E5D] font-bold block text-sm">
                Nombre <span className="text-red-500"> *</span>
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full px-3 py-2 text-sm leading-tight text-black border border-gray-300 placeholder-gray-400 rounded-lg shadow appearance-none focus:ring-2 focus:ring-[#306998]"
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
              <label className="text-[#190E5D] font-bold block text-sm">
                Apellidos <span className="text-red-500"> *</span>
              </label>
              <input
                type="text"
                {...register("lastname")}
                className="w-full px-3 py-2 text-sm leading-tight text-black border border-gray-300 placeholder-gray-400 rounded-lg shadow appearance-none focus:ring-2 focus:ring-[#306998]"
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
            <label className="text-[#190E5D] font-bold  block text-sm mb-1">
              Email <span className="text-red-500"> *</span>
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-3 py-2 text-sm leading-tight text-black border border-gray-300 placeholder-gray-400 rounded-lg shadow appearance-none focus:ring-2 focus:ring-[#306998]"
              placeholder="ejemplo@gmail.com"
            />
            {errors.email ? (
              <p className="text-xs text-red-500 h-4">{errors.email.message}</p>
            ) : (
              <p className="h-4"></p>
            )}
          </div>
          {/* contrasenia y confirmar contrasenia */}
          <div className="mb-4 md:justify-between m-4 grid grid-cols-2 gap-4">
            <div className="md:mr-2 md:mb-0">
              <label className="text-[#190E5D] font-bold  block text-sm mb-1">
                Contraseña <span className="text-red-500"> *</span>
              </label>
              <div className="relative">
                <input
                  type={show_password ? "text" : "password"}
                  {...register("password")}
                  className="w-full px-3 py-2 text-sm leading-tight text-black border border-gray-300 placeholder-gray-400 rounded-lg shadow appearance-none focus:ring-2 focus:ring-[#306998]"
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
                <p className="h-4"></p>
              )}
            </div>
            <div className="md:ml-2">
              <label className="text-[#190E5D] font-bold  block text-sm mb-1">
                Confirmar contraseña <span className="text-red-500"> *</span>
              </label>
              <div className="relative">
                <input
                  type={show_confirm_password ? "text" : "password"}
                  {...register("confirm_password")}
                  className="w-full px-3 py-2 text-sm leading-tight text-black border border-gray-300 placeholder-gray-400 rounded-lg shadow appearance-none focus:ring-2 focus:ring-[#306998]"
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
                <p className="h-4"></p>
              )}
            </div>
          </div>
          {/* telefono */}
          <div className="mb-4 m-4">
            <label className="block text-[#190E5D] font-bold mb-1">
              Telefono <span className="text-red-500"> *</span>
            </label>
            <input
              type="text"
              {...register("phone")}
              className="w-full px-3 py-2 text-sm leading-tight text-black border border-gray-300 placeholder-gray-400 rounded-lg shadow appearance-none focus:ring-2 focus:ring-[#306998]"
              placeholder="Numero de celular"
            />
            {errors.phone ? (
              <p className="text-xs text-red-500 h-4">{errors.phone.message}</p>
            ) : (
              <p className="h-4"></p>
            )}
          </div>

          <div className="flex justify-center mt-2 mx-10">
            <button className="flex items-center px-4 py-2 bg-gradient-to-r from-lime-600 via-lime-600 to-lime-600 text-white font-bold text-lg rounded-lg shadow-2xl hover:from-lime-600 hover:via-lime-600 hover:to-lime-600 focus:outline-none focus:ring-4 focus:ring-lime-100 focus:ring-opacity-70 active:bg-lime-600 active:shadow-inner transform hover:scale-110 transition duration-500 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ml-4">
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
        {/* <div className="flex justify-center items-center mb-4">
          <hr className="w-16 border-gray-600" />
          <span className="px-3 text-gray-400">O</span>
          <hr className="w-16 border-gray-600" />
        </div>
        <div className="flex justify-center mt-2 mx-10">
          <button className="px-10 border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition transform hover:scale-105 shadow-sm">
            <FcGoogle />
            <span className="text-black font-medium">
              Registrarse con Google
            </span>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default REGISTER;
