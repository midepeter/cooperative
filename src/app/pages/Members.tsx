import { useState } from "react";
import { Link } from "react-router";
import { Users, Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, Mail, Phone, Building2, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

// Mock data
const mockMembers = [
  {
    id: 1,
    name: "Chioma Eze",
    memberNumber: "MEM-001",
    society: "NITEL Staff Cooperative",
    societyId: 1,
    phone: "+234 803 123 4567",
    email: "chioma.eze@example.com",
    joinDate: "Jan 15, 2020",
    totalSavings: "₦125,000",
    monthlyContribution: "₦12,500",
    activeLoans: 1,
    status: "active"
  },
  {
    id: 2,
    name: "Oluwaseun Balogun",
    memberNumber: "MEM-002",
    society: "NITEL Staff Cooperative",
    societyId: 1,
    phone: "+234 805 234 5678",
    email: "seun.balogun@example.com",
    joinDate: "Feb 20, 2020",
    totalSavings: "₦98,500",
    monthlyContribution: "₦15,000",
    activeLoans: 0,
    status: "active"
  },
  {
    id: 3,
    name: "Fatima Abubakar",
    memberNumber: "MEM-003",
    society: "Federal Ministry Workers Thrift",
    societyId: 2,
    phone: "+234 807 345 6789",
    email: "fatima.a@example.com",
    joinDate: "Mar 10, 2021",
    totalSavings: "₦156,000",
    monthlyContribution: "₦10,000",
    activeLoans: 2,
    status: "active"
  },
  {
    id: 4,
    name: "Emmanuel Okafor",
    memberNumber: "MEM-004",
    society: "Teachers Cooperative Society",
    societyId: 3,
    phone: "+234 809 456 7890",
    email: "emmanuel.ok@example.com",
    joinDate: "Apr 5, 2019",
    totalSavings: "₦189,000",
    monthlyContribution: "₦8,500",
    activeLoans: 1,
    status: "active"
  },
  {
    id: 5,
    name: "Blessing Adeleke",
    memberNumber: "MEM-005",
    society: "NITEL Staff Cooperative",
    societyId: 1,
    phone: "+234 810 567 8901",
    email: "blessing.a@example.com",
    joinDate: "May 12, 2020",
    totalSavings: "₦78,000",
    monthlyContribution: "₦12,500",
    activeLoans: 0,
    status: "active"
  }
];

const societies = [
  { id: 1, name: "NITEL Staff Cooperative" },
  { id: 2, name: "Federal Ministry Workers Thrift" },
  { id: 3, name: "Teachers Cooperative Society" }
];

export default function Members() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [members, setMembers] = useState(mockMembers);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSociety, setFilterSociety] = useState<string>("all");
  const [formData, setFormData] = useState({
    name: "",
    memberNumber: "",
    societyId: "",
    phone: "",
    email: "",
    monthlyContribution: ""
  });

  const handleCreateMember = () => {
    const society = societies.find(s => s.id.toString() === formData.societyId);
    const newMember = {
      id: members.length + 1,
      ...formData,
      societyId: parseInt(formData.societyId),
      society: society?.name || "",
      joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      totalSavings: "₦0",
      activeLoans: 0,
      status: "active" as const
    };
    
    setMembers([...members, newMember]);
    setIsCreateDialogOpen(false);
    setFormData({
      name: "",
      memberNumber: "",
      societyId: "",
      phone: "",
      email: "",
      monthlyContribution: ""
    });
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.memberNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSociety = filterSociety === "all" || member.societyId.toString() === filterSociety;
    return matchesSearch && matchesSociety;
  });

  const totalSavings = members.reduce((acc, m) => {
    const amount = parseFloat(m.totalSavings.replace(/[₦,]/g, ''));
    return acc + amount;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardDescription className="text-gray-600">Total Members</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">{members.length}</h3>
            <p className="text-sm text-gray-600 mt-2">Across all societies</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardDescription className="text-gray-600">Active Members</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">
              {members.filter(m => m.status === 'active').length}
            </h3>
            <p className="text-sm text-green-600 mt-2">100% active</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardDescription className="text-gray-600">Total Savings</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">₦{(totalSavings / 1000).toFixed(0)}K</h3>
            <p className="text-sm text-gray-600 mt-2">Combined member savings</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardDescription className="text-gray-600">New This Month</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">12</h3>
            <p className="text-sm text-gray-600 mt-2">Member registrations</p>
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
                placeholder="Search by name, member number, or email..."
                className="pl-9 bg-white border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Select value={filterSociety} onValueChange={setFilterSociety}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Filter by society" />
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
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Member</DialogTitle>
                <DialogDescription>
                  Register a new member to a cooperative society.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Member's full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="memberNumber">Member Number</Label>
                    <Input
                      id="memberNumber"
                      placeholder="e.g., MEM-006"
                      value={formData.memberNumber}
                      onChange={(e) => setFormData({ ...formData, memberNumber: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="society">Society</Label>
                  <Select value={formData.societyId} onValueChange={(value) => setFormData({ ...formData, societyId: value })}>
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+234 XXX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contribution">Monthly Contribution</Label>
                  <Input
                    id="contribution"
                    placeholder="e.g., ₦10,000"
                    value={formData.monthlyContribution}
                    onChange={(e) => setFormData({ ...formData, monthlyContribution: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateMember}>
                  Add Member
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Members Table */}
      <Card className="border-gray-200">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Member</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Society</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Contact</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Total Savings</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Monthly</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Loans</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.memberNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        {member.society}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-3.5 h-3.5" />
                          {member.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-3.5 h-3.5" />
                          {member.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {member.totalSavings}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {member.monthlyContribution}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {member.activeLoans > 0 ? (
                        <span className="text-blue-600">{member.activeLoans} active</span>
                      ) : (
                        <span className="text-gray-500">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        Active
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/members/${member.id}`} className="flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Edit className="w-4 h-4" />
                            Edit Member
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {filteredMembers.length === 0 && (
        <Card className="border-gray-200">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
            <p className="text-sm text-gray-600 text-center max-w-sm">
              {searchQuery || filterSociety !== "all" ? "Try adjusting your filters" : "Get started by adding your first member"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
