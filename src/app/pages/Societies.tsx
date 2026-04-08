import { useState } from "react";
import { Link } from "react-router";
import { Building2, Users, DollarSign, Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";

// Mock data
const mockSocieties = [
  {
    id: 1,
    name: "PAN Poultry Association of Nigeria",
    registrationNumber: "RC-001-2020",
    members: 145,
    totalSavings: "₦8,450,000",
    activeLoans: 23,
    status: "active",
    dateCreated: "Jan 15, 2020",
    address: "Plot 32, Ahmadu Bello Way, Victoria Island, Lagos",
    contactPerson: "Mrs. Ngozi Adeniyi",
    phone: "+234 803 456 7890"
  },
  {
    id: 2,
    name: "Joint Heirs Cooperative Society",
    registrationNumber: "RC-002-2021",
    members: 128,
    totalSavings: "₦6,230,000",
    activeLoans: 18,
    status: "active",
    dateCreated: "Mar 22, 2021",
    address: "Federal Secretariat Complex, Abuja",
    contactPerson: "Mr. Chukwuma Okafor",
    phone: "+234 805 123 4567"
  },
  {
    id: 3,
    name: "Teachers Cooperative Society",
    registrationNumber: "RC-003-2019",
    members: 69,
    totalSavings: "₦3,890,000",
    activeLoans: 12,
    status: "active",
    dateCreated: "Sep 10, 2019",
    address: "Education District, GRA Phase 2, Port Harcourt",
    contactPerson: "Dr. Amina Bello",
    phone: "+234 807 890 1234"
  }
];

export default function Societies() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [societies, setSocieties] = useState(mockSocieties);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    registrationNumber: "",
    contactPerson: "",
    phone: "",
    address: ""
  });

  const handleCreateSociety = () => {
    const newSociety = {
      id: societies.length + 1,
      ...formData,
      members: 0,
      totalSavings: "₦0",
      activeLoans: 0,
      status: "active" as const,
      dateCreated: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    };
    
    setSocieties([...societies, newSociety]);
    setIsCreateDialogOpen(false);
    setFormData({
      name: "",
      registrationNumber: "",
      contactPerson: "",
      phone: "",
      address: ""
    });
  };

  const filteredSocieties = societies.filter(society =>
    society.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    society.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardDescription className="text-gray-600">Total Societies</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">{societies.length}</h3>
            <p className="text-sm text-gray-600 mt-2">Active cooperatives</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardDescription className="text-gray-600">Total Members</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">
              {societies.reduce((acc, s) => acc + s.members, 0)}
            </h3>
            <p className="text-sm text-gray-600 mt-2">Across all societies</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardDescription className="text-gray-600">Total Savings</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">₦18.57M</h3>
            <p className="text-sm text-gray-600 mt-2">Combined savings</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardDescription className="text-gray-600">Active Loans</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-semibold text-gray-900">
              {societies.reduce((acc, s) => acc + s.activeLoans, 0)}
            </h3>
            <p className="text-sm text-gray-600 mt-2">Total loan portfolio</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search societies by name or registration number..."
              className="pl-9 bg-white border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                Create Society
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Society</DialogTitle>
                <DialogDescription>
                  Set up a new cooperative society. Fill in the details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Society Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., NITEL Staff Cooperative"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="regNumber">Registration Number</Label>
                  <Input
                    id="regNumber"
                    placeholder="e.g., RC-004-2026"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="contact">Contact Person</Label>
                    <Input
                      id="contact"
                      placeholder="Full name"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+234 XXX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="Society address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateSociety}>
                  Create Society
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Societies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSocieties.map((society) => (
          <Card key={society.id} className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{society.name}</CardTitle>
                    <CardDescription className="mt-1">{society.registrationNumber}</CardDescription>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={`/societies/${society.id}`} className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      Edit Society
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-200">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Users className="w-4 h-4" />
                      Members
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{society.members}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <DollarSign className="w-4 h-4" />
                      Savings
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{society.totalSavings}</p>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Loans</div>
                    <p className="text-lg font-semibold text-gray-900">{society.activeLoans}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600 min-w-[100px]">Contact:</span>
                    <span className="text-gray-900 font-medium">{society.contactPerson}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600 min-w-[100px]">Phone:</span>
                    <span className="text-gray-900">{society.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600 min-w-[100px]">Created:</span>
                    <span className="text-gray-900">{society.dateCreated}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <Link to={`/societies/${society.id}`}>
                    <Button variant="outline" className="w-full">
                      View Society Details
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSocieties.length === 0 && (
        <Card className="border-gray-200">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No societies found</h3>
            <p className="text-sm text-gray-600 text-center max-w-sm">
              {searchQuery ? "Try adjusting your search query" : "Get started by creating your first cooperative society"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
