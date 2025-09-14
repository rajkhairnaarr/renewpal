"use client"

import * as React from "react"
import { Check, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepperStep {
  id: string
  title: string
  description?: string
  status: "pending" | "current" | "completed" | "error"
}

interface StepperProps {
  steps: StepperStep[]
  currentStep: number
  onStepClick?: (stepIndex: number) => void
  orientation?: "horizontal" | "vertical"
  className?: string
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, currentStep, onStepClick, orientation = "horizontal", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "flex-row" : "flex-col",
          className
        )}
        {...props}
      >
        {steps.map((step, index) => {
          const isCompleted = step.status === "completed"
          const isCurrent = step.status === "current"
          const isError = step.status === "error"
          const isClickable = onStepClick && (isCompleted || isCurrent)

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center",
                orientation === "horizontal" ? "flex-1" : "mb-4"
              )}
            >
              <div className="flex items-center">
                <button
                  onClick={() => isClickable && onStepClick(index)}
                  disabled={!isClickable}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                    isCompleted && "border-blue-600 bg-blue-600 text-white",
                    isCurrent && "border-blue-600 bg-white text-blue-600",
                    isError && "border-red-600 bg-red-600 text-white",
                    !isCompleted && !isCurrent && !isError && "border-gray-300 bg-white text-gray-400",
                    isClickable && "cursor-pointer hover:scale-105",
                    !isClickable && "cursor-default"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </button>
                
                <div className="ml-4 flex-1">
                  <h3
                    className={cn(
                      "text-sm font-medium",
                      isCompleted && "text-blue-600",
                      isCurrent && "text-blue-600",
                      isError && "text-red-600",
                      !isCompleted && !isCurrent && !isError && "text-gray-500"
                    )}
                  >
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                  )}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-4 h-px flex-1",
                    orientation === "horizontal" ? "w-full" : "h-8 w-px",
                    isCompleted ? "bg-blue-600" : "bg-gray-300"
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    )
  }
)
Stepper.displayName = "Stepper"

export { Stepper }
export type { StepperStep } 