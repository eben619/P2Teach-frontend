/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import useAppStore from "../../../store/useAppStore";
import {
  FiClock,
  FiCalendar,
  FiMapPin,
  FiUser,
  FiSearch,
} from "react-icons/fi";
import { appTheme } from "../../../constant/theme";
import { useBookingStore } from "../../../store/useBookingStore";
import useUserStore from "../../../store/useUserStore";
import { useModal } from "../../../hooks/useModal";
import BookingDetailsDrawer from "./modals/BookingDetailsDrawer";

const Bookings = () => {
  const { theme } = useAppStore(["theme"]);
  const { bookings, loading, error, fetchBookings } = useBookingStore();
  const { currentUser } = useUserStore((state) => state);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const { openDrawer } = useModal();

  const groupedBookings = useMemo(() => {
    const now = new Date();
    return bookings?.reduce(
      (acc: any, booking) => {
        try {
          const [year, month, day] = booking.date.split("-");
          const [hours, minutes] = booking.time.split(":");
          const sessionDate = new Date(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day),
            parseInt(hours),
            parseInt(minutes)
          );
          const category = sessionDate > now ? "upcoming" : "past";
          acc[category].push(booking);
        } catch (error) {
          console.error("Error parsing booking date:", error);
        }
        return acc;
      },
      { upcoming: [], past: [] }
    );
  }, [bookings]);

  useEffect(() => {
    if (currentUser?.id) {
      fetchBookings(currentUser.id, "student");
    }
  }, [currentUser?.id, fetchBookings]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (loading) return <div className="p-4 text-center">Loading bookings...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div
      style={{
        color: theme === "light" ? appTheme.text.primary : appTheme.text.inverted,
      }}
      className="p-4 space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">My Bookings</h1>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search bookings..."
            className="pl-10 pr-4 py-2 rounded-lg focus:outline-none w-full text-sm"
            style={{
              backgroundColor: appTheme[theme].surface.primary,
              border: `1px solid ${appTheme[theme].neutral[200]}`,
            }}
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto sm:overflow-visible">
        {["upcoming", "past"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "upcoming" | "past")}
            className={`capitalize text-sm font-medium px-4 py-2 rounded-full sm:rounded-none sm:border-b transition-all ${
              activeTab === tab
                ? "bg-blue-100 sm:bg-transparent sm:border-blue-500"
                : "bg-transparent"
            }`}
            style={{
              color:
                activeTab === tab
                  ? appTheme[theme].accent.primary
                  : appTheme.text.primary,
              borderColor:
                activeTab === tab
                  ? appTheme[theme].accent.primary
                  : "transparent",
            }}
          >
            {tab} ({groupedBookings?.[tab].length || 0})
          </button>
        ))}
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(activeTab === "upcoming"
          ? groupedBookings?.upcoming
          : groupedBookings?.past
        )?.length > 0 ? (
          (activeTab === "upcoming"
            ? groupedBookings.upcoming
            : groupedBookings.past
          ).map((booking: any) => (
            <div
              key={booking.id}
              className="p-4 rounded-lg transition-all hover:shadow-md w-full"
              style={{
                backgroundColor: appTheme[theme].surface.primary,
                border: `1px solid ${appTheme[theme].neutral[200]}`,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: appTheme[theme].accent.primary + "20",
                    }}
                  >
                    <FiUser size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {booking.tutor.firstname} {booking.tutor.lastname}
                    </h3>
                    <p className="text-sm">{booking.tutor.program}</p>
                  </div>
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-full capitalize"
                  style={{
                    backgroundColor:
                      activeTab === "upcoming"
                        ? appTheme[theme].accent.primary + "20"
                        : appTheme[theme].neutral[200],
                  }}
                >
                  {activeTab}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <FiCalendar />
                  <span>{formatDate(booking.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock />
                  <span>{formatTime(booking.time)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMapPin />
                  <span>{booking.location}</span>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-2 w-full">
                <button
                  onClick={() =>
                    openDrawer(<BookingDetailsDrawer bookingId={booking?.id} />)
                  }
                  className="w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: appTheme[theme].accent.primary,
                    color:
                      theme === "light"
                        ? appTheme.text.primary
                        : appTheme.text.inverted,
                  }}
                >
                  View Details
                </button>
                {activeTab === "upcoming" && (
                  <button
                    className="w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{
                      backgroundColor:
                        currentUser?.id !== booking.tutorid
                          ? appTheme[theme].status.error
                          : appTheme[theme].surface.secondary,
                    }}
                  >
                    {currentUser?.id === booking.tutorid ? "Reschedule" : "Cancel"}
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div
            className="text-center py-8 col-span-full"
            style={{ color: appTheme[theme].neutral[500] }}
          >
            No {activeTab} sessions found
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
