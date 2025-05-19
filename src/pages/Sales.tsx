
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Users, Box, DollarSign, Plus, Search } from "lucide-react";
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
import { SaleEntryForm } from "@/components/SaleEntryForm";

const Sales = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  // Sample sales data - in a real app, this would come from an API
  const [salesData, setSalesData] = useState([
    {
      id: 1,
      date: new Date(2025, 4, 15),
      partyName: "Sharma Enterprises",
      totalBoxes: 25,
      totalAmount: 12500,
      status: "Delivered"
    },
    {
      id: 2,
      date: new Date(2025, 4, 17),
      partyName: "Kumar Trading Co.",
      totalBoxes: 15,
      totalAmount: 7500,
      status: "Pending"
    },
    {
      id: 3,
      date: new Date(2025, 4, 18),
      partyName: "Singh Distributors",
      totalBoxes: 30,
      totalAmount: 15000,
      status: "Processing"
    }
  ]);
  
  const handleAddSale = (saleData: { partyName: string; totalBoxes: number; amount: number }) => {
    const newSale = {
      id: salesData.length + 1,
      date: selectedDate || new Date(),
      partyName: saleData.partyName,
      totalBoxes: saleData.totalBoxes,
      totalAmount: saleData.amount,
      status: "Pending"
    };
    
    setSalesData([...salesData, newSale]);
    
    toast({
      title: "Sale entry added",
      description: `Sale to ${saleData.partyName} has been recorded successfully.`
    });
    
    setIsFormOpen(false);
  };

  const filteredSales = salesData.filter(sale => 
    sale.partyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sale.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header for Sales Page */}
      <header className="bg-hissabkitab-blue text-white shadow-md">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold">Sales Management</h1>
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
                placeholder="Search sales..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Button onClick={() => setIsFormOpen(true)} className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add New Sale
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Today's Sales</CardDescription>
              <CardTitle className="text-2xl">₹ 15,000</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12% from yesterday</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Parties</CardDescription>
              <CardTitle className="text-2xl">24</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">3 new this month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Boxes Sold</CardDescription>
              <CardTitle className="text-2xl">135</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center">
                <Box className="h-4 w-4 text-purple-500 mr-1" />
                <span className="text-sm text-purple-600">+22% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales Table */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Records</CardTitle>
            <CardDescription>Manage all your sales transactions here</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead>Party Name</TableHead>
                    <TableHead className="text-right">Boxes</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSales.length > 0 ? (
                    filteredSales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell className="font-medium">{format(sale.date, "dd/MM/yyyy")}</TableCell>
                        <TableCell>{sale.partyName}</TableCell>
                        <TableCell className="text-right">{sale.totalBoxes}</TableCell>
                        <TableCell className="text-right">₹ {sale.totalAmount.toLocaleString()}</TableCell>
                        <TableCell className="text-center">
                          <span className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                            sale.status === "Delivered" ? "bg-green-100 text-green-800" : 
                            sale.status === "Processing" ? "bg-blue-100 text-blue-800" : 
                            "bg-yellow-100 text-yellow-800"
                          )}>
                            {sale.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No sales found matching your search.
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

        {/* Sale Entry Form Dialog */}
        {isFormOpen && (
          <SaleEntryForm 
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSave={handleAddSale}
            selectedDate={selectedDate}
          />
        )}
      </main>
    </div>
  );
};

export default Sales;
