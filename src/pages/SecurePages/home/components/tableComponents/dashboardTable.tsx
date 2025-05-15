import React, { useState } from "react";
import { appTheme } from "../../../../../constant/theme";
import DashboardTableHeader from "./dashboardTableHeader";

export const DashboardTable = ({
  columns,
  children,
  theme,
}: {
  columns: any[];
  children: React.ReactNode;
  theme: "light" | "dark";
}) => (
  <div>
    {/* Desktop Table */}
    <div className="hidden sm:block overflow-x-auto">
      <table className="w-full">
        <thead style={{ backgroundColor: appTheme[theme].surface.primary }}>
          <tr>
            {columns.map((col, index) => (
              <DashboardTableHeader
                key={index}
                theme={theme}
                className={col.className}
              >
                {col.header}
              </DashboardTableHeader>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>

    {/* Mobile Card View */}
    <div className="block sm:hidden space-y-4">
      {React.Children.map(children, (row: any, index: number) => {
        const [expanded, setExpanded] = useState(false);
        const cells = React.Children.toArray(row.props.children);

        return (
          <div
            key={index}
            className="rounded-xl border shadow-sm p-4 relative"
            style={{
              backgroundColor: appTheme[theme].surface.primary,
              color: theme === "light" ? appTheme.text.primary : appTheme.text.inverted,
              borderColor: appTheme[theme].neutral[200],
            }}
          >
            {cells.slice(0, 2).map((cell: any, cellIndex: number) => (
              <div key={cellIndex} className="mb-2 last:mb-0">
                <div className="text-xs font-semibold text-gray-500 mb-1">
                  {columns[cellIndex]?.header}
                </div>
                <div className="text-sm">{cell.props.children}</div>
              </div>
            ))}

            {expanded &&
              cells.slice(2).map((cell: any, cellIndex: number) => (
                <div key={cellIndex + 2} className="mb-2 last:mb-0">
                  <div className="text-xs font-semibold text-gray-500 mb-1">
                    {columns[cellIndex + 2]?.header}
                  </div>
                  <div className="text-sm">{cell.props.children}</div>
                </div>
              ))}

            {/* Toggle Button */}
            {cells.length > 2 && (
              <button
                className="mt-3 text-xs font-semibold underline text-blue-500"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  </div>
);
