/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiStar } from "react-icons/fi";
import StatusBadge from "./tableComponents/StatusBadge";
import { DashboardTable } from "./tableComponents/dashboardTable";
import { appTheme } from "../../../../constant/theme";

export const CoursesSection = ({ courses, theme }: {courses: any, theme: "light" | "dark"}) => (
  <div className="space-y-4">
    <h2 className="text-lg md:text-xl font-semibold">Your Courses</h2>

    {/* Mobile & tablet optimized card layout */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
      {courses.map((course: any, index: number) => (
        <div
          key={index}
          className="p-4 rounded-xl shadow-md space-y-3"
          style={{
            backgroundColor: appTheme[theme].surface.primary,
            color:theme === "light" ? appTheme.text.primary : appTheme.text.inverted,
            border: `1px solid ${appTheme[theme].neutral[200]}`,
          }}
        >
          <div className="flex justify-between items-start">
            <div className="text-base font-semibold">{course.course}</div>
            <StatusBadge status={course.status} theme={theme} />
          </div>

          <div className="text-sm opacity-80">{course.topic}</div>

          <div className="flex flex-col gap-1 text-sm">
            <div className="flex justify-between">
              <span>Price:</span>
              <span className="font-medium">${course.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Duration:</span>
              <span>{course.duration}</span>
            </div>
            <div className="flex justify-between">
              <span>Lessons:</span>
              <span>{course.lessons}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm mt-2">
            <FiStar size={14} color={theme === "light" ? appTheme.text.primary : appTheme.text.inverted} />
            <span>{course.rating}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Desktop clean table */}
    <div className="hidden md:block">
      <DashboardTable
        columns={[
          { header: "Course", className: "" },
          { header: "Topic", className: "" },
          { header: "Price", className: "" },
          { header: "Duration", className: "" },
          { header: "Lessons", className: "" },
          { header: "Rating", className: "" },
          { header: "Status", className: "" },
        ]}
        theme={theme}
      >
        {courses.map((course: any, index: number) => (
          <tr key={index}>
            <td>{course.course}</td>
            <td>{course.topic}</td>
            <td>${course.price}</td>
            <td>{course.duration}</td>
            <td>{course.lessons}</td>
            <td>
              <div className="flex items-center gap-1">
                <FiStar size={14} color={theme === "light" ? appTheme.text.primary : appTheme.text.inverted} />
                {course.rating}
              </div>
            </td>
            <td>
              <StatusBadge status={course.status} theme={theme} />
            </td>
          </tr>
        ))}
      </DashboardTable>
    </div>
  </div>
);

export default CoursesSection;
