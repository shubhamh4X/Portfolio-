import React, { useState } from 'react';
import { X, Mail, Download, Trash2, CheckCircle2, Clock, DollarSign, Building, ExternalLink } from 'lucide-react';
import { ClientInquiry } from '../types/portfolio';

interface InboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: ClientInquiry[];
  onUpdateStatus: (id: string, status: 'new' | 'reviewed' | 'replied') => void;
  onDeleteInquiry: (id: string) => void;
  darkMode: boolean;
}

export const InboxModal: React.FC<InboxModalProps> = ({
  isOpen,
  onClose,
  inquiries,
  onUpdateStatus,
  onDeleteInquiry,
  darkMode,
}) => {
  const [selectedInquiry, setSelectedInquiry] = useState<ClientInquiry | null>(
    inquiries.length > 0 ? inquiries[0] : null
  );

  if (!isOpen) return null;

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(inquiries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `client_inquiries_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className={`relative w-full max-w-5xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[88vh] ${
          darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-100' : 'bg-white border-neutral-200 text-neutral-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className={`p-4 px-6 border-b flex items-center justify-between shrink-0 ${
          darkMode ? 'border-neutral-800 bg-neutral-950/60' : 'border-neutral-200 bg-neutral-50'
        }`}>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-0.5">
              <span>CLIENT INQUIRIES VAULT</span>
              <span>·</span>
              <span className="text-neutral-400">{inquiries.length} total messages</span>
            </div>
            <h3 className="text-lg font-bold font-display text-neutral-100">
              Inbound Client CRM & Inquiries
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {inquiries.length > 0 && (
              <button
                onClick={handleExportJSON}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 hover:bg-neutral-800 text-xs font-mono text-neutral-300 transition-colors"
                title="Export inquiries to JSON"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        
        {inquiries.length === 0 ? (
          <div className="p-12 text-center space-y-3 font-mono">
            <Mail className="w-10 h-10 text-neutral-600 mx-auto" />
            <p className="text-sm text-neutral-400">No client inquiries received yet.</p>
            <p className="text-xs text-neutral-600">
              Messages submitted via the contact form will automatically appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden min-h-[420px]">
            
            <div className={`md:col-span-5 border-r overflow-y-auto ${
              darkMode ? 'border-neutral-800 bg-neutral-950/40' : 'border-neutral-200 bg-neutral-50'
            }`}>
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  onClick={() => setSelectedInquiry(inq)}
                  className={`p-4 border-b cursor-pointer transition-colors ${
                    darkMode ? 'border-neutral-800/80 hover:bg-neutral-850' : 'border-neutral-200 hover:bg-neutral-100'
                  } ${selectedInquiry?.id === inq.id ? (darkMode ? 'bg-neutral-800/70 border-l-4 border-l-emerald-500' : 'bg-neutral-200 border-l-4 border-l-emerald-500') : ''}`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-neutral-200">{inq.name}</span>
                    <span className="font-mono text-[10px] text-neutral-500">{inq.createdAt}</span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono mb-1 truncate">
                    {inq.company} · {inq.projectType}
                  </div>
                  <p className="text-xs text-neutral-500 line-clamp-2">
                    {inq.message}
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-800/40 text-[10px] font-mono">
                    <span className="text-emerald-400">{inq.budget}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase ${
                      inq.status === 'replied' ? 'bg-emerald-950 text-emerald-400' : inq.status === 'reviewed' ? 'bg-blue-950 text-blue-400' : 'bg-amber-950 text-amber-400'
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            
            <div className="md:col-span-7 p-6 overflow-y-auto space-y-6">
              {selectedInquiry ? (
                <>
                  <div className="flex items-start justify-between pb-4 border-b border-neutral-800">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                        <span>REFERENCE: {selectedInquiry.id}</span>
                        <span>·</span>
                        <span>{selectedInquiry.createdAt}</span>
                      </div>
                      <h4 className="text-xl font-bold font-display text-neutral-100">
                        {selectedInquiry.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                        <Building className="w-3.5 h-3.5" />
                        <span>{selectedInquiry.company}</span>
                        <span>·</span>
                        <a href={`mailto:${selectedInquiry.email}`} className="text-emerald-400 hover:underline">
                          {selectedInquiry.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={selectedInquiry.status}
                        onChange={(e) => {
                          const newStat = e.target.value as any;
                          onUpdateStatus(selectedInquiry.id, newStat);
                          setSelectedInquiry({ ...selectedInquiry, status: newStat });
                        }}
                        className="px-2.5 py-1 text-xs font-mono rounded border border-neutral-800 bg-neutral-900 text-neutral-300 outline-none"
                      >
                        <option value="new">Status: New</option>
                        <option value="reviewed">Status: Reviewed</option>
                        <option value="replied">Status: Replied</option>
                      </select>

                      <button
                        onClick={() => {
                          onDeleteInquiry(selectedInquiry.id);
                          setSelectedInquiry(null);
                        }}
                        className="p-1.5 text-neutral-500 hover:text-rose-400 rounded hover:bg-neutral-800 transition-colors"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  
                  <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                    <div className="p-3 rounded-lg border border-neutral-800 bg-neutral-950">
                      <span className="text-[10px] text-neutral-500 uppercase block">Focus</span>
                      <span className="text-neutral-200 mt-0.5 block truncate">{selectedInquiry.projectType}</span>
                    </div>
                    <div className="p-3 rounded-lg border border-neutral-800 bg-neutral-950">
                      <span className="text-[10px] text-neutral-500 uppercase block">Budget</span>
                      <span className="text-emerald-400 font-bold mt-0.5 block">{selectedInquiry.budget}</span>
                    </div>
                    <div className="p-3 rounded-lg border border-neutral-800 bg-neutral-950">
                      <span className="text-[10px] text-neutral-500 uppercase block">Timeline</span>
                      <span className="text-neutral-200 mt-0.5 block">{selectedInquiry.timeline}</span>
                    </div>
                  </div>

                  
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block">
                      Client Brief / Message
                    </span>
                    <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-200 text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedInquiry.message}
                    </div>
                  </div>

                  
                  <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-800">
                    <a
                      href={`mailto:${selectedInquiry.email}?subject=Re:%20${encodeURIComponent(selectedInquiry.projectType)}%20[${selectedInquiry.id}]&body=Hi%20${encodeURIComponent(selectedInquiry.name)},%0A%0AThank%20you%20for%20reaching%20out%20regarding%20${encodeURIComponent(selectedInquiry.projectType)}.%0A%0ABest%20regards,%0AShubham`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold font-mono transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Reply via Email Client</span>
                    </a>
                  </div>
                </>
              ) : (
                <div className="h-full flex items-center justify-center text-neutral-500 text-xs font-mono">
                  Select an inquiry from the left to view details.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
