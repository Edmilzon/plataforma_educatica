//import { Geist } from "next/font/google";
const USERLAYOUT = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};
export default USERLAYOUT;
