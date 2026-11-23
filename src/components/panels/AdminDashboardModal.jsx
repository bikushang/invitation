import { useState } from "react";
import {
  X,
  Users,
  Download,
  Trash2,
  CheckCircle2,
  Search,
  Filter,
} from "lucide-react";
import { deleteSavedInvitation } from "../../lib/storage";

export default function AdminDashboardModal({
  isOpen,
  onClose,
  rsvpList = [],
  slug = "default",
  onToast,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const totalResponses = rsvpList.length;
  const confirmedAttending = rsvpList.filter((r) => r.attending !== "regret");
  const totalGuests = confirmedAttending.reduce(
    (acc, curr) => acc + (parseInt(curr.guests) || 1),
    0,
  );

  const filtered = rsvpList.filter(
    (r) =>
      (r.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.wishes || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function exportCsv() {
    if (rsvpList.length === 0) {
      alert("No RSVP data to export yet.");
      return;
    }
    const headers = [
      "Name",
      "Guests Count",
      "Attending",
      "Wishes",
      "Submitted At",
    ];
    const rows = rsvpList.map((r) => [
      `"${r.name || ""}"`,
      r.guests || "1",
      r.attending === "regret" ? "Declined" : "Attending",
      `"${(r.wishes || "").replace(/"/g, '""')}"`,
      r.submittedAt || "",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `wedding_rsvps_${slug}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (onToast) onToast("Exported RSVP CSV for wedding planning!");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[85vh] rounded-2xl bg-white border border-stone-200 shadow-2xl flex flex-col text-stone-900 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-amber-800 text-white">
              <Users size={18} />
            </span>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Wedding Admin & RSVP Management
              </h3>
              <p className="text-xs text-stone-500">
                Live guest list, catering headcounts & planner export
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900 transition cursor-pointer shadow-xs"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-3 gap-4 p-6 border-b border-stone-100 bg-stone-50/50">
          <div className="p-4 rounded-xl border border-stone-200 bg-white">
            <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              Total RSVPs
            </p>
            <p className="text-2xl font-bold text-stone-900 mt-1">
              {totalResponses}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50">
            <p className="text-xs font-medium text-amber-900 uppercase tracking-wider">
              Confirmed Guests
            </p>
            <p className="text-2xl font-bold text-amber-900 mt-1">
              {totalGuests}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-stone-200 bg-white">
            <p className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              Attendance Rate
            </p>
            <p className="text-2xl font-bold text-emerald-700 mt-1">
              {totalResponses > 0
                ? Math.round((confirmedAttending.length / totalResponses) * 100)
                : 100}
              %
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-3 border-b border-stone-200 flex items-center gap-2 bg-white">
          <Search size={16} className="text-stone-400" />
          <input
            type="text"
            placeholder="Search guest by name or wishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 text-xs outline-none text-stone-800"
          />
        </div>

        {/* Guests Table */}
        <div className="flex-1 overflow-y-auto builder-scroll p-6">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-stone-500">
              No RSVPs matching your search. Guests who fill out the RSVP
              section will appear here automatically.
            </div>
          ) : (
            <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden">
              <div className="grid grid-cols-12 bg-stone-100 p-3 text-[11px] font-bold uppercase tracking-wider text-stone-600">
                <span className="col-span-4">Guest Name</span>
                <span className="col-span-2 text-center">Headcount</span>
                <span className="col-span-4">Warm Wishes</span>
                <span className="col-span-2 text-right">Received</span>
              </div>
              {filtered.map((rsvp) => (
                <div
                  key={rsvp.id}
                  className="grid grid-cols-12 p-3 text-xs items-center hover:bg-stone-50 transition"
                >
                  <div className="col-span-4 font-semibold text-stone-900 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    <span>{rsvp.name}</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold text-[11px]">
                      {rsvp.guests || 1}{" "}
                      {parseInt(rsvp.guests) > 1 ? "Guests" : "Guest"}
                    </span>
                  </div>
                  <div className="col-span-4 text-stone-600 italic truncate pr-2">
                    {rsvp.wishes ? `"${rsvp.wishes}"` : "—"}
                  </div>
                  <div className="col-span-2 text-right text-[11px] text-stone-400">
                    {rsvp.submittedAt
                      ? new Date(rsvp.submittedAt).toLocaleDateString()
                      : "Today"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
