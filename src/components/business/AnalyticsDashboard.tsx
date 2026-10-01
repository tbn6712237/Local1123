import React from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer, 
  ShoppingBag, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight,
  Download,
  Calendar
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { analytics, activeBusiness, campaigns, matches } = useApp();
  const { t, l, loc } = useT();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EBEBEB] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12px] font-semibold text-[#2563EB] uppercase tracking-wider">
              {l('Báo Cáo Hiệu Suất & ROI', 'Performance Intelligence', '성과 및 ROI 리포트')}
            </span>
            <span className="text-[12px] text-[#717171]">· {l('Tracking Chuyển Đổi Thực Tế', 'Live Conversion Tracking', '실시간 전환 추적')}</span>
          </div>
          <h1 className="text-[22px] sm:text-[26px] font-semibold text-[#222222] font-display">
            {loc(analytics.campaignTitle)}
          </h1>
          <p className="text-[14px] text-[#717171] max-w-xl mt-1 leading-relaxed">
            {l(
              'Dữ liệu được đối soát tự động từ các video TikTok/Reel đã duyệt và lượng quét mã ưu đãi tại máy tính tiền POS của quán.',
              'Data synced from verified TikTok & Instagram creator submissions and on-site POS promo codes.',
              '승인된 틱톡/릴스 영상 지표 및 매장 POS 계산대에서 스캔된 프로모션 쿠폰 매출 데이터를 자동으로 정합합니다.'
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2.5 text-[14px] font-semibold border border-[#222222] rounded-xl hover:bg-[#F7F7F7] flex items-center gap-1.5 text-[#222222] cursor-pointer transition-colors">
            <Download className="w-3.5 h-3.5" />
            <span>{l('Xuất Báo Cáo CSV', 'Export CSV', 'CSV 리포트 내보내기')}</span>
          </button>
        </div>
      </div>

      {/* 5 Core Performance KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between text-[#717171] mb-1 text-[12px]">
            <span className="font-semibold">{t.totalViews}</span>
            <Eye className="w-4 h-4 text-[#2563EB]" />
          </div>
          <div className="text-[26px] font-semibold text-[#222222] tabular-nums tracking-tight">
            {analytics.totalViewsDisplay}
          </div>
          <span className="text-[12px] text-[#008A05] font-semibold">↑ +14.2% {l('so với trung bình', 'vs benchmark', '평균 대비')}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between text-[#717171] mb-1 text-[12px]">
            <span className="font-semibold">{t.totalEngagement}</span>
            <TrendingUp className="w-4 h-4 text-[#008A05]" />
          </div>
          <div className="text-[26px] font-semibold text-[#222222] tabular-nums tracking-tight">
            {analytics.engagementDisplay}
          </div>
          <span className="text-[12px] text-[#717171]">{l('Thích, lưu & bình luận', 'Likes, saves & shares', '좋아요/댓글/공유')}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between text-[#717171] mb-1 text-[12px]">
            <span className="font-semibold">{l('Click Bản Đồ / Menu', 'Bio Clicks', '지도 / 메뉴 클릭')}</span>
            <MousePointer className="w-4 h-4 text-[#222222]" />
          </div>
          <div className="text-[26px] font-semibold text-[#222222] tabular-nums tracking-tight">
            1,240
          </div>
          <span className="text-[12px] text-[#717171] font-medium">{l('Định vị quán & xem menu', 'To Google Maps / Menu', '위치 확인 및 메뉴 조회')}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between text-[#717171] mb-1 text-[12px]">
            <span className="font-semibold">{t.promoCodeRedeemed}</span>
            <ShoppingBag className="w-4 h-4 text-[#2563EB]" />
          </div>
          <div className="text-[26px] font-semibold text-[#2563EB] tabular-nums tracking-tight">
            {analytics.promoCodeUses}
          </div>
          <span className="text-[12px] text-[#2563EB] font-semibold">{l('Mã LINH10 (Giảm 10%)', 'Code LINH10 (10% off)', 'LINH10 (10% 할인 쿠폰)')}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#EBEBEB] shadow-[0_2px_8px_rgba(0,0,0,0.04)] col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-[#717171] mb-1 text-[12px]">
            <span className="font-semibold">{t.conversions}</span>
            <ShieldCheck className="w-4 h-4 text-[#008A05]" />
          </div>
          <div className="text-[26px] font-semibold text-[#008A05] tabular-nums tracking-tight">
            {analytics.estimatedConversions} <span className="text-[13px] font-normal text-[#717171]">{l('hóa đơn', 'sales', '건')}</span>
          </div>
          <span className="text-[12px] text-[#008A05] font-semibold">
            ~18.5M ₫ {l('doanh thu quầy', 'revenue', '매장 매출')}
          </span>
        </div>
      </div>

      {/* Creator Performance Attribution Breakdown */}
      <div className="bg-white rounded-3xl border border-[#EBEBEB] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-[#EBEBEB] flex items-center justify-between">
          <h3 className="text-[18px] font-semibold text-[#222222] font-display">
            {t.creatorBreakdown}
          </h3>
          <span className="text-[13px] text-[#717171]">
            {analytics.creatorBreakdowns.length} {l('Creators tham gia', 'Creators active', '참여 크리에이터')}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-[#F7F7F7] border-b border-[#EBEBEB] text-[#717171] font-semibold text-[13px]">
              <tr>
                <th className="p-4">Creator</th>
                <th className="p-4">{l('Lượt Xem Video', 'Video Views', '조회수')}</th>
                <th className="p-4">{l('Tương Tác', 'Engagements', '참여도')}</th>
                <th className="p-4">{l('Mã Giảm Giá Quét Tại Quầy', 'Vouchers Redeemed', '쿠폰 사용 횟수')}</th>
                <th className="p-4">{l('Trạng Thái', 'Status', '상태')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBEBEB]">
              {analytics.creatorBreakdowns.map((cr) => (
                <tr key={cr.creatorId} className="hover:bg-[#F7F7F7] transition-colors">
                  <td className="p-4">
                    <span className="font-semibold text-[#222222] block">{cr.username}</span>
                    <span className="text-[12px] text-[#717171]">{cr.creatorName}</span>
                  </td>
                  <td className="p-4 font-mono font-semibold text-[#222222]">
                    {cr.views.toLocaleString()}
                  </td>
                  <td className="p-4 font-mono text-[#008A05] font-semibold">
                    {cr.engagement.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span className="font-mono font-semibold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-full border border-[#2563EB]/20 text-[12px]">
                      {cr.promoUses} {l('lượt quét', 'uses', '회')}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[12px] font-semibold ${
                      cr.status === 'Đã Hoàn Thành' 
                        ? 'bg-[#EBF7EE] text-[#008A05] border border-[#008A05]/20'
                        : 'bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20'
                    }`}>
                      {cr.status === 'Đã Hoàn Thành' 
                        ? l('Đã Hoàn Thành', 'Completed', '완료됨')
                        : l('Đang Thực Hiện', 'In Progress', '진행 중')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
