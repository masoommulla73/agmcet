"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  LogOut, 
  MessageSquare, 
  GraduationCap, 
  Settings, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Clock, 
  X,
  Menu,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

type Submission = {
  _id: string;
  type: "contact" | "admission";
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message?: string;
  course?: string;
  city?: string;
  education?: string;
  status: "pending" | "resolved";
  createdAt: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAdminAuth();
  
  const [activeTab, setActiveTab] = useState<"contact" | "admission" | "settings">("contact");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Settings form
  const [newUsername, setNewUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [settingsMsg, setSettingsMsg] = useState({ text: "", isError: false });

  // Custom Leave Confirmation state
  const [showLeavePrompt, setShowLeavePrompt] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState<string | null>(null);

  // Fetch submissions
  const fetchSubmissions = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("admin_token");
      const res = await fetch("/api/admin/forms", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setSubmissions(data.data);
      } else if (res.status === 401) {
        logout();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [isAuthenticated, fetchSubmissions]);

  // Handle browser back/forward and refresh
  useEffect(() => {
    if (!isAuthenticated) return;

    const handlePopState = (e: PopStateEvent) => {
      // Prevent immediate navigation
      window.history.pushState(null, "", window.location.href);
      setShowLeavePrompt(true);
    };

    // Push an initial state so popstate can catch the back button
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isAuthenticated]);

  const confirmLeave = () => {
    sessionStorage.removeItem("admin_token");
    window.location.href = "/admin/login";
  };

  const cancelLeave = () => {
    setShowLeavePrompt(false);
  };

  const updateStatus = async (id: string, newStatus: "pending" | "resolved") => {
    try {
      const token = sessionStorage.getItem("admin_token");
      await fetch("/api/admin/forms", {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ id, status: newStatus })
      });
      fetchSubmissions();
      if (selectedSubmission?._id === id) {
        setSelectedSubmission(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = async () => {
    if (!submissionToDelete) return;
    const id = submissionToDelete;
    try {
      const token = sessionStorage.getItem("admin_token");
      await fetch(`/api/admin/forms?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSubmissions();
      if (selectedSubmission?._id === id) {
        setSelectedSubmission(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmissionToDelete(null);
    }
  };

  const deleteSubmission = (id: string) => {
    setSubmissionToDelete(id);
  };

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsMsg({ text: "Updating...", isError: false });
    try {
      const token = sessionStorage.getItem("admin_token");
      const res = await fetch("/api/admin/credentials", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ currentPassword, newUsername, newPassword })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSettingsMsg({ text: "Credentials updated successfully!", isError: false });
        setCurrentPassword("");
        setNewPassword("");
      } else {
        setSettingsMsg({ text: data.message || "Failed to update", isError: true });
      }
    } catch (err) {
      setSettingsMsg({ text: "Network error", isError: true });
    }
  };

  if (isAuthenticated === null) return null; // Initial load

  const filteredSubmissions = submissions.filter(s => s.type === activeTab);

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      
      {/* Leave Prompt Modal */}
      {showLeavePrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a192f]/80 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 transform transition-all">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mx-auto mb-6">
              <LogOut className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-center text-[#0a192f] mb-2 font-serif">Leave Dashboard?</h3>
            <p className="text-center text-slate-500 mb-8">
              Are you sure you want to leave? Your session will be terminated and you will need to log in again.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={cancelLeave}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors"
              >
                Stay Here
              </button>
              <button 
                onClick={confirmLeave}
                className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-red-500/30"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar (Desktop) */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 relative">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full bg-slate-50 border border-slate-100 p-1">
            <Image src="/logo.png" alt="Logo" fill className="object-contain p-0.5" />
          </div>
          <div>
            <h1 className="font-bold text-[#0a192f] leading-tight">Admin Panel</h1>
            <p className="text-[10px] text-slate-400 font-medium">AGM College</p>
          </div>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Management</p>
          
          <button 
            onClick={() => setActiveTab("contact")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
              activeTab === "contact" ? "bg-[#0a192f] text-white shadow-lg shadow-[#0a192f]/20" : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Contact Messages
            {activeTab === "contact" && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#d4af37]" />}
          </button>
          
          <button 
            onClick={() => setActiveTab("admission")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
              activeTab === "admission" ? "bg-[#0a192f] text-white shadow-lg shadow-[#0a192f]/20" : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Admissions
            {activeTab === "admission" && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#d4af37]" />}
          </button>

          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 mt-8">System</p>
          
          <button 
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
              activeTab === "settings" ? "bg-[#0a192f] text-white shadow-lg shadow-[#0a192f]/20" : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <Settings className="w-4 h-4" />
            Settings
            {activeTab === "settings" && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#d4af37]" />}
          </button>
        </div>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => setShowLeavePrompt(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative z-0 overflow-hidden">
        
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between z-20 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full border border-slate-100">
              <Image src="/logo.png" alt="Logo" fill className="object-contain p-0.5" />
            </div>
            <span className="font-bold text-[#0a192f]">Admin</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-slate-50 rounded-xl text-slate-600">
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-[60px] left-0 w-full bg-white border-b border-slate-100 shadow-xl z-20 flex flex-col p-4 gap-2">
            <button onClick={() => { setActiveTab("contact"); setIsMobileMenuOpen(false); }} className={`p-3 rounded-xl flex items-center gap-3 font-semibold ${activeTab === "contact" ? "bg-[#0a192f] text-white" : "bg-slate-50 text-slate-600"}`}><MessageSquare className="w-4 h-4" /> Contact Messages</button>
            <button onClick={() => { setActiveTab("admission"); setIsMobileMenuOpen(false); }} className={`p-3 rounded-xl flex items-center gap-3 font-semibold ${activeTab === "admission" ? "bg-[#0a192f] text-white" : "bg-slate-50 text-slate-600"}`}><GraduationCap className="w-4 h-4" /> Admissions</button>
            <button onClick={() => { setActiveTab("settings"); setIsMobileMenuOpen(false); }} className={`p-3 rounded-xl flex items-center gap-3 font-semibold ${activeTab === "settings" ? "bg-[#0a192f] text-white" : "bg-slate-50 text-slate-600"}`}><Settings className="w-4 h-4" /> Settings</button>
            <div className="h-px bg-slate-100 my-2" />
            <button onClick={() => setShowLeavePrompt(true)} className="p-3 rounded-xl flex items-center gap-3 font-semibold bg-red-50 text-red-500"><LogOut className="w-4 h-4" /> Sign Out</button>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0a192f] font-serif tracking-tight">
                  {activeTab === "contact" && "Contact Messages"}
                  {activeTab === "admission" && "Admission Enquiries"}
                  {activeTab === "settings" && "Account Settings"}
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  {activeTab === "settings" ? "Manage your admin credentials" : `Review and manage ${activeTab} submissions`}
                </p>
              </div>
            </div>

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 max-w-xl">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-[#0a192f]/5 flex items-center justify-center text-[#0a192f]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0a192f]">Security Credentials</h3>
                    <p className="text-xs text-slate-500">Update your username and password</p>
                  </div>
                </div>

                <form onSubmit={handleUpdateCredentials} className="space-y-5">
                  {settingsMsg.text && (
                    <div className={`p-3 rounded-xl text-sm flex items-center gap-2 ${settingsMsg.isError ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
                      {settingsMsg.isError ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                      {settingsMsg.text}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">New Username</label>
                    <input type="text" required value={newUsername} onChange={e => setNewUsername(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Current Password</label>
                    <input type="password" required value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">New Password</label>
                    <input type="password" required value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37]" />
                  </div>
                  <button type="submit" className="w-full py-3.5 bg-[#0a192f] hover:bg-[#0a192f]/90 text-white rounded-xl font-bold transition-colors shadow-lg shadow-[#0a192f]/20 mt-4">
                    Update Credentials
                  </button>
                </form>
              </div>
            )}

            {/* List Tab (Contact/Admission) */}
            {activeTab !== "settings" && (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                {isLoading ? (
                  <div className="p-12 text-center text-slate-400 flex flex-col items-center">
                    <div className="w-8 h-8 border-4 border-slate-200 border-t-[#d4af37] rounded-full animate-spin mb-4" />
                    Loading submissions...
                  </div>
                ) : filteredSubmissions.length === 0 ? (
                  <div className="p-16 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                      <MessageSquare className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700">No submissions yet</h3>
                    <p className="text-slate-500 text-sm mt-1">When someone submits a form, it will appear here.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-100">
                        <tr>
                          <th className="px-6 py-4">User</th>
                          <th className="px-6 py-4">Details</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredSubmissions.map((sub) => (
                          <tr key={sub._id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="font-bold text-[#0a192f]">{sub.name}</div>
                              <div className="text-slate-500 text-xs mt-0.5">{sub.email}</div>
                              <div className="text-slate-500 text-xs">{sub.phone}</div>
                            </td>
                            <td className="px-6 py-4 max-w-[200px] truncate">
                              {activeTab === "contact" ? (
                                <>
                                  <div className="font-medium text-slate-700 truncate">{sub.subject}</div>
                                  <div className="text-slate-500 text-xs truncate mt-0.5">{sub.message}</div>
                                </>
                              ) : (
                                <>
                                  <div className="font-medium text-slate-700 truncate">Course: {sub.course}</div>
                                  <div className="text-slate-500 text-xs mt-0.5">City: {sub.city}</div>
                                </>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                sub.status === "resolved" 
                                  ? "bg-emerald-50 text-emerald-600 border border-emerald-200/50" 
                                  : "bg-amber-50 text-amber-600 border border-amber-200/50"
                              }`}>
                                {sub.status === "resolved" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                {sub.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={() => updateStatus(sub._id, sub.status === "pending" ? "resolved" : "pending")}
                                  className="p-2 text-slate-400 hover:text-[#0a192f] hover:bg-slate-100 rounded-lg transition-colors tooltip"
                                  title={`Mark as ${sub.status === "pending" ? "Resolved" : "Pending"}`}
                                >
                                  {sub.status === "pending" ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                </button>
                                <button 
                                  onClick={() => setSelectedSubmission(sub)}
                                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => deleteSubmission(sub._id)}
                                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Submission Details Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a192f]/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h3 className="text-xl font-bold text-[#0a192f] font-serif tracking-tight">Ticket Details</h3>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                  Submitted on {new Date(selectedSubmission.createdAt).toLocaleString()}
                </p>
              </div>
              <button 
                onClick={() => setSelectedSubmission(null)}
                className="p-2 bg-white hover:bg-slate-100 text-slate-500 rounded-full transition-colors border border-slate-200 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 sm:p-8 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Name</label>
                  <p className="font-semibold text-slate-800">{selectedSubmission.name}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Email</label>
                  <a href={`mailto:${selectedSubmission.email}`} className="font-semibold text-blue-600 hover:underline">{selectedSubmission.email}</a>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Phone</label>
                  <a href={`tel:${selectedSubmission.phone}`} className="font-semibold text-slate-800 hover:text-[#d4af37]">{selectedSubmission.phone}</a>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Status</label>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mt-0.5 ${
                    selectedSubmission.status === "resolved" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  }`}>
                    {selectedSubmission.status}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                {selectedSubmission.type === "contact" ? (
                  <>
                    <label className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest mb-2 block">Subject</label>
                    <h4 className="font-bold text-lg text-[#0a192f] mb-4">{selectedSubmission.subject}</h4>
                    
                    <label className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest mb-2 block">Message</label>
                    <p className="text-slate-600 whitespace-pre-wrap leading-relaxed text-sm">
                      {selectedSubmission.message}
                    </p>
                  </>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest mb-2 block">Course Interested</label>
                      <h4 className="font-bold text-lg text-[#0a192f]">{selectedSubmission.course}</h4>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest mb-2 block">Education Level</label>
                      <h4 className="font-bold text-lg text-[#0a192f]">{selectedSubmission.education || "N/A"}</h4>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest mb-2 block">City / Location</label>
                      <h4 className="font-bold text-lg text-[#0a192f]">{selectedSubmission.city}</h4>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
              <button
                onClick={() => updateStatus(selectedSubmission._id, selectedSubmission.status === "pending" ? "resolved" : "pending")}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
              >
                Mark as {selectedSubmission.status === "pending" ? "Resolved" : "Pending"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {submissionToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a192f]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden scale-in duration-200">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#0a192f] mb-3 font-serif">Delete Submission?</h3>
              <p className="text-slate-500 mb-8 max-w-[280px] mx-auto leading-relaxed">
                Are you sure you want to delete this submission? This action cannot be undone.
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setSubmissionToDelete(null)}
                  className="px-6 py-3 rounded-xl text-sm font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-3 rounded-xl text-sm font-bold bg-red-600 text-white hover:bg-red-700 transition-colors w-full sm:w-auto shadow-md shadow-red-600/20"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
