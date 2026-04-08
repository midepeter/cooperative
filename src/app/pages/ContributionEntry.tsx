import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Upload, Download, Save, Check, AlertCircle, Users, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Alert, AlertDescription } from "../components/ui/alert";

// Mock data
const societies = [
  { id: 1, name: "NITEL Staff Cooperative", members: 145 },
  { id: 2, name: "Federal Ministry Workers Thrift", members: 128 },
  { id: 3, name: "Teachers Cooperative Society", members: 69 }
];

const mockMembers = [
  { id: 1, name: "Chioma Eze", memberNumber: "MEM-001", monthlyContribution: 12500 },
  { id: 2, name: "Oluwaseun Balogun", memberNumber: "MEM-002", monthlyContribution: 15000 },
  { id: 3, name: "Fatima Abubakar", memberNumber: "MEM-003", monthlyContribution: 10000 },
  { id: 4, name: "Emmanuel Okafor", memberNumber: "MEM-004", monthlyContribution: 8500 },
  { id: 5, name: "Blessing Adeleke", memberNumber: "MEM-005", monthlyContribution: 12500 },
];

type MemberContribution = {
  memberId: number;
  memberName: string;
  memberNumber: string;
  expectedAmount: number;
  actualAmount: number;
  status: 'paid' | 'partial' | 'unpaid';
};

export default function ContributionEntry() {
  const navigate = useNavigate();
  const [selectedSociety, setSelectedSociety] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [memberContributions, setMemberContributions] = useState<MemberContribution[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = ["2024", "2025", "2026", "2027"];

  const handleSocietyChange = (societyId: string) => {
    setSelectedSociety(societyId);
    // Load members for selected society
    const contributions: MemberContribution[] = mockMembers.map(member => ({
      memberId: member.id,
      memberName: member.name,
      memberNumber: member.memberNumber,
      expectedAmount: member.monthlyContribution,
      actualAmount: member.monthlyContribution,
      status: 'paid' as const
    }));
    setMemberContributions(contributions);
  };

  const handleAmountChange = (memberId: number, value: string) => {
    const amount = parseFloat(value) || 0;
    setMemberContributions(prev =>
      prev.map(mc => {
        if (mc.memberId === memberId) {
          let status: 'paid' | 'partial' | 'unpaid' = 'unpaid';
          if (amount >= mc.expectedAmount) status = 'paid';
          else if (amount > 0) status = 'partial';
          
          return { ...mc, actualAmount: amount, status };
        }
        return mc;
      })
    );
  };

  const handleMarkAllPaid = () => {
    setMemberContributions(prev =>
      prev.map(mc => ({
        ...mc,
        actualAmount: mc.expectedAmount,
        status: 'paid' as const
      }))
    );
  };

  const totalExpected = memberContributions.reduce((sum, mc) => sum + mc.expectedAmount, 0);
  const totalCollected = memberContributions.reduce((sum, mc) => sum + mc.actualAmount, 0);
  const paidCount = memberContributions.filter(mc => mc.status === 'paid').length;
  const partialCount = memberContributions.filter(mc => mc.status === 'partial').length;
  const unpaidCount = memberContributions.filter(mc => mc.status === 'unpaid').length;

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Draft saved successfully!');
    }, 1000);
  };

  const handleFinalize = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Contribution entry finalized!');
      navigate('/contributions');
    }, 1000);
  };

  const canFinalize = selectedSociety && selectedMonth && selectedYear && memberContributions.length > 0;

  return (
    <div className="space-y-6 max-w-7xl">
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
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Enter Monthly Contributions</h1>
          <p className="text-gray-600 mt-2">Record member contributions for the selected period</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Import CSV
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download Template
          </Button>
        </div>
      </div>

      {/* Period Selection */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Select Period & Society</CardTitle>
          <CardDescription>Choose the society and month for this contribution entry</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="society">Society</Label>
              <Select value={selectedSociety} onValueChange={handleSocietyChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select society" />
                </SelectTrigger>
                <SelectContent>
                  {societies.map(society => (
                    <SelectItem key={society.id} value={society.id.toString()}>
                      {society.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="month">Month</Label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map(month => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      {memberContributions.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-600">Total Members</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-3xl font-semibold text-gray-900">{memberContributions.length}</h3>
                <p className="text-sm text-gray-600 mt-2">Contributing members</p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-600">Total Expected</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-3xl font-semibold text-gray-900">
                  ₦{totalExpected.toLocaleString()}
                </h3>
                <p className="text-sm text-gray-600 mt-2">Expected collection</p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-600">Total Collected</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-3xl font-semibold text-gray-900">
                  ₦{totalCollected.toLocaleString()}
                </h3>
                <p className="text-sm text-green-600 mt-2">
                  {((totalCollected / totalExpected) * 100).toFixed(1)}% collection rate
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <CardDescription className="text-gray-600">Payment Status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Paid:</span>
                    <span className="font-medium">{paidCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-amber-600">Partial:</span>
                    <span className="font-medium">{partialCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-600">Unpaid:</span>
                    <span className="font-medium">{unpaidCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Member Contributions Table */}
          <Card className="border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Member Contributions</CardTitle>
                  <CardDescription>Enter actual amounts collected from each member</CardDescription>
                </div>
                <Button variant="outline" onClick={handleMarkAllPaid} className="gap-2">
                  <Check className="w-4 h-4" />
                  Mark All as Paid
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3 pr-4">Member</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3 pr-4">Member Number</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3 pr-4">Expected Amount</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3 pr-4">Actual Amount</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3 pr-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {memberContributions.map((mc) => (
                      <tr key={mc.memberId} className="hover:bg-gray-50">
                        <td className="py-4 pr-4">
                          <div className="font-medium text-gray-900">{mc.memberName}</div>
                        </td>
                        <td className="py-4 pr-4 text-sm text-gray-600">{mc.memberNumber}</td>
                        <td className="py-4 pr-4 text-sm text-gray-900">
                          ₦{mc.expectedAmount.toLocaleString()}
                        </td>
                        <td className="py-4 pr-4">
                          <Input
                            type="number"
                            value={mc.actualAmount}
                            onChange={(e) => handleAmountChange(mc.memberId, e.target.value)}
                            className="w-40"
                            placeholder="Enter amount"
                          />
                        </td>
                        <td className="py-4 pr-4">
                          {mc.status === 'paid' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Check className="w-3 h-3 mr-1" />
                              Paid
                            </span>
                          )}
                          {mc.status === 'partial' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Partial
                            </span>
                          )}
                          {mc.status === 'unpaid' && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Unpaid
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Warning for incomplete payments */}
          {(partialCount > 0 || unpaidCount > 0) && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                There are {partialCount + unpaidCount} member(s) with incomplete or missing payments. 
                You can still save as draft and finalize later.
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pb-8">
            <Link to="/contributions">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={handleSaveDraft}
              disabled={!canFinalize || isSaving}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              Save as Draft
            </Button>
            <Button 
              className="gap-2 bg-blue-600 hover:bg-blue-700"
              onClick={handleFinalize}
              disabled={!canFinalize || isSaving}
            >
              <Check className="w-4 h-4" />
              Finalize Entry
            </Button>
          </div>
        </>
      )}

      {/* Empty State */}
      {memberContributions.length === 0 && (
        <Card className="border-gray-200">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a society to begin</h3>
            <p className="text-sm text-gray-600 text-center max-w-sm">
              Choose a society and period above to load members and start entering contribution data
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
