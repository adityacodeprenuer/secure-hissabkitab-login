
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, FileText, Plus, Search, UserCog } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { ProductionEntryForm } from "@/components/ProductionEntryForm";

const Production = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  // Sample production data - in a real app, this would come from an API
  const [productionData, setProductionData] = useState([
    {
      id: 1,
      date: new Date(2025, 4, 15),
      lotNo: "L-1234",
      size: "XL",
      cuttingMaster: "Rajan Singh",
      silaiKariger: "Mohan Kumar",
      lastDate: new Date(2025, 4, 20),
      maalAaya: true,
      pressDate: new Date(2025, 4, 18),
      pressKariger: "Suresh Yadav",
      status: "In Progress"
    },
    {
      id: 2,
      date: new Date(2025, 4, 16),
      lotNo: "L-1235",
      size: "M",
      cuttingMaster: "Vikram Patel",
      silaiKariger: "Rajesh Sharma",
      lastDate: new Date(2025, 4, 22),
      maalAaya: false,
      pressDate: null,
      pressKariger: "",
      status: "Pending"
    },
    {
      id: 3,
      date: new Date(2025, 4, 14),
      lotNo: "L-1233",
      size: "L",
      cuttingMaster: "Ajay Verma",
      silaiKariger: "Dinesh Kumar",
      lastDate: new Date(2025, 4, 19),
      maalAaya: true,
      pressDate: new Date(2025, 4, 17),
      pressKariger: "Rakesh Gupta",
      status: "Completed"
    }
  ]);
  
  const handleAddProduction = (data: {
    lotNo: string;
    size: string;
    cuttingMaster: string;
    silaiKariger: string;
    lastDate: Date | null;
    maalAaya: boolean;
    pressDate: Date | null;
    pressKariger: string;
  }) => {
    const newProduction = {
      id: productionData.length + 1,
      date: selectedDate || new Date(),
      ...data,
      status: "Pending"
    };
    
    setProductionData([...productionData, newProduction]);
    
    toast({
      title: "Production entry added",
      description: `Production entry for Lot ${data.lotNo} has been recorded successfully.`
    });
    
    setIsFormOpen(false);
  };

  const filteredData = productionData.filter(item => 
    item.lotNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.size.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.cuttingMaster.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.silaiKariger.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header for Production Page */}
      <header className="bg-hissabkitab-blue text-white shadow-md">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold">Production Management</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 flex-1">
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex flex-col md:flex-row gap-2 items-start md:items-center w-full md:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full md:w-auto justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search production..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Button onClick={() => setIsFormOpen(true)} className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add New Production
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>In Progress</CardDescription>
              <CardTitle className="text-2xl">
                {productionData.filter(item => item.status === "In Progress").length}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center">
                <UserCog className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">Production underway</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-2xl">
                {productionData.filter(item => item.status === "Pending").length}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-amber-500 mr-1" />
                <span className="text-sm text-amber-600">Awaiting materials</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Completed</CardDescription>
              <CardTitle className="text-2xl">
                {productionData.filter(item => item.status === "Completed").length}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">Ready for delivery</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Production Table */}
        <Card>
          <CardHeader>
            <CardTitle>Production Records</CardTitle>
            <CardDescription>Manage all your production lots here</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead>Lot No</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Cutting Master</TableHead>
                    <TableHead>Silai Kariger</TableHead>
                    <TableHead>Maal Aaya</TableHead>
                    <TableHead>Press Kariger</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{format(item.date, "dd/MM/yyyy")}</TableCell>
                        <TableCell>{item.lotNo}</TableCell>
                        <TableCell>{item.size}</TableCell>
                        <TableCell>{item.cuttingMaster}</TableCell>
                        <TableCell>{item.silaiKariger}</TableCell>
                        <TableCell>{item.maalAaya ? "Yes" : "No"}</TableCell>
                        <TableCell>{item.pressKariger || "-"}</TableCell>
                        <TableCell className="text-center">
                          <span className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                            item.status === "Completed" ? "bg-green-100 text-green-800" : 
                            item.status === "In Progress" ? "bg-blue-100 text-blue-800" : 
                            "bg-yellow-100 text-yellow-800"
                          )}>
                            {item.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No production records found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Export</Button>
            <Button variant="outline">Print</Button>
          </CardFooter>
        </Card>

        {/* Production Entry Form Dialog */}
        {isFormOpen && (
          <ProductionEntryForm 
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSave={handleAddProduction}
            selectedDate={selectedDate}
          />
        )}
      </main>
    </div>
  );
};

export default Production;
