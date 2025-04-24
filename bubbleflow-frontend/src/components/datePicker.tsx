"use client"

import * as React from "react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RiCalendarLine } from "react-icons/ri"

interface DatePickerProps {
  onChange?: (date: Date | undefined) => void;
  value?: Date;
  format?: string;
}

export function DatePicker({ onChange, value, format: dateFormat = "PPP" }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value)

  // update both local state and parent component when date changes
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate)
    if (onChange) {
      onChange(newDate)
    }
  }

  // update local state if value prop changes
  React.useEffect(() => {
    if (value !== date) {
      setDate(value)
    }
  }, [value])

  // Get formatted date string for API
  const getFormattedDate = () => {
    if (!date) return null
    
    // for api endpoint
    return format(date, "yyyy-MM-dd")
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal rounded-xl",
              !date && "text-gray-500"
            )}
          >
            <RiCalendarLine className="mr-2 h-4 w-4" />
            {date ? format(date, dateFormat) : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" side="bottom" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}