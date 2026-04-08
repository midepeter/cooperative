import { Link } from "react-router";
import { Building2, Users, Receipt, ArrowUpRight, ArrowDownRight, TrendingUp, Calendar, DollarSign, UserPlus, FileSpreadsheet, ChevronRight, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

// Mock data for the dashboard
const stats = [
  {
    title: "Total Collected (This Month)",
    value: "₦4,750,000",
    change: "+23.5%",
    isPositive: true,
    description: "From 3 societies"
  },
  {
    title: "Outstanding Loans",
    value: "₦12,450,000",
    change: "-5.2%",
    isPositive: true,
    description: "67 active loans"
  },
  {
    title: "Active Societies",
    value: "3",
    description: "Managing 3 cooperatives"
  },
  {
    title: "Total Members",
    value: "342",
    change: "+12",
    isPositive: true,
    description: "Across all societies"
  }
];

const societies = [
  {
    id: 1,
    name: "NITEL Staff Cooperative",
    members: 145,
    savings: "₦8,450,000",
    loans: 23,
    status: "active"
  },
  {
    id: 2,
    name: "Federal Ministry Workers Thrift",
    members: 128,
    savings: "₦6,230,000",
    loans: 18,
    status: "active"
  },
  {
    id: 3,
    name: "Teachers Cooperative Society",
    members: 69,
    savings: "₦3,890,000",
    loans: 12,
    status: "active"
  }
];

const recentContributions = [
  {
    id: "CONT-2025-089",
    society: "NITEL Staff Cooperative",
    month: "March 2026",
    members: 145,
    totalCollected: "₦1,825,000",
    status: "finalized",
    date: "Apr 5, 2026"
  },
  {
    id: "CONT-2025-088",
    society: "Federal Ministry Workers Thrift",
    month: "March 2026",
    members: 128,
    totalCollected: "₦1,560,000",
    status: "finalized",
    date: "Apr 4, 2026"
  },
  {
    id: "CONT-2025-087",
    society: "Teachers Cooperative Society",
    month: "March 2026",
    members: 69,
    totalCollected: "₦892,500",
    status: "draft",
    date: "Apr 3, 2026"
  }
];

const activities = [
  {
    user: "Adaeze Okonkwo",
    action: "Finalized monthly contributions",
    society: "NITEL Staff Cooperative",
    time: "2 hours ago"
  },
  {
    user: "Adaeze Okonkwo",
    action: "Added 3 new members",
    society: "Federal Ministry Workers Thrift",
    time: "5 hours ago"
  },
  {
    user: "System",
    action: "Generated annual report",
    society: "Teachers Cooperative Society",
    time: "1 day ago"
  }
];

export default function Dashboard() {
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="border-gray-200">
            <CardHeader className="pb-3">
              <CardDescription className="text-gray-600">{stat.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <h3 className="text-3xl font-semibold text-gray-900">{stat.value}</h3>
                {stat.change && (
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.isPositive ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-2">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Create New Society */}
        <Card className="border-gray-200 bg-gradient-to-br from-blue-600 to-blue-700 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12" />
          <CardHeader className="relative">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <CardTitle className="text-white">Create New Society</CardTitle>
            <CardDescription className="text-blue-100">
              Set up a new cooperative
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <Link to="/societies">
              <Button variant="secondary" className="w-full bg-white text-blue-700 hover:bg-blue-50">
                Get Started
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Enter Monthly Data */}
        <Card className="border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
              <Receipt className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle>Enter Monthly Data</CardTitle>
            <CardDescription>
              Record member contributions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/contributions/new">
              <Button variant="outline" className="w-full border-blue-600 text-blue-700 hover:bg-blue-50">
                Start Entry
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Generate Report */}
        <Card className="border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mb-4">
              <FileSpreadsheet className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle>Generate Report</CardTitle>
            <CardDescription>
              Export financial statements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              View Reports
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Societies */}
        <div className="lg:col-span-2">
          <Card className="border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Societies</CardTitle>
                  <CardDescription>Cooperative societies you manage</CardDescription>
                </div>
                <Link to="/societies">
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {societies.map((society) => (
                  <Link key={society.id} to={`/societies/${society.id}`}>
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{society.name}</h4>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              <Users className="w-3.5 h-3.5" />
                              {society.members} members
                            </span>
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              <DollarSign className="w-3.5 h-3.5" />
                              {society.savings}
                            </span>
                            <span className="text-sm text-gray-600">
                              {society.loans} active loans
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        Active
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Contributions */}
          <Card className="border-gray-200 mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Contributions</CardTitle>
                  <CardDescription>Latest monthly data entries</CardDescription>
                </div>
                <Link to="/contributions">
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Entry ID</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Society</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Period</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Amount</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Status</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentContributions.map((entry) => (
                      <tr key={entry.id} className="hover:bg-gray-50">
                        <td className="py-4">
                          <div className="font-medium text-gray-900">{entry.id}</div>
                        </td>
                        <td className="py-4">
                          <div className="text-sm text-gray-900">{entry.society}</div>
                          <div className="text-xs text-gray-500">{entry.members} members</div>
                        </td>
                        <td className="py-4 text-sm text-gray-900">{entry.month}</td>
                        <td className="py-4 text-sm font-medium text-gray-900">{entry.totalCollected}</td>
                        <td className="py-4">
                          {entry.status === 'finalized' ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-600 mr-1.5" />
                              Finalized
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mr-1.5" />
                              Draft
                            </Badge>
                          )}
                        </td>
                        <td className="py-4 text-sm text-gray-600">{entry.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <div>
          <Card className="border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Activity</CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-600 text-sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activities.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        {activity.user === 'System' ? (
                          <Settings className="w-4 h-4 text-blue-600" />
                        ) : (
                          <span className="text-xs font-medium text-blue-600">
                            {activity.user.split(' ').map(n => n[0]).join('')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-0.5">{activity.action}</p>
                      <p className="text-xs text-blue-600 mt-1">{activity.society}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-gray-200 mt-6">
            <CardHeader>
              <CardTitle>This Month</CardTitle>
              <CardDescription>Key performance metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Collection Rate</p>
                    <p className="text-xs text-gray-600">Payment compliance</p>
                  </div>
                </div>
                <span className="text-lg font-semibold text-gray-900">94.5%</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New Members</p>
                    <p className="text-xs text-gray-600">This month</p>
                  </div>
                </div>
                <span className="text-lg font-semibold text-gray-900">12</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Entries Pending</p>
                    <p className="text-xs text-gray-600">Data to finalize</p>
                  </div>
                </div>
                <span className="text-lg font-semibold text-gray-900">1</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
