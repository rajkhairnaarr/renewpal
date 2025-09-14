"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TimelineItem {
  id: string
  title: string
  description?: string
  date?: string
  status?: "default" | "success" | "warning" | "error"
  icon?: React.ReactNode
}

interface TimelineProps {
  items: TimelineItem[]
  orientation?: "vertical" | "horizontal"
  className?: string
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ items, orientation = "vertical", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative",
          orientation === "vertical" ? "space-y-6" : "flex space-x-6",
          className
        )}
        {...props}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const statusColor = {
            default: "bg-gray-400",
            success: "bg-green-500",
            warning: "bg-yellow-500",
            error: "bg-red-500",
          }[item.status || "default"]

          return (
            <div
              key={item.id}
              className={cn(
                "relative",
                orientation === "vertical" ? "flex" : "flex-col items-center"
              )}
            >
              {/* Timeline dot */}
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-sm",
                  statusColor,
                  "text-white"
                )}
              >
                {item.icon || (
                  <div className="h-2 w-2 rounded-full bg-white" />
                )}
              </div>

              {/* Timeline line */}
              {!isLast && (
                <div
                  className={cn(
                    "absolute bg-gray-200 dark:bg-gray-700",
                    orientation === "vertical"
                      ? "left-4 top-8 h-full w-0.5"
                      : "top-4 h-0.5 w-full"
                  )}
                />
              )}

              {/* Content */}
              <div
                className={cn(
                  "flex-1",
                  orientation === "vertical" ? "ml-6" : "mt-4 text-center"
                )}
              >
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                  )}
                  {item.date && (
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {item.date}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
)
Timeline.displayName = "Timeline"

export { Timeline }
export type { TimelineItem } 