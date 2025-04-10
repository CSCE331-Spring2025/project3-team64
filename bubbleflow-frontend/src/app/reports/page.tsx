"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          sigma
        </TabsContent>
        <TabsContent value="z-report">sigma sigma sigma sigma sigmaa sigma sigmasigma sigma</TabsContent>
        <TabsContent value="sales-report">sigma sigma sigma</TabsContent>
      </Tabs>
    </main>
  );
}
