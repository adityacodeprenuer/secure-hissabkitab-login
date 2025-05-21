
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  LogOut,
  Camera,
  Edit,
  Star,
  Clock,
  Calendar,
  MapPin,
  Award,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const WorkerProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Mock worker data (in real app, this would come from context/api)
  const [workerData, setWorkerData] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 87654 32109",
    role: "Cutting Master",
    joinDate: "10 Feb, 2023",
    profileImage: "/placeholder.svg",
    address: "789 Worker Colony, Delhi, India",
    skills: ["Cutting", "Stitching", "Pattern Making"],
    currentStatus: "Active",
    workHistory: [
      { 
        taskId: "T-001", 
        description: "Linen Shirt - Size M", 
        completedOn: "15 Apr 2025", 
        piecesDone: 25, 
        qualityRating: 4.8 
      },
      { 
        taskId: "T-002", 
        description: "Cotton Pants - Size 32", 
        completedOn: "20 Apr 2025", 
        piecesDone: 18, 
        qualityRating: 4.5 
      },
      { 
        taskId: "T-003", 
        description: "Denim Jacket - Size L", 
        completedOn: "25 Apr 2025", 
        piecesDone: 12, 
        qualityRating: 4.9 
      }
    ],
    currentAssignments: [
      { 
        lotNo: "L-2025-045", 
        item: "Summer Collection - Shirts", 
        dueDate: "30 May 2025", 
        piecesAssigned: 30, 
        piecesCompleted: 10 
      }
    ],
    statistics: {
      totalCompletedTasks: 156,
      currentMonthTasks: 12,
      averageQuality: 4.7,
      totalPiecesCompleted: 2450
    },
    payments: {
      pendingAmount: "₹15,000",
      lastPaymentDate: "30 Mar 2025",
      lastPaymentAmount: "₹22,500",
      paymentHistory: [
        { date: "30 Mar 2025", amount: "₹22,500", lotNo: "L-2025-032" },
        { date: "28 Feb 2025", amount: "₹18,000", lotNo: "L-2025-021" },
        { date: "31 Jan 2025", amount: "₹20,000", lotNo: "L-2025-010" }
      ]
    }
  });

  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    address: z.string().min(5, { message: "Address must be at least 5 characters." }),
    currentStatus: z.string().min(2, { message: "Status is required." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: workerData.name,
      email: workerData.email,
      phone: workerData.phone,
      address: workerData.address,
      currentStatus: workerData.currentStatus,
    },
  });

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  const handleSaveProfile = (values: z.infer<typeof formSchema>) => {
    // In a real app, we would send this to an API
    setWorkerData({
      ...workerData,
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      currentStatus: values.currentStatus,
    });
    
    setIsEditing(false);
    
    toast({
      title: "Profile updated",
      description: "Worker profile has been updated successfully",
    });
  };

  const calculateProgress = (completed: number, total: number) => {
    return (completed / total) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-hissabkitab-blue text-white shadow-md">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Worker Profile</h1>
          <Button variant="ghost" size="icon" className="text-white" onClick={() => navigate('/home')}>
            <User className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        {/* Profile Header with Avatar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-hissabkitab-blue">
                <AvatarImage src={workerData.profileImage} alt={workerData.name} />
                <AvatarFallback>{workerData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                variant="outline"
                className="absolute bottom-0 right-0 rounded-full bg-white"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold">{workerData.name}</h2>
                <Badge className="bg-hissabkitab-blue self-center md:self-auto">{workerData.role}</Badge>
                <Badge variant="outline" className="self-center md:self-auto border-green-500 text-green-600">
                  {workerData.currentStatus}
                </Badge>
              </div>
              <div className="text-gray-500 flex flex-col gap-1">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="h-4 w-4" /> {workerData.email}
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Phone className="h-4 w-4" /> {workerData.phone}
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <MapPin className="h-4 w-4" /> {workerData.address}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Working since {workerData.joinDate}</p>
              <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                {workerData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
            <div>
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="h-4 w-4" /> Edit Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="work">Work History</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="skills">Skills & Rating</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Total Tasks Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{workerData.statistics.totalCompletedTasks}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Current Month Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{workerData.statistics.currentMonthTasks}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Average Quality</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-1">
                      <p className="text-2xl font-bold">{workerData.statistics.averageQuality}</p>
                      <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Total Pieces</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{workerData.statistics.totalPiecesCompleted}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Current Assignments */}
                <Card>
                  <CardHeader>
                    <CardTitle>Current Assignments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {workerData.currentAssignments.length > 0 ? (
                      <div className="space-y-4">
                        {workerData.currentAssignments.map((assignment, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                              <div>
                                <h4 className="font-semibold">{assignment.item}</h4>
                                <p className="text-sm text-gray-500">Lot No: {assignment.lotNo}</p>
                              </div>
                              <div className="flex items-center gap-2 mt-2 md:mt-0">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">Due: {assignment.dueDate}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{assignment.piecesCompleted} of {assignment.piecesAssigned} pieces</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className="bg-green-500 h-2.5 rounded-full" 
                                  style={{ width: `${calculateProgress(assignment.piecesCompleted, assignment.piecesAssigned)}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No current assignments.</p>
                    )}
                  </CardContent>
                </Card>

                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!isEditing ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Name</h4>
                            <p>{workerData.name}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Email</h4>
                            <p>{workerData.email}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                            <p>{workerData.phone}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Address</h4>
                            <p>{workerData.address}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Current Status</h4>
                            <p>{workerData.currentStatus}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSaveProfile)} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Worker name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Worker email" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Worker phone number" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Address</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Worker address" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="currentStatus"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Current Status</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Worker status" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="flex justify-end gap-2">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setIsEditing(false)}
                            >
                              Cancel
                            </Button>
                            <Button type="submit">Save Changes</Button>
                          </div>
                        </form>
                      </Form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Work History Tab */}
            <TabsContent value="work">
              <Card>
                <CardHeader>
                  <CardTitle>Work History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Task ID</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Completed On</TableHead>
                        <TableHead>Pieces</TableHead>
                        <TableHead>Quality Rating</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {workerData.workHistory.map((task, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{task.taskId}</TableCell>
                          <TableCell>{task.description}</TableCell>
                          <TableCell>{task.completedOn}</TableCell>
                          <TableCell>{task.piecesDone}</TableCell>
                          <TableCell className="flex items-center gap-1">
                            {task.qualityRating}
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Pending Amount</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-amber-600">{workerData.payments.pendingAmount}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Last Payment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{workerData.payments.lastPaymentAmount}</p>
                      <p className="text-sm text-gray-500">on {workerData.payments.lastPaymentDate}</p>
                    </CardContent>
                  </Card>
                  <Card className="md:col-span-1">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Payment Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">Make Payment</Button>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Lot Number</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {workerData.payments.paymentHistory.map((payment, index) => (
                          <TableRow key={index}>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell>{payment.amount}</TableCell>
                            <TableCell>{payment.lotNo}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Skills & Rating Tab */}
            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Current Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {workerData.skills.map((skill, index) => (
                          <Badge key={index} className="px-3 py-1 text-base">{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Performance Metrics</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Quality of Work</span>
                            <span className="flex items-center gap-1">
                              4.8 <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '96%' }}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Timeliness</span>
                            <span className="flex items-center gap-1">
                              4.5 <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Efficiency</span>
                            <span className="flex items-center gap-1">
                              4.7 <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '94%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Certifications & Awards</h3>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Award className="h-5 w-5 text-amber-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Best Quality Award</p>
                            <p className="text-sm text-gray-500">February 2025</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Award className="h-5 w-5 text-amber-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Most Efficient Worker</p>
                            <p className="text-sm text-gray-500">December 2024</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Logout Button */}
        <div className="mt-8 flex justify-center">
          <Button 
            variant="outline" 
            className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
