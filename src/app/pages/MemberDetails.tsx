import { Link, useParams } from "react-router";
import { ArrowLeft, User, Building2, Mail, Phone, Calendar, DollarSign, TrendingUp, Edit, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function MemberDetails() {
  const { id } = useParams();

  // Mock data - in a real app, this would be fetched based on the ID
  const member = {
    id: parseInt(id || "1"),
    name: "Chioma Eze",
    memberNumber: "MEM-001",
    society: "NITEL Staff Cooperative",
    societyId: 1,
    phone: "+234 803 123 4567",
    email: "chioma.eze@example.com",
    address: "12 Adeyemi Street, Ikeja, Lagos",
    joinDate: "Jan 15, 2020",
    totalSavings: "₦125,000",
    monthlyContribution: "₦12,500",
    activeLoans: 1,
    status: "active"
  };

  const savingsHistory = [
    { month: "March 2026", amount: "₦12,500", balance: "₦125,000", status: "paid" },
    { month: "February 2026", amount: "₦12,500", balance: "₦112,500", status: "paid" },
    { month: "January 2026", amount: "₦12,500", balance: "₦100,000", status: "paid" },
    { month: "December 2025", amount: "₦12,500", balance: "₦87,500", status: "paid" },
    { month: "November 2025", amount: "₦12,500", balance: "₦75,000", status: "paid" },
  ];

  const loanHistory = [
    {
      loanId: "LOAN-2025-045",
      amount: "₦50,000",
      disbursedDate: "Jan 10, 2026",
      term: "6 months",
      monthlyPayment: "₦9,167",
      amountPaid: "₦18,334",
      balance: "₦31,666",
      status: "active"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div>
        <Link to="/members">
          <Button variant="ghost" className="gap-2 -ml-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Members
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="bg-blue-600 text-white text-2xl">
              {member.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-semibold text-gray-900">{member.name}</h1>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                Active
              </Badge>
            </div>
            <p className="text-gray-600">{member.memberNumber}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
              <Building2 className="w-4 h-4" />
              {member.society}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Statement
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Edit className="w-4 h-4" />
            Edit Member
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="w-4 h-4" />
              <CardDescription>Total Savings</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">{member.totalSavings}</h3>
            <p className="text-sm text-green-600 mt-2">+10% this year</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <CardDescription>Monthly Contribution</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">{member.monthlyContribution}</h3>
            <p className="text-sm text-gray-600 mt-2">Regular payment</p>
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
            <h3 className="text-3xl font-semibold text-gray-900">{member.activeLoans}</h3>
            <p className="text-sm text-gray-600 mt-2">₦31,666 outstanding</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-4 h-4" />
              <CardDescription>Membership Duration</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">6 years</h3>
            <p className="text-sm text-gray-600 mt-2">Since {member.joinDate}</p>
          </CardContent>
        </Card>
      </div>

      {/* Member Information */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Member Information</CardTitle>
          <CardDescription>Personal and contact details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Full Name</label>
                <p className="text-gray-900 mt-1">{member.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Member Number</label>
                <p className="text-gray-900 mt-1">{member.memberNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Society</label>
                <p className="text-gray-900 mt-1">{member.society}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Join Date</label>
                <p className="text-gray-900 mt-1">{member.joinDate}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Phone Number</label>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{member.phone}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email Address</label>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-900">{member.email}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Address</label>
                <p className="text-gray-900 mt-1">{member.address}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <div className="mt-1">
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    Active Member
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for History */}
      <Tabs defaultValue="savings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="savings">Savings History</TabsTrigger>
          <TabsTrigger value="loans">Loan History</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="savings" className="space-y-4">
          <Card className="border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Savings History</CardTitle>
                  <CardDescription>Monthly contribution records</CardDescription>
                </div>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Period</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Amount Contributed</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Running Balance</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {savingsHistory.map((record, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-4 text-sm font-medium text-gray-900">{record.month}</td>
                        <td className="py-4 text-sm text-gray-900">{record.amount}</td>
                        <td className="py-4 text-sm font-medium text-gray-900">{record.balance}</td>
                        <td className="py-4">
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-600 mr-1.5" />
                            Paid
                          </Badge>
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
              <CardTitle>Loan History</CardTitle>
              <CardDescription>Active and past loans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loanHistory.map((loan, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{loan.loanId}</h4>
                        <p className="text-sm text-gray-600 mt-1">Disbursed on {loan.disbursedDate}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                        Active
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="text-xs text-gray-600">Loan Amount</label>
                        <p className="text-sm font-medium text-gray-900 mt-1">{loan.amount}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-600">Term</label>
                        <p className="text-sm font-medium text-gray-900 mt-1">{loan.term}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-600">Amount Paid</label>
                        <p className="text-sm font-medium text-green-600 mt-1">{loan.amountPaid}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-600">Outstanding</label>
                        <p className="text-sm font-medium text-red-600 mt-1">{loan.balance}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent member activities and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3 pb-4 border-b border-gray-200">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Monthly contribution paid</p>
                    <p className="text-sm text-gray-600 mt-1">Paid ₦12,500 for March 2026</p>
                    <p className="text-xs text-gray-500 mt-1">Apr 5, 2026 at 2:45 PM</p>
                  </div>
                </div>
                <div className="flex gap-3 pb-4 border-b border-gray-200">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Loan payment received</p>
                    <p className="text-sm text-gray-600 mt-1">Paid ₦9,167 towards LOAN-2025-045</p>
                    <p className="text-xs text-gray-500 mt-1">Mar 28, 2026 at 11:20 AM</p>
                  </div>
                </div>
                <div className="flex gap-3 pb-4 border-b border-gray-200">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Monthly contribution paid</p>
                    <p className="text-sm text-gray-600 mt-1">Paid ₦12,500 for February 2026</p>
                    <p className="text-xs text-gray-500 mt-1">Feb 10, 2026 at 9:15 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
