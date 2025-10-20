"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
const BUTTON_BTN = ()=>{
    const HANDOE_CLICK = async()=> {
        await signIn("google", { callbackUrl: "/user/home" });
    }
    return(
          <div className="flex gap-4">
            <button className="flex-1 border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition transform hover:scale-105 shadow-sm cursor-pointer"
            onClick={HANDOE_CLICK}>
              <FcGoogle  size={20} />
              <span className="text-black font-medium ">Google</span>
            </button>
          </div>         
    )
    
}
export default BUTTON_BTN;