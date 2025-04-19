"use client";
import SalesCard from "./salesCard";
import { DatePicker } from "./datePicker";
import { useState, useEffect } from "react";
import { reportService } from "@/app/service/reportService";
import { Report } from "@/app/service/types";
import { format } from "date-fns";

export default function SalesReport() {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(
    new Date()
  );

  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);

  // format date for API when needed
  const getFormattedDatesForAPI = () => {
    if (!selectedStartDate || !selectedEndDate)
      return {
        startDate: "",
        endDate: "",
      };

    return {
      startDate: format(selectedStartDate, "yyyy-MM-dd"),
      endDate: format(selectedEndDate, "yyyy-MM-dd"),
    };
  };

  const fetchSalesData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const formattedDates = getFormattedDatesForAPI();

      if (!formattedDates.startDate || !formattedDates.endDate) {
        setError("Please select both start and end dates");
        setIsLoading(false);
        return;
      }

      const data = await reportService.getSalesReport(
        formattedDates.startDate,
        formattedDates.endDate
      );
      setReport(data);
    } catch (error) {
      console.error("Error fetching report:", error);
      setError("Failed to load report data. Please try again");
      setReport(null);
    } finally {
      setIsLoading(false);
    }
  };

  // run fetchSalesData whenever dates change
  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      fetchSalesData();
    }
  }, [selectedStartDate, selectedEndDate]);

  return (
    <main className="flex flex-col px-2 gap-4 mt-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex gap-2 items-center">
          <p>From</p>
          <DatePicker
            value={selectedStartDate}
            onChange={setSelectedStartDate}
          />
        </div>
        <div className="flex gap-2 items-center">
          <p>To</p>
          <DatePicker value={selectedEndDate} onChange={setSelectedEndDate} />
        </div>
      </div>
      {isLoading && (
        <span className="text-gray-500 flex items-center">Loading...</span>
      )}
      {error && <div>{error}</div>}

      {report && report.itemSales && report.itemSales.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {report.itemSales.map((item) => {
              const unitPrice =
                item.quantitySold > 0 ? item.totalSales / item.quantitySold : 0;

              return (
                <SalesCard
                  key={item.itemName}
                  id={item.quantitySold}
                  name={item.itemName}
                  category={item.category}
                  price={`${unitPrice.toFixed(2)}`}
                  revenue={`$${item.totalSales.toFixed(2)}`}
                />
              );
            })}
          </div>
        </div>
      ) : report ? (
        <div className=" text-gray-500">
          No sales data available for the selected period
        </div>
      ) : null}
    </main>
  );
}
