"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { reportService } from "@/app/service/reportService";
import { Report } from "@/app/service/types";

export default function ZReport() {
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getFormattedDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy");
  };

  const fetchReportData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await reportService.getZReport();
      setReport(data);
    } catch (error) {
      console.error("Error fetching Z report:", error);
      setError("Failed to load Z report data. Please try again");
      setReport(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  const fmt = (value: number | string | undefined) =>
    Number(value ?? 0).toFixed(2);

  return (
    <div className="mt-4 px-2">
      <div>
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold">Z Report</p>
        </div>
      </div>

      {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
      {isLoading && <div className="mt-4 text-gray-500">Loading...</div>}

      {report && !isLoading ? (
        <div className="flex gap-4 mt-4 flex-wrap">
          <div className="w-full max-w-[450px] border border-[#6F403A] p-4 rounded-xl flex flex-col gap-4">
            <div>
              <p className="text-lg font-semibold">Z Report Summary</p>
              <hr className="border-t-2 border-[#6F403A] my-2" />

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <p>Net Sales</p>
                  <p>${fmt(report.total_NET_SALES)}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p>Tax</p>
                  <p>${fmt(report.tax)}</p>
                </div>
                <div className="flex justify-between text-sm font-semibold">
                  <p>Gross Sales</p>
                  <p>${fmt(report.gross_SALES)}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-lg font-semibold">Sales by Category</p>
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-8 text-sm">
                <div className="font-semibold pb-1">Category</div>
                <div className="font-semibold pb-1 text-center">Quantity</div>
                <div className="font-semibold pb-1 text-right">Sales</div>

                <div className="col-span-3">
                  <hr className="border-t-2 border-[#6F403A]" />
                </div>

                {report.salesCategories?.map((category, idx) => (
                  <React.Fragment key={idx}>
                    <div className="pt-1">{category.category}</div>
                    <div className="pt-1 text-center">{category.quantity}</div>
                    <div className="pt-1 text-right">
                      ${fmt(category.sales)}
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <hr className="border-t border-[#6F403A] my-2" />
              <div className="flex justify-between font-semibold">
                <p>Total</p>
                <p>${fmt(report.sales_CATEGORY_TOTAL)}</p>
              </div>
            </div>

            <div>
              <p className="text-lg font-semibold">Payment Methods</p>
              <div className="grid grid-cols-[1fr_auto] gap-8 text-sm">
                <p>Method</p>
                <p>Amount</p>
              </div>
              <hr className="border-t-2 border-[#6F403A] my-2" />

              <div className="grid gap-1 max-h-64 overflow-y-auto">
                {report.paymentMethods?.map((payment, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-[1fr_auto] gap-6 text-sm"
                  >
                    <p>{payment.paymentMethod}</p>
                    <p>${fmt(payment.amount)}</p>
                  </div>
                ))}
              </div>

              <hr className="border-t border-[#6F403A] my-2" />

              <div className="flex justify-between font-semibold">
                <p>Total Payments</p>
                <p>${fmt(report.total_PAYMENTS)}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col border border-[#6F403A] items-center text-center p-4 rounded-xl self-start">
            <p className="text-lg font-semibold">Report Generation Details</p>
            <div className="mt-2 flex flex-col">
              <p className="font-semibold">Z Report</p>
              <p className="font-semibold">Bubbleflow</p>
              <p className="text-sm">789 Rue de Fleurs</p>
              <p className="text-sm">55555 Belgueux, France</p>
              <p className="text-sm">Owned by XYZ Sigma Inc.</p>
            </div>

            <div className="flex flex-col mt-2">
              <p className="font-semibold">Report Date</p>
              <p className="text-sm">
                {report.reportDate
                  ? getFormattedDisplayDate(report.reportDate)
                  : format(new Date(), "MMMM d, yyyy")}
              </p>
              <p className="font-semibold mt-2">Generated At</p>
              <p className="text-sm">
                {report.generatedAt
                  ? format(new Date(report.generatedAt), "HH:mm:ss")
                  : format(new Date(), "HH:mm:ss")}
              </p>
            </div>
          </div>
        </div>
      ) : !error && !isLoading ? (
        <div className="mt-4 text-center text-gray-500">
          Loading Z-Report...
        </div>
      ) : null}
    </div>
  );
}

