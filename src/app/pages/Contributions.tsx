import { useState } from "react";
import { Link } from "react-router";
import { Receipt, Plus, Search, Filter, Calendar, Download, Eye, Trash2, FileCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

// Mock data
const mockContributions = [
  {
    id: "CONT-2026-089",
    society: "NITEL Staff Cooperative",
    societyId: 1,
    period: "March 2026",
    month: "March",
    year: "2026",
    members: 145,
    totalCollected: "₦1,825,000",
    averagePerMember: "₦12,586",
    status: "finalized",
    finalizedDate: "Apr 5, 2026",
    finalizedBy: "Adaeze Okonkwo"
  },
  {
    id: "CONT-2026-088",
    society: "Federal Ministry Workers Thrift",
    societyId: 2,
    period: "March 2026",
    month: "March",
    year: "2026",
    members: 128,
    totalCollected: "₦1,560,000",
    averagePerMember: "₦12,188",
    status: "finalized",
    finalizedDate: "Apr 4, 2026",
    finalizedBy: "Adaeze Okonkwo"
  },
  {
    id: "CONT-2026-087",
    society: "Teachers Cooperative Society",
    societyId: 3,
    period: "March 2026",
    month: "March",
    year: "2026",
    members: 69,
    totalCollected: "₦892,500",
    averagePerMember: "₦12,935",
    status: "draft",
    finalizedDate: null,
    finalizedBy: null
  },
  {
    id: "CONT-2026-086",
    society: "NITEL Staff Cooperative",
    societyId: 1,
    period: "February 2026",
    month: "February",
    year: "2026",
    members: 143,
    totalCollected: "₦1,798,000",
    averagePerMember: "₦12,573",
    status: "finalized",
    finalizedDate: "Mar 5, 2026",
    finalizedBy: "Adaeze Okonkwo"
  },
  {
    id: "CONT-2026-085",
    society: "Federal Ministry Workers Thrift",
    societyId: 2,
    period: "February 2026",
    month: "February",
    year: "2026",
    members: 125,
    totalCollected: "₦1,523,000",
    averagePerMember: "₦12,184",
    status: "finalized",
    finalizedDate: "Mar 3, 2026",
    finalizedBy: "Adaeze Okonkwo"
  }
];

const societies = [
  { id: 1, name: "NITEL Staff Cooperative" },
  { id: 2, name: "Federal Ministry Workers Thrift" },
  { id: 3, name: "Teachers Cooperative Society" }
];

export default function Contributions() {
  const [contributions] = useState(mockContributions);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSociety, setFilterSociety] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredContributions = contributions.filter(contribution => {
    const matchesSearch = contribution.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contribution.society.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contribution.period.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSociety = filterSociety === "all" || contribution.societyId.toString() === filterSociety;
    const matchesStatus = filterStatus === "all" || contribution.status === filterStatus;
    return matchesSearch && matchesSociety && matchesStatus;
  });

  const totalCollected = contributions
    .filter(c => c.status === 'finalized')
    .reduce((acc, c) => {
      const amount = parseFloat(c.totalCollected.replace(/[₦,]/g, ''));
      return acc + amount;
    }, 0);

  const draftCount = contributions.filter(c => c.status === 'draft').length;
  const finalizedCount = contributions.filter(c => c.status === 'finalized').length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardDescription className="text-gray-600">Total Entries</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">{contributions.length}</h3>
            <p className="text-sm text-gray-600 mt-2">All time records</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardDescription className="text-gray-600">Total Collected</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">₦{(totalCollected / 1000000).toFixed(2)}M</h3>
            <p className="text-sm text-gray-600 mt-2">From finalized entries</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardDescription className="text-gray-600">Finalized Entries</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">{finalizedCount}</h3>
            <p className="text-sm text-green-600 mt-2">Completed records</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardDescription className="text-gray-600">Draft Entries</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">{draftCount}</h3>
            <p className="text-sm text-amber-600 mt-2">Pending finalization</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center gap-3">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by ID, society, or period..."
                className="pl-9 bg-white border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Select value={filterSociety} onValueChange={setFilterSociety}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Societies" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Societies</SelectItem>
              {societies.map(society => (
                <SelectItem key={society.id} value={society.id.toString()}>
                  {society.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="finalized">Finalized</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>

          <Link to="/contributions/new">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4" />
              Enter Monthly Data
            </Button>
          </Link>
        </div>
      </div>

      {/* Contributions Table */}
      <Card className="border-gray-200">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Entry ID</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Society</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Period</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Members</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Total Collected</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Avg/Member</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredContributions.map((contribution) => (
                  <tr key={contribution.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Receipt className="w-4 h-4 text-gray-400" />
                        <div className="font-medium text-gray-900">{contribution.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{contribution.society}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{contribution.period}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {contribution.members}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {contribution.totalCollected}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {contribution.averagePerMember}
                    </td>
                    <td className="px-6 py-4">
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
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link to={`/contributions/${contribution.id}`}>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                        </Link>
                        {contribution.status === 'draft' && (
                          <Button variant="ghost" size="sm" className="gap-1 text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {filteredContributions.length === 0 && (
        <Card className="border-gray-200">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Receipt className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contributions found</h3>
            <p className="text-sm text-gray-600 text-center max-w-sm mb-4">
              {searchQuery || filterSociety !== "all" || filterStatus !== "all" 
                ? "Try adjusting your filters" 
                : "Get started by entering monthly contribution data"}
            </p>
            <Link to="/contributions/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Enter Monthly Data
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
