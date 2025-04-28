"use client";
import ZReport from "@/components/zReport";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SalesReport from "@/components/salesReport";
import XReport from "@/components/xReport";

// Reports page for the manager
export default function Reports() {
  return (
    <main className="flex flex-col px-16 pb-4">
      <Tabs defaultValue="x-report">
        <TabsList>
          <TabsTrigger value="x-report">X Report</TabsTrigger>
          <TabsTrigger value="z-report">Z Report</TabsTrigger>
          <TabsTrigger value="sales-report">Sales Report</TabsTrigger>
        </TabsList>
        <TabsContent value="x-report">
          <XReport />
        </TabsContent>
        <TabsContent value="z-report">
          <ZReport />
        </TabsContent>
        <TabsContent value="sales-report">
          <SalesReport />
        </TabsContent>
      </Tabs>
    </main>
  );
}
