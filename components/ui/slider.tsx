"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    variant?: "default" | "range" | "volume"
    showValue?: boolean
    formatValue?: (value: number) => string
  }
>(({ className, variant = "default", showValue = false, formatValue, ...props }, ref) => (
  <div className="w-full">
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
        <SliderPrimitive.Range className="absolute h-full bg-blue-600 dark:bg-blue-500 transition-colors" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-blue-600 bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-blue-500 dark:bg-gray-900" />
      {variant === "range" && props.value && props.value.length > 1 && (
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-blue-600 bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-blue-500 dark:bg-gray-900" />
      )}
    </SliderPrimitive.Root>
    {showValue && props.value && (
      <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
        {Array.isArray(props.value) ? (
          <>
            <span>{formatValue ? formatValue(props.value[0]) : props.value[0]}</span>
            <span>{formatValue ? formatValue(props.value[1]) : props.value[1]}</span>
          </>
        ) : (
          <span>{formatValue ? formatValue(props.value) : props.value}</span>
        )}
      </div>
    )}
  </div>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider } 