import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  Plus, 
  Calendar, 
  Users, 
  Eye, 
  DollarSign, 
  Check, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const CampaignsList: React.FC = () => {
  const { campaigns, activeBusiness, setShowCreateCampaignModal, setCurrentView } = useApp();

  const bizCampaigns = campaigns.filter(c => c.businessId === activeBusiness.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[26px] sm:text-[32px] font-semibold text-[#222222] font-display tracking-tight leading-tight">
            Campaigns Management
          </h1>
          <p className="text-[15px] text-[#717171] leading-relaxed mt-1">
            Manage your active campaign briefs, budgets, and creator recruitment quotas.
          </p>
        </div>

        <button
          onClick={() => setShowCreateCampaignModal(true)}
          className="px-5 py-2.5 btn-airbnb-primary text-[14px] font-semibold rounded-xl shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Campaign</span>
        </button>
      </div>

      <div className="space-y-4">
        {bizCampaigns.map((camp) => (
          <div
            key={camp.id}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EBEBEB] hover:border-[#DDDDDD] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-5 transition-colors"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[12px] font-semibold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-0.5 rounded-full border border-[#2563EB]/20">
                  Active
                </span>
                <span className="text-[14px] font-medium text-[#717171]">{camp.category}</span>
                {camp.isSponsored && (
                  <span className="text-[12px] font-semibold bg-[#F7F7F7] text-[#222222] px-2.5 py-0.5 rounded-full border border-[#DDDDDD]">
                    Sponsored Boost
                  </span>
                )}
              </div>

              <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#222222] font-display">
                {camp.title}
              </h2>

              <p className="text-[14px] sm:text-[15px] text-[#717171] leading-relaxed">
                {camp.brief}
              </p>

              <div className="flex flex-wrap gap-4 text-[14px] text-[#717171] pt-1">
                <div><strong className="text-[#222222]">Budget:</strong> <span className="font-semibold text-[#222222]">{camp.budgetDisplay}</span></div>
                <div><strong className="text-[#222222]">Platform:</strong> {camp.platform}</div>
                <div><strong className="text-[#222222]">Deliverables:</strong> {camp.deliverables}</div>
                <div><strong className="text-[#222222]">Target:</strong> {camp.creatorType} ({camp.followerRange})</div>
                <div><strong className="text-[#222222]">Deadline:</strong> {camp.deadline}</div>
              </div>
            </div>

            <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#EBEBEB] shrink-0">
              <div className="text-left md:text-right">
                <span className="text-[12px] text-[#717171] block font-medium">Creator Slots</span>
                <span className="text-[15px] font-semibold text-[#222222]">
                  1 / {camp.numberCreators} filled
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentView('discover')}
                  className="px-4.5 py-2.5 border border-[#222222] hover:bg-[#F7F7F7] text-[#222222] text-[14px] font-semibold rounded-xl cursor-pointer transition-colors"
                >
                  Find Creators
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
