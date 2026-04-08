import { Link, useParams } from "react-router";
import { ArrowLeft, Building2, Users, DollarSign, Edit, Download, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function SocietyDetails() {
  const { id } = useParams();

  // Mock data - in a real app, this would be fetched based on the ID
  const society = {
    id: parseInt(id || "1"),
    name: "NITEL Staff Cooperative",
    registrationNumber: "RC-001-2020",
    members: 145,
    totalSavings: "₦8,450,000",
    activeLoans: 23,
    totalLoansValue: "₦4,230,000",
    status: "active",
    dateCreated: "Jan 15, 2020",
    address: "Plot 32, Ahmadu Bello Way, Victoria Island, Lagos",
    contactPerson: "Mrs. Ngozi Adeniyi",
    phone: "+234 803 456 7890",
    email: "nitel.coop@example.com"
  };

  const recentMembers = [
    { id: 1, name: "Chioma Eze", memberNumber: "MEM-001", joinDate: "Jan 2020", savings: "₦125,000", status: "active" },
    { id: 2, name: "Oluwaseun Balogun", memberNumber: "MEM-002", joinDate: "Feb 2020", savings: "₦98,500", status: "active" },
    { id: 3, name: "Fatima Abubakar", memberNumber: "MEM-003", joinDate: "Mar 2020", savings: "₦156,000", status: "active" },
    { id: 4, name: "Emmanuel Okafor", memberNumber: "MEM-004", joinDate: "Apr 2020", savings: "₦89,000", status: "active" },
  ];

  const monthlyContributions = [
    { month: "March 2026", totalCollected: "₦1,825,000", members: 145, status: "finalized" },
    { month: "February 2026", totalCollected: "₦1,798,000", members: 143, status: "finalized" },
    { month: "January 2026", totalCollected: "₦1,756,000", members: 140, status: "finalized" },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div>
        <Link to="/societies">
          <Button variant="ghost" className="gap-2 -ml-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Societies
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center">
            <Building2 className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-semibold text-gray-900">{society.name}</h1>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                Active
              </Badge>
            </div>
            <p className="text-gray-600">{society.registrationNumber}</p>
            <p className="text-sm text-gray-500 mt-1">Created on {society.dateCreated}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Edit className="w-4 h-4" />
            Edit Society
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <CardDescription>Total Members</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">{society.members}</h3>
            <p className="text-sm text-green-600 mt-2">+12 this month</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="w-4 h-4" />
              <CardDescription>Total Savings</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">{society.totalSavings}</h3>
            <p className="text-sm text-green-600 mt-2">+15.3% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <CardDescription>Active Loans</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">{society.activeLoans}</h3>
            <p className="text-sm text-gray-600 mt-2">{society.totalLoansValue} disbursed</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <CardDescription>Collection Rate</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">96.5%</h3>
            <p className="text-sm text-green-600 mt-2">Excellent compliance</p>
          </CardContent>
        </Card>
      </div>

      {/* Society Information */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Society Information</CardTitle>
          <CardDescription>Contact details and registration information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Contact Person</label>
                <p className="text-gray-900 mt-1">{society.contactPerson}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Phone Number</label>
                <p className="text-gray-900 mt-1">{society.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email Address</label>
                <p className="text-gray-900 mt-1">{society.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Address</label>
                <p className="text-gray-900 mt-1">{society.address}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Registration Number</label>
                <p className="text-gray-900 mt-1">{society.registrationNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Date Created</label>
                <p className="text-gray-900 mt-1">{society.dateCreated}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Members and Contributions */}
      <Tabs defaultValue="members" className="space-y-6">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="contributions">Monthly Contributions</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <Card className="border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Society Members</CardTitle>
                  <CardDescription>Members registered in this society</CardDescription>
                </div>
                <Link to="/members">
                  <Button variant="outline">View All Members</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Member</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Member Number</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Join Date</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Total Savings</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Status</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentMembers.map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="py-4">
                          <div className="font-medium text-gray-900">{member.name}</div>
                        </td>
                        <td className="py-4 text-sm text-gray-600">{member.memberNumber}</td>
                        <td className="py-4 text-sm text-gray-600">{member.joinDate}</td>
                        <td className="py-4 text-sm font-medium text-gray-900">{member.savings}</td>
                        <td className="py-4">
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            Active
                          </Badge>
                        </td>
                        <td className="py-4">
                          <Link to={`/members/${member.id}`}>
                            <Button variant="ghost" size="sm">View</Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contributions" className="space-y-4">
          <Card className="border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Monthly Contributions</CardTitle>
                  <CardDescription>Historical contribution records</CardDescription>
                </div>
                <Link to="/contributions/new">
                  <Button className="bg-blue-600 hover:bg-blue-700">Enter New Data</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Period</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Total Collected</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Contributing Members</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Status</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {monthlyContributions.map((contribution, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-4 text-sm font-medium text-gray-900">{contribution.month}</td>
                        <td className="py-4 text-sm font-medium text-gray-900">{contribution.totalCollected}</td>
                        <td className="py-4 text-sm text-gray-600">{contribution.members}</td>
                        <td className="py-4">
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-600 mr-1.5" />
                            Finalized
                          </Badge>
                        </td>
                        <td className="py-4">
                          <Button variant="ghost" size="sm">View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loans" className="space-y-4">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Active Loans</CardTitle>
              <CardDescription>Current loan portfolio for this society</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Loan management features coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
