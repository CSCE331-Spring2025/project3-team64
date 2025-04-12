"use client";

import React, { useState, useEffect } from "react";
import { DatePicker } from "./datePicker";
import { format } from "date-fns";
import { xReportService } from "@/app/service/reportService";
import { Report } from "@/app/service/types";

export default function XReport() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // format date for display in the report
  const getFormattedDisplayDate = () => {
    if (!selectedDate) return "Not selected";
    return format(selectedDate, "MMMM d, yyyy");
  };
  
  // format date for API when needed
  const getFormattedDateForAPI = () => {
    if (!selectedDate) return "";
    return format(selectedDate, "yyyy-MM-dd");
  };
  
  // fetch report data from API
  const fetchReportData = async () => {
    if (!selectedDate) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Call the API service
      const data = await xReportService.getXReport();
      
      setReport(data)
    } catch (error) {
      console.error("Error fetching report:", error);
      setError("Failed to load report data. Please try again.");
      setReport(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch report data when component mounts or date changes
  useEffect(() => {
    fetchReportData();
  }, [selectedDate]);

  // format hours
  const formatHour = (hour: number) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:00 ${ampm}`;
  };


  return (
    <main className="mt-4 px-2">
      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm">Date</p>
          <DatePicker 
            value={selectedDate}
            onChange={setSelectedDate}
          />
          {isLoading && (
            <div className="ml-2 text-sm text-gray-500">
              Loading...
            </div>
          )}
        </div>
        {error && (
          <div className="mt-2 text-red-500 text-sm">
            {error}
          </div>
        )}
      </div>
      
      {report && !isLoading ? (
        <div className="flex gap-4 mt-4 flex-wrap">
          <div className="w-full max-w-[450px] border border-[#6F403A] p-4 rounded-xl flex flex-col gap-4">
            <div>
              <p className="text-lg font-semibold">{report.reportType} Summary</p>
              <hr className="border-t-2 border-[#6F403A] my-2" />
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <p>Total Sales</p>
                  <p>${report.totalSales}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p>Total Transactions</p>
                  <p>${report.totalTransactions}</p>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-lg font-semibold">Hourly Sales</p>
              <div className="grid grid-cols-[1fr_auto_auto] gap-8 text-sm">
                <p>Time</p>
                <p>Transactions</p>
                <p>Sales</p>
              </div>
              <hr className="border-t-2 border-[#6F403A] my-2" />
              <div className="grid gap-1 max-h-64 overflow-y-auto">
                {report.hourlySales.map((hourData, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-[1fr_auto_auto] gap-6 text-sm"
                  >
                    <p>{formatHour(hourData.hour)}</p>
                    <p>{hourData.transactionCount}</p>
                    <p>{hourData.totalSales}</p>
                  </div>
                ))}
              </div>
              <hr className="border-t border-[#6F403A] my-2" />
              <div className="flex justify-between font-semibold">
                <p>Total</p>
                <p>${report.totalSales}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col border border-[#6F403A] items-center text-center p-4 rounded-xl self-start">
            <p className="text-lg font-semibold">Report Generation Details</p>
            <div className="mt-2 flex flex-col">
              <p className="font-semibold">{report.reportType}</p>
              <p className="font-semibold">Bubbleflow</p>
              <p className="text-sm">789 Rue de Fleurs</p>
              <p className="text-sm">55555 Belgueux, France</p>
              <p className="text-sm">Owned by XYZ Sigma Inc.</p>
            </div>
            <div className="flex flex-col mt-2">
              <p className="font-semibold">Generated On</p>
              <p className="text-sm">
                {report.generatedAt ? 
                  format(new Date(report.generatedAt), "MMMM d, yyyy HH:mm:ss") : 
                  `${getFormattedDisplayDate()} ${format(new Date(), "HH:mm:ss")}`}
              </p>
            </div>
          </div>
        </div>
      ) : !error && !isLoading ? (
        <div className="mt-4 text-center text-gray-500">
          Select a date to view the X-Report
        </div>
      ) : null}
    </main>
  );
}