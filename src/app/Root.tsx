import { Outlet, Link, useLocation } from "react-router";
import { Search, Building2, Users, Receipt, PieChart, FileText, Settings, DollarSign } from "lucide-react";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";
import { Avatar, AvatarFallback } from "./components/ui/avatar";

export default function Root() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-20">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xl font-semibold">C</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">COOPERIFY</h1>
              <p className="text-xs text-gray-500">Cooperative Management</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mb-3">
            Main Menu
          </div>
          
          <Link 
            to="/" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
              isActive("/") && location.pathname === "/" 
                ? "bg-blue-50 text-blue-700" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <PieChart className="w-5 h-5" />
            <span className={isActive("/") && location.pathname === "/" ? "font-medium" : ""}>Dashboard</span>
            {isActive("/") && location.pathname === "/" && (
              <Badge className="ml-auto bg-blue-600 text-white text-xs">3</Badge>
            )}
          </Link>
          
          <Link 
            to="/societies" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
              isActive("/societies") 
                ? "bg-blue-50 text-blue-700" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span className={isActive("/societies") ? "font-medium" : ""}>Societies</span>
          </Link>
          
          <Link 
            to="/members" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
              isActive("/members") 
                ? "bg-blue-50 text-blue-700" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Users className="w-5 h-5" />
            <span className={isActive("/members") ? "font-medium" : ""}>Members</span>
          </Link>
          
          <Link 
            to="/contributions" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
              isActive("/contributions") 
                ? "bg-blue-50 text-blue-700" 
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Receipt className="w-5 h-5" />
            <span className={isActive("/contributions") ? "font-medium" : ""}>Contributions</span>
          </Link>
          
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider px-3 mt-6 mb-3">
            Finance
          </div>
          
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100">
            <DollarSign className="w-5 h-5" />
            <span>Loans</span>
          </a>
          
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100">
            <FileText className="w-5 h-5" />
            <span>Reports</span>
          </a>
          
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </a>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Avatar className="w-9 h-9">
              <AvatarFallback className="bg-blue-600 text-white">AO</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Adaeze Okonkwo</p>
              <p className="text-xs text-gray-500 truncate">Cooperator Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {location.pathname === "/" && "Dashboard"}
                  {location.pathname.startsWith("/societies") && "Societies"}
                  {location.pathname.startsWith("/members") && "Members"}
                  {location.pathname.startsWith("/contributions") && "Contributions"}
                </h2>
                <p className="text-sm text-gray-600 mt-0.5">
                  {location.pathname === "/" && "Real-time financial overview"}
                  {location.pathname === "/societies" && "Manage cooperative societies"}
                  {location.pathname === "/members" && "Manage society members"}
                  {location.pathname === "/contributions" && "Track monthly contributions"}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input 
                    placeholder="Search societies, members..." 
                    className="pl-9 w-80 bg-gray-50 border-gray-200"
                  />
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Federal Cooperative Union</p>
                  <p className="text-xs text-gray-500">Organization Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
