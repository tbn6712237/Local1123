import React from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import { X, CheckCircle2, MessageSquare, Handshake, AlertCircle, DollarSign, Bell } from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const { 
    showNotificationDrawer, 
    setShowNotificationDrawer, 
    notifications, 
    markNotificationsAsRead,
    setActiveMatchId,
    setCurrentView 
  } = useApp();
  const { l, loc } = useT();

  if (!showNotificationDrawer) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'match':
        return <Handshake className="w-4 h-4 text-[#2563EB]" />;
      case 'offer':
        return <DollarSign className="w-4 h-4 text-[#008A05]" />;
      case 'booking':
        return <CheckCircle2 className="w-4 h-4 text-[#222222]" />;
      case 'payment':
        return <DollarSign className="w-4 h-4 text-[#008A05]" />;
      case 'review':
        return <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />;
      default:
        return <Bell className="w-4 h-4 text-[#717171]" />;
    }
  };

  const handleClickItem = (linkMatchId?: string) => {
    if (linkMatchId) {
      setActiveMatchId(linkMatchId);
      setCurrentView('collab');
    }
    setShowNotificationDrawer(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" 
        onClick={() => setShowNotificationDrawer(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#EBEBEB] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-[18px] sm:text-[22px] font-semibold text-[#222222] font-display">
                {l('Thông Báo', 'Notifications', '알림')}
              </h2>
              <span className="text-[14px] text-[#717171]">
                ({notifications.filter(n => !n.read).length} {l('mới', 'new', '새 알림')})
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={markNotificationsAsRead}
                className="text-[14px] text-[#222222] hover:text-[#2563EB] underline font-medium cursor-pointer transition-colors"
              >
                {l('Đánh dấu đã đọc', 'Mark all read', '모두 읽음 표시')}
              </button>
              <button
                onClick={() => setShowNotificationDrawer(false)}
                className="p-1.5 rounded-full text-[#717171] hover:text-[#222222] hover:bg-[#F7F7F7] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#EBEBEB] p-2">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-[#717171] text-[14px]">
                {l('Chưa có thông báo nào.', 'No notifications yet.', '새로운 알림이 없습니다.')}
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleClickItem(notif.linkMatchId)}
                  className={`p-4 rounded-2xl transition-colors cursor-pointer flex items-start gap-3 ${
                    notif.read ? 'hover:bg-[#F7F7F7]' : 'bg-[#EFF6FF] hover:bg-[#FFF0ED]'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-white border border-[#EBEBEB] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="text-[14px] font-semibold text-[#222222] truncate">{loc(notif.title)}</p>
                      <span className="text-[12px] text-[#717171] whitespace-nowrap">{loc(notif.timestamp)}</span>
                    </div>
                    <p className="text-[13px] text-[#717171] leading-relaxed line-clamp-2">{loc(notif.message)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
