export default function Register() {
    const img = "https://polotecnologico.net/wp-content/uploads/2020/11/PYTHON-01.jpg";
    return(
<div className="flex justify-center items-center h-screen">
            <div className="w-1/2 h-screen hidden lg:block">
            <img src={img} className=" w-full h-full"/>
            </div>

            <div className=" bg-[#1AA1A4] h-screen lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                
                <h2 className="text-white text-2xl font-semibold text-center mb-6">Crea tu cuenta</h2>
                        
                <form >
                <div className="mb-4 md:flex md:justify-between m-4">
                        <div className="mb-4 md:mr-2 md:mb-0">
                                <label className="text-[#7BCDD8] block text-sm">Nombre:</label>
                                <input type="text" className="w-full px-3 py-2 text-sm leading-tight text-black border border-gray-300 rounded-md shadow appearance-none focus:outline-none focus:shadow-outline bg-teal-100"/>
                        </div>

                        <div className="md:ml-2">
                                <label className="text-[#7BCDD8] block text-sm">Apellidos:</label>
                                <input type="text" className="w-full px-3 py-2 text-sm leading-tight text-black border border-gray-300 rounded-md shadow appearance-none focus:outline-none focus:shadow-outline bg-teal-100"/>
                        </div>
                </div>
                        <div className="mb-4 m-4">
                        <label className="text-[#7BCDD8] block text-sm mb-1">Email:</label>
                        <input type="email" className="w-full py-2 px-3 text-sm leading-tight text-black border shadow border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline bg-teal-100"/>
                        </div>
                <div className="mb-4 md:flex md:justify-between m-4">       
                        <div className="mb-4 md:mr-2 md:mb-0">
                                <label className="text-[#7BCDD8] block text-sm mb-1">Contrasenia:</label>
                                <input type="password" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border border-gray-300 rounded-md shadow appearance-none focus:outline-none focus:shadow-outline bg-teal-100"/>
                        </div>
                        <div className="md:ml-2">
                                <label className="text-[#7BCDD8] block text-sm mb-1">Confirmar contrasenia:</label>
                                <input type="password" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border border-gray-300 rounded-md shadow appearance-none focus:outline-none focus:shadow-outline bg-teal-100"/>
                        </div>
                </div>
                        <div className="mb-4 m-4">
                        <label className="block text-sm text-[#7BCDD8] mb-1">Telefono</label>
                        <input type="text" className="w-full py-2 px-3 text-sm leading-tight text-black border shadow border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline bg-teal-100"></input>
                        </div>
                <div className="flex justify-center mt-2 mx-10">
                        <button className="w-40 bg-lime-500 text-white font-bold py-2 rounded hover:bg-lime-600 transition">
                                Crear cuenta
                        </button>
                </div>
                </form>
                <div className="mt-4">
                        <p className="text-center text-sm mb-3"> ¿Ya tienes cuenta? {" "}
                                <button className="font-bold text-white underline">
                                         Inicia sesión
                                </button>
                        </p>               
                </div>
                <div className="flex justify-center items-center mb-4">
                        <hr className="w-16 border-gray-600" />
                        <span className="px-3 text-gray-400">O</span>
                        <hr className="w-16 border-gray-600" />
                </div>
            </div>
        </div>
)
}