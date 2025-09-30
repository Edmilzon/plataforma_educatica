import { Geist } from "next/font/google"

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>){
    return (
       
          <div>
             {children}
          </div>
            
        
       
    )
}