import { Outlet } from "react-router-dom";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import WhatsAppButton from "../Common/WhatsAppButton";

const UserLayout = () => {
  return <>
  {/* Header */}
  <Header />
  {/* Main Content */}
  <main>
    <Outlet />
  </main>
  {/* WhatsApp Button */}
  <WhatsAppButton />
  {/* Global Golden Divider */}
  <div className="h-[2px] bg-[#D4AF37] w-full"></div>
  {/* Footer */}
  <Footer />
  </>;
};

export default UserLayout;