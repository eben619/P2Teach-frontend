/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, Outlet } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiMenu,
  FiX,
  FiSearch,
  FiPocket,
  FiMoon,
  FiSun,
  FiBook,
  FiVideo,
  FiBookOpen,
  FiAlertCircle,
} from "react-icons/fi";
import { useMemo, useState, useEffect } from "react";
import { appTheme } from "../constant/theme";
import useAppStore from "../store/useAppStore";
import useBookings from "../hooks/useBookings";
import Logo3d from "../assets/Logo3d";
import Wallet from "../components/Wallet";
import useUserStore from "../store/useUserStore";
import { MdPerson } from "react-icons/md";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { theme, setTheme } = useAppStore(["theme", "setTheme"]);
  const { data: bookingsData, isLoading } = useBookings();
  const {logout} = useUserStore()

  // Lock scroll when sidebar is open (Mobile UX improvement)
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSidebarOpen]);

  const getUpcomingSessions = () => {
    if (!bookingsData?.data?.tutorBookings) return [];

    const now = new Date();

    return bookingsData.data.tutorBookings.filter((booking: any) => {
      try {
        const [year, month, day] = booking.date.split("-");
        const [hour, minute] = booking.time.split(":");
        const sessionDate = new Date(year, month - 1, day, hour, minute);

        if (isNaN(sessionDate.getTime())) return false;

        const timeDiff = sessionDate.getTime() - now.getTime();

        return timeDiff > 0 && timeDiff <= 60 * 60 * 1000;
      } catch (err: any) {
        console.error("Invalid booking format:", err, booking);
        return false;
      }
    });
  };

  const dueSessions = useMemo(getUpcomingSessions, [bookingsData]);

  const navigation = [
    { name: "Dashboard", href: "/home", icon: FiHome },
    { name: "Discover Courses", href: "/home/discover", icon: FiBook },
    { name: "Bookings", href: "/home/bookings", icon: FiBookOpen },
    { name: "Profile", href: "/home/profile", icon: MdPerson },
    // { name: "Study Groups", href: "/groups", icon: FiUsers },
  ];

  return (
    <div className="min-h-screen flex relative">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 h-screen w-64 z-40 transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-64`}
        style={{
          backgroundColor: appTheme[theme].base.secondary,
          color: appTheme.text.primary,
        }}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14">
                <Logo3d />
              </div>
              <h1
                className="text-xl font-bold"
                style={{ color: appTheme[theme].accent.primary }}
              >
                p2Teach
              </h1>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden p-2 rounded hover:brightness-90"
              style={{
                backgroundColor: appTheme[theme].accent.primary + "20",
                color: appTheme[theme].accent.primary,
              }}
            >
              <FiX size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto scrollbar-hide">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center p-3 rounded-lg transition-colors hover:bg-opacity-20"
                style={{
                  backgroundColor: appTheme[theme].base.tertiary,
                  color:
                    theme === "light"
                      ? appTheme.text.primary
                      : appTheme.text.inverted,
                  boxShadow: appTheme.shadows.sm,
                }}
              >
                <item.icon className="mr-3" size={20} />
                <span className="truncate">{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-6 flex justify-center">
            {theme === "dark" ? (
              <FiMoon
                onClick={() => setTheme("light")}
                className="hover:cursor-pointer p-1.5 rounded hover:bg-opacity-20"
                size={34}
                style={{
                  color: appTheme[theme].accent.primary,
                  backgroundColor: appTheme[theme].accent.primary + "10",
                }}
              />
            ) : (
              <FiSun
                onClick={() => setTheme("dark")}
                className="hover:cursor-pointer p-1.5 rounded hover:bg-opacity-20"
                size={34}
                style={{
                  color: appTheme[theme].accent.primary,
                  backgroundColor: appTheme[theme].accent.primary + "10",
                }}
              />
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header
          className="sticky top-0 z-30 p-4 flex w-full items-center justify-between"
          style={{
            backgroundColor: appTheme[theme].surface.primary,
            color: appTheme.text.primary,
            boxShadow: appTheme.shadows.sm,
            borderBottom: `1px solid ${appTheme[theme].neutral[200]}`,
          }}
        >
          {/* Left side: Menu button and Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded hover:brightness-90 md:hidden"
              style={{
                backgroundColor: appTheme[theme].accent.primary + "20",
                color: appTheme[theme].accent.primary,
              }}
            >
              <FiMenu size={20} />
            </button>
            <h1
              className="md:hidden text-lg font-bold"
              style={{ color: appTheme[theme].accent.primary }}
            >
              p2Teach
            </h1>
          </div>

          {/* Center: Search on sm+ */}
          <div className="hidden sm:block relative flex-1 max-w-sm mx-4">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: appTheme[theme].neutral[400] }}
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-lg w-full text-sm md:text-base"
              style={{
                color: appTheme.text.primary,
                backgroundColor: appTheme[theme].surface.secondary,
                border: `1px solid ${appTheme[theme].neutral[200]}`,
              }}
            />
          </div>

          {/* Right side: Wallet & Profile, always aligned right */}
          <div className="flex items-center gap-4">
            <Wallet />
            <div className="hidden sm:block relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center cursor-pointer p-2 rounded hover:brightness-90"
                style={{
                  backgroundColor: appTheme[theme].surface.secondary,
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: appTheme[theme].accent.primary,
                    color: appTheme.text.inverted,
                  }}
                >
                  JD
                </div>
              </button>

              {isProfileMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-lg py-2"
                  style={{
                    backgroundColor: appTheme[theme].surface.primary,
                    boxShadow: appTheme.shadows.md,
                    border: `1px solid ${appTheme[theme].neutral[200]}`,
                  }}
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:brightness-95 text-sm"
                  >
                    Profile
                  </Link>
                  <Link
				  onClick={logout}
                    to="/"
                    className="block px-4 py-2 hover:brightness-95 text-sm"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        <main
          className="flex-1 p-4 overflow-auto"
          style={{
            backgroundColor: appTheme[theme].surface.secondary,
            color: appTheme.text.primary,
          }}
        >
          {dueSessions.length > 0 && (
            <div
              className="mb-4 p-4 rounded-lg flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
              style={{
                backgroundColor: appTheme[theme].accent.primary + "20",
                border: `1px solid ${appTheme[theme].accent.primary}`,
              }}
            >
              <div className="flex items-start gap-2 flex-wrap">
                <FiAlertCircle
                  size={20}
                  style={{ color: appTheme[theme].accent.primary }}
                />
                <span>
                  You have {dueSessions.length} session
                  {dueSessions.length > 1 ? "s" : ""} starting soon:{" "}
                  {dueSessions.map((session: any) => (
                    <span key={session.id}>
                      {session.tutor?.name}'s session at{" "}
                      {new Date(
                        `${session.date}T${session.time}`
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                    </span>
                  ))}
                </span>
              </div>
              <Link
                to={`/live/${dueSessions[0]?.id}`}
                className="px-4 py-2 rounded-md flex items-center gap-2 hover:brightness-95"
                style={{
                  backgroundColor: appTheme[theme].accent.primary,
                  color: appTheme.text.inverted,
                }}
              >
                <FiVideo size={16} />
                View Session
              </Link>
            </div>
          )}
          {isLoading && (
            <div className="mb-4 p-4 rounded-lg bg-blue-100 text-blue-800">
              Loading sessions...
            </div>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
