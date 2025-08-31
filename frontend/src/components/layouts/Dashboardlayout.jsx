import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="text-sm">
      <Navbar openSideMenu={openSideMenu} setOpenSideMenu={setOpenSideMenu} />

      {user && (
        <div className="flex bg-blue-50/90 ">
          <div className="hidden lg:block h-screen">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {openSideMenu && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <div
                className="absolute inset-0 bg-black opacity-30"
                onClick={() => setOpenSideMenu(false)}
              ></div>
              <div className="relative w-64 shadow-lg">
                <SideMenu
                  activeMenu={activeMenu}
                  setOpenSideMenu={setOpenSideMenu}
                />
              </div>
            </div>
          )}

          <div className="grow mx-5 mt-4 z-10 relative">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
