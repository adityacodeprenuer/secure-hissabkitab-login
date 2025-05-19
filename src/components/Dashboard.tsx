
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Users, AlertCircle, Calendar } from "lucide-react";
import { Button } from "./ui/button";

// Sample data for the dashboard
const transactionData = [
  { name: 'Jan', amount: 400 },
  { name: 'Feb', amount: 300 },
  { name: 'Mar', amount: 600 },
  { name: 'Apr', amount: 800 },
  { name: 'May', amount: 500 },
  { name: 'Jun', amount: 900 },
];

const recentActivities = [
  { id: 1, description: "Invoice #1234 paid", amount: "₹15,000", date: "Today" },
  { id: 2, description: "New expense added", amount: "₹2,500", date: "Yesterday" },
  { id: 3, description: "Payroll processed", amount: "₹35,000", date: "3 days ago" },
];

const Dashboard = ({ userType = "Worker" }: { userType?: string }) => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4 due today</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{userType === "Owner" ? "Active Workers" : "Working Days"}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userType === "Owner" ? "7" : "22"}</div>
            <p className="text-xs text-muted-foreground">{userType === "Owner" ? "+2 last week" : "This month"}</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-muted-foreground">Year-over-year</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2 hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>Monthly transaction volume</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={transactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#2C7A7B" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest financial activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium text-sm">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                  <div className="font-medium">{activity.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">View All Activity</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Additional Content for Each User Type */}
      {userType === "Owner" ? (
        <Card className="hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle>Worker Performance</CardTitle>
            <CardDescription>This month's productivity metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Rajesh Kumar</span>
                  <span className="text-sm text-muted-foreground">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Priya Sharma</span>
                  <span className="text-sm text-muted-foreground">88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Anil Verma</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">View All Workers</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle>Your Schedule</CardTitle>
            <CardDescription>Upcoming shifts and tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 border-l-2 border-hissabkitab-teal pl-4">
                <Calendar className="h-4 w-4" />
                <div>
                  <p className="font-medium text-sm">Morning Shift</p>
                  <p className="text-xs text-muted-foreground">Today, 8:00 AM - 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-l-2 border-hissabkitab-blue pl-4">
                <Calendar className="h-4 w-4" />
                <div>
                  <p className="font-medium text-sm">Inventory Count</p>
                  <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-l-2 border-gray-300 pl-4">
                <Calendar className="h-4 w-4" />
                <div>
                  <p className="font-medium text-sm">Evening Shift</p>
                  <p className="text-xs text-muted-foreground">May 21, 4:00 PM - 10:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">View Full Schedule</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
