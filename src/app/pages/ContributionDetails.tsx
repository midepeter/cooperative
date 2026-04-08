import { Link, useParams } from "react-router";
import { ArrowLeft, Receipt, Building2, Calendar, Users, DollarSign, Download, FileCheck, Edit, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export default function ContributionDetails() {
  const { id } = useParams();

  // Mock data - in a real app, this would be fetched based on the ID
  const contribution = {
    id: id || "CONT-2026-089",
    society: "NITEL Staff Cooperative",
    societyId: 1,
    period: "March 2026",
    month: "March",
    year: "2026",
    members: 145,
    totalCollected: "₦1,825,000",
    totalExpected: "₦1,837,500",
    averagePerMember: "₦12,586",
    status: "finalized",
    finalizedDate: "Apr 5, 2026",
    finalizedBy: "Adaeze Okonkwo",
    createdDate: "Apr 1, 2026",
    createdBy: "Adaeze Okonkwo"
  };

  const paymentSummary = {
    paidInFull: 142,
    partialPayment: 2,
    unpaid: 1,
    collectionRate: 99.3
  };

  const memberDetails = [
    { id: 1, name: "Chioma Eze", memberNumber: "MEM-001", expected: 12500, actual: 12500, status: "paid" },
    { id: 2, name: "Oluwaseun Balogun", memberNumber: "MEM-002", expected: 15000, actual: 15000, status: "paid" },
    { id: 3, name: "Fatima Abubakar", memberNumber: "MEM-003", expected: 10000, actual: 10000, status: "paid" },
    { id: 4, name: "Emmanuel Okafor", memberNumber: "MEM-004", expected: 8500, actual: 8500, status: "paid" },
    { id: 5, name: "Blessing Adeleke", memberNumber: "MEM-005", expected: 12500, actual: 10000, status: "partial" },
    { id: 6, name: "Tunde Adebayo", memberNumber: "MEM-006", expected: 12500, actual: 0, status: "unpaid" },
    { id: 7, name: "Kemi Oladipo", memberNumber: "MEM-007", expected: 11000, actual: 11000, status: "paid" },
    { id: 8, name: "Ibrahim Yusuf", memberNumber: "MEM-008", expected: 13000, actual: 13000, status: "paid" },
  ];

  const categoryBreakdown = [
    { category: "Regular Savings", amount: "₦1,450,000", percentage: 79.5 },
    { category: "Share Capital", amount: "₦250,000", percentage: 13.7 },
    { category: "Development Levy", amount: "₦125,000", percentage: 6.8 }
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div>
        <Link to="/contributions">
          <Button variant="ghost" className="gap-2 -ml-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Contributions
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center">
            <Receipt className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-semibold text-gray-900">{contribution.id}</h1>
              {contribution.status === 'finalized' ? (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  <FileCheck className="w-3 h-3 mr-1.5" />
                  Finalized
                </Badge>
              ) : (
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                  <Receipt className="w-3 h-3 mr-1.5" />
                  Draft
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                {contribution.society}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {contribution.period}
              </div>
            </div>
            {contribution.status === 'finalized' && (
              <p className="text-sm text-gray-500 mt-2">
                Finalized on {contribution.finalizedDate} by {contribution.finalizedBy}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          {contribution.status === 'draft' && (
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Edit className="w-4 h-4" />
              Continue Editing
            </Button>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <CardDescription>Contributing Members</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">{contribution.members}</h3>
            <p className="text-sm text-gray-600 mt-2">Total members</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="w-4 h-4" />
              <CardDescription>Total Collected</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">{contribution.totalCollected}</h3>
            <p className="text-sm text-gray-600 mt-2">Expected: {contribution.totalExpected}</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-gray-600">
              <TrendingUp className="w-4 h-4" />
              <CardDescription>Collection Rate</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">{paymentSummary.collectionRate}%</h3>
            <p className="text-sm text-green-600 mt-2">Excellent performance</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="w-4 h-4" />
              <CardDescription>Average per Member</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">{contribution.averagePerMember}</h3>
            <p className="text-sm text-gray-600 mt-2">Monthly average</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Summary */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
            <CardDescription>Breakdown by payment status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
              <div>
                <p className="text-sm font-medium text-gray-900">Paid in Full</p>
                <p className="text-xs text-gray-600 mt-1">
                  {((paymentSummary.paidInFull / contribution.members) * 100).toFixed(1)}% of members
                </p>
              </div>
              <span className="text-2xl font-semibold text-green-700">{paymentSummary.paidInFull}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50">
              <div>
                <p className="text-sm font-medium text-gray-900">Partial Payment</p>
                <p className="text-xs text-gray-600 mt-1">
                  {((paymentSummary.partialPayment / contribution.members) * 100).toFixed(1)}% of members
                </p>
              </div>
              <span className="text-2xl font-semibold text-amber-700">{paymentSummary.partialPayment}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-red-50">
              <div>
                <p className="text-sm font-medium text-gray-900">Unpaid</p>
                <p className="text-xs text-gray-600 mt-1">
                  {((paymentSummary.unpaid / contribution.members) * 100).toFixed(1)}% of members
                </p>
              </div>
              <span className="text-2xl font-semibold text-red-700">{paymentSummary.unpaid}</span>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="border-gray-200 lg:col-span-2">
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>Contribution by financial category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryBreakdown.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{category.category}</span>
                    <span className="text-sm font-semibold text-gray-900">{category.amount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>{category.percentage}% of total</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Member-by-Member Details */}
      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Member-by-Member Details</CardTitle>
              <CardDescription>Individual contribution records</CardDescription>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export List
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Member</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Member Number</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Expected Amount</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Actual Amount</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Difference</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {memberDetails.map((member) => {
                  const difference = member.actual - member.expected;
                  return (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="py-4">
                        <div className="font-medium text-gray-900">{member.name}</div>
                      </td>
                      <td className="py-4 text-sm text-gray-600">{member.memberNumber}</td>
                      <td className="py-4 text-sm text-gray-900">₦{member.expected.toLocaleString()}</td>
                      <td className="py-4 text-sm font-medium text-gray-900">₦{member.actual.toLocaleString()}</td>
                      <td className="py-4">
                        <span className={`text-sm font-medium ${
                          difference === 0 ? 'text-gray-600' :
                          difference > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {difference === 0 ? '—' : 
                           difference > 0 ? `+₦${difference.toLocaleString()}` : 
                           `-₦${Math.abs(difference).toLocaleString()}`}
                        </span>
                      </td>
                      <td className="py-4">
                        {member.status === 'paid' && (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            Paid
                          </Badge>
                        )}
                        {member.status === 'partial' && (
                          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                            Partial
                          </Badge>
                        )}
                        {member.status === 'unpaid' && (
                          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                            Unpaid
                          </Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Entry Metadata */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Entry Information</CardTitle>
          <CardDescription>Record creation and modification details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-600">Created Date</label>
                <p className="text-gray-900 mt-1">{contribution.createdDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Created By</label>
                <p className="text-gray-900 mt-1">{contribution.createdBy}</p>
              </div>
            </div>
            {contribution.status === 'finalized' && (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Finalized Date</label>
                  <p className="text-gray-900 mt-1">{contribution.finalizedDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Finalized By</label>
                  <p className="text-gray-900 mt-1">{contribution.finalizedBy}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
