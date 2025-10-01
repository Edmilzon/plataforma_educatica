"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";


    const registerSchema = z.object({
        name: z.string().nonempty("El campo es obligatorio").regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "El nombre solo puede contener letras"),
        lastname: z.string().nonempty("El campo es obligatorio").regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "El apellido solo puede contener letras"),
        email: z.string().nonempty("El campo es obligatorio").regex(
        /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Correo inválido (solo se permiten letras, números y . - _)"),
        password: z.string().nonempty("El campo es obligatorio").min(8, "La contraseña debe tener al menos 8 caracteres")
                .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
                .regex(/[0-9!@#$%^&*]/, "Debe contener al menos un número o un caracter especial"),
        confirmPassword: z.string().nonempty("El campo es obligatorio"),
        phone: z.string().nonempty("El campo es obligatorio").regex(/^[67]\d{7}$/, "El número debe empezar con 6 o 7 y tener 8 dígitos"), })
        .refine((data) => data.password === data.confirmPassword, {
                message: "Las contraseñas no coinciden",
                path: ["confirmPassword"],
        });
    
    type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
    const img = "https://polotecnologico.net/wp-content/uploads/2020/11/PYTHON-01.jpg";
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        mode: "onChange", 
    });
    
    const onSubmit = (data: RegisterForm) => {
        console.log("Datos enviados:", data);
    };

    return(
        <div className="flex justify-center items-center h-screen  ">
                {/* lado izq */}
                <div className="w-1/2 h-screen hidden lg:block">
                        <img src={img} className=" w-full h-full"/>
                </div>
                {/* lado der */}
                <div className=" bg-white h-screen lg:p-20 md:p-16 sm:10 w-full lg:w-1/2">
                        <h2 className="text-black text-2xl font-semibold text-center mb-15 mt-5">Crea tu cuenta</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                                {/* nombre y apellido */}
                                <div className="mb-4 md:flex md:justify-between m-4">
                                        <div className="mb-4 md:mr-2 md:mb-0">
                                                <label className="text-black block text-sm">Nombre <span className="text-red-500"> *</span></label>
                                                <input 
                                                type="text" {...register("name")} 
                                                placeholder="Nombre" 
                                                className="w-full px-3 py-2 text-sm leading-tight text-black border border-gray-300 placeholder-gray-400 rounded-lg shadow appearance-none focus:ring-2 focus:ring-[#306998]"
                                                />
                                                {errors.name ? (
                                                        <p className="text-xs text-red-500 h-4">{errors.name.message}</p>
                                                ) : (
                                                        <p className="h-4"></p>)}                                        
                                        </div>

                                        <div className="md:ml-2">
                                                <label className="text-black block text-sm">Apellidos <span className="text-red-500"> *</span></label>
                                                <input 
                                                type="text" {...register("lastname")}
                                                placeholder="Apellido" 
                                                className="w-full px-3 py-2 text-sm leading-tight text-black border border-gray-300 placeholder-gray-400 rounded-lg shadow appearance-none focus:ring-2 focus:ring-[#306998]"
                                                />
                                                {errors.lastname ? (
                                                        <p className="text-xs text-red-500 h-4">{errors.lastname.message}</p>
                                                ) : (
                                                        <p className="h-4"></p>)}
                                        </div>
                                </div>
                                {/* Email */}
                                <div className="mb-4 m-4">
                                        <label className="text-black block text-sm mb-1">Email <span className="text-red-500"> *</span></label>
                                        <input 
                                        type="email"  {...register("email")} 
                                        placeholder="ejemplo@gmail.com" 
                                        className="w-full px-3 py-2 text-sm leading-tight text-black border border-gray-300 placeholder-gray-400 rounded-lg shadow appearance-none focus:ring-2 focus:ring-[#306998]"
                                        />
                                        {errors.email ? (
                                                        <p className="text-xs text-red-500 h-4">{errors.email.message}</p>
                                                ) : (
                                                        <p className="h-4"></p>)}                               
                                 </div>
                                {/* contrasenia y confirmar contrasenia */}
                                <div className="mb-4 md:flex md:justify-between m-4">       
                                        <div className="mb-4 md:mr-2 md:mb-0">
                                                <label className="text-black block text-sm mb-1">Contraseña <span className="text-red-500"> *</span></label>
                                                <div className="relative">
                                                        <input 
                                                        type={showPassword ? "text" : "password"} 
                                                        {...register("password")}
                                                        placeholder="********" 
                                                        className="w-full px-3 py-2 text-sm leading-tight text-black border border-gray-300 placeholder-gray-400 rounded-lg shadow appearance-none focus:ring-2 focus:ring-[#306998]"/>
                                                        <button 
                                                        type="button" 
                                                        onClick={() => setShowPassword(!showPassword)} 
                                                        className="flex right-3 inset-y-0 absolute items-center hover:text-black">
                                                        {showPassword ? <LuEyeClosed color="black" /> : <LuEye color="black" />} 
                                                        </button> 
                                                </div>
                                                {errors.password ? (
                                                        <p className="text-xs text-red-500 h-4">{errors.password.message}</p>
                                                ) : (
                                                        <p className="h-4"></p>)}
                                        </div>
                                        <div className="md:ml-2">
                                                <label className="text-black block text-sm mb-1">Confirmar contraseña <span className="text-red-500"> *</span></label>
                                                <div className="relative">
                                                        <input 
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        {...register("confirmPassword")}
                                                        placeholder="********" 
                                                        className="w-full px-3 py-2 text-sm leading-tight text-black border border-gray-300 placeholder-gray-400 rounded-lg shadow appearance-none focus:ring-2 focus:ring-[#306998]"
                                                        />
                                                        <button 
                                                        type="button" 
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                                                        className="absolute inset-y-0 right-3 flex hover:text-black items-center">
                                                                {showConfirmPassword ? <LuEyeClosed color="black"/> : <LuEye color="black"/>}
                                                        </button>
                                                </div>
                                                {errors.confirmPassword ? (
                                                        <p className="text-xs text-red-500 h-4">{errors.confirmPassword.message}</p>
                                                ) : (
                                                        <p className="h-4"></p>)}
                                        </div>
                                </div>
                                {/* telefono */}
                                <div className="mb-4 m-4">
                                        <label className="block text-sm text-black mb-1">Telefono <span className="text-red-500"> *</span></label>
                                        <input 
                                        type="text" {...register("phone")}
                                        placeholder="Numero de celular" 
                                        className="w-full px-3 py-2 text-sm leading-tight text-black border border-gray-300 placeholder-gray-400 rounded-lg shadow appearance-none focus:ring-2 focus:ring-[#306998]"
                                        /> 
                                        {errors.phone ? (
                                                        <p className="text-xs text-red-500 h-4">{errors.phone.message}</p>
                                                ) : (
                                                        <p className="h-4"></p>)}
                                </div>

                                <div className="flex justify-center mt-2 mx-10">
                                        <button 
                                        
                                        className="w-40 bg-lime-500 text-white font-bold py-2 rounded hover:bg-lime-600 transition">
                                                Crear cuenta
                                        </button>
                                </div>
                        </form>
                        <div className="mt-4">
                                <p className="text-center text-gray-600 text-sm mb-3"> ¿Ya tienes cuenta? {" "}
                                        <button 
                                        onClick={() => router.push("/user/login")}
                                        className="font-bold text-black underline hover:text-lime-500">
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
                                <button className="px-10 border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition transform hover:scale-105 shadow-sm">
                                <FcGoogle />                        
                                <span className="text-black font-medium">Registrarse con Google</span>
                                </button>
                        </div>
                </div>
        </div>
);
}