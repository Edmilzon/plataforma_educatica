// import { Geist } from "next/font/google";

<<<<<<< HEAD
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
=======
const USER_LAYOUT = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <div>{children}</div>;
};
export default USER_LAYOUT;
>>>>>>> feature/H1_Register
