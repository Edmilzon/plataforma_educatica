import Navbar from "../components/Navbar";
const DASHBOARDLAYOUT = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DASHBOARDLAYOUT;
