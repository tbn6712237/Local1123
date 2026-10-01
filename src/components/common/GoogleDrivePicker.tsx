import React, { useState } from 'react';
import { 
  openDrivePicker, 
  googleSignIn, 
  getAccessToken, 
  fetchDriveFilesDirect, 
  DriveDocItem 
} from '../../services/googleDriveService';
import { Loader2, FileText, Check, AlertCircle, X, ExternalLink } from 'lucide-react';
import { useT } from '../../i18n/useT';

interface GoogleDrivePickerProps {
  onFilesSelected?: (docs: DriveDocItem[]) => void;
  className?: string;
  buttonText?: string;
  compact?: boolean;
}

export const GoogleDriveIntegration: React.FC<GoogleDrivePickerProps> = ({
  onFilesSelected,
  className = '',
  buttonText,
  compact = false
}) => {
  const { lang, l } = useT();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFileModal, setShowFileModal] = useState(false);
  const [recentFiles, setRecentFiles] = useState<DriveDocItem[]>([]);
  const [selectedFileIds, setSelectedFileIds] = useState<Set<string>>(new Set());

  const defaultBtnText = buttonText || l('Chọn tài liệu từ Google Drive', 'Attach from Google Drive', 'Google Drive에서 파일 첨부');

  const handleOpenPicker = async () => {
    setLoading(true);
    setError(null);
    try {
      let token = await getAccessToken();
      if (!token) {
        const signinRes = await googleSignIn();
        token = signinRes.accessToken;
      }

      // Attempt native picker first
      try {
        await openDrivePicker(
          (docs) => {
            if (onFilesSelected) {
              onFilesSelected(docs);
            }
            setLoading(false);
          },
          () => {
            setLoading(false);
          }
        );
      } catch (pickerErr) {
        console.warn('Native picker error, falling back to direct files list:', pickerErr);
        // Fallback: fetch files directly via Drive API
        const files = await fetchDriveFilesDirect(token);
        setRecentFiles(files);
        setShowFileModal(true);
        setLoading(false);
      }
    } catch (err: any) {
      console.error('Failed to open Google Drive:', err);
      setError(err?.message || l('Không thể kết nối Google Drive. Vui lòng thử lại.', 'Cannot connect to Google Drive. Please retry.', 'Google Drive에 연결할 수 없습니다. 다시 시도해 주세요.'));
      setLoading(false);
    }
  };

  const handleConfirmSelectModal = () => {
    const selected = recentFiles.filter(f => selectedFileIds.has(f.id));
    if (selected.length > 0 && onFilesSelected) {
      onFilesSelected(selected);
    }
    setShowFileModal(false);
    setSelectedFileIds(new Set());
  };

  const toggleSelectFile = (id: string) => {
    setSelectedFileIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      <button 
        type="button"
        disabled={loading}
        onClick={handleOpenPicker}
        className={className || `flex items-center gap-2 ${compact ? 'px-3 py-1.5 text-[13px]' : 'px-4 py-2 text-[14px]'} border border-[#DDDDDD] hover:border-[#222222] rounded-full bg-white hover:bg-[#F7F7F7] text-[#222222] font-semibold shadow-xs transition-all cursor-pointer disabled:opacity-60`}
      >
        {loading ? (
          <Loader2 className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} animate-spin text-[#2563EB]`} />
        ) : (
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" 
            alt="Drive" 
            className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} 
          />
        )}
        <span>{loading ? l('Đang kết nối...', 'Connecting...', '연결 중...') : defaultBtnText}</span>
      </button>

      {error && (
        <div className="text-[11px] text-[#2563EB] flex items-center gap-1 mt-1 font-medium">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Fallback In-App Drive File Selector Modal */}
      {showFileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-[#EBEBEB] animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#EBEBEB] mb-3">
              <div className="flex items-center gap-2">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" 
                  alt="Drive" 
                  className="w-5 h-5" 
                />
                <h3 className="text-[16px] font-semibold text-[#222222] font-display">
                  {l('Chọn tệp từ Google Drive', 'Select File from Google Drive', 'Google Drive에서 파일 선택')}
                </h3>
              </div>
              <button 
                onClick={() => setShowFileModal(false)}
                className="p-1 rounded-full text-[#717171] hover:text-[#222222] hover:bg-[#F7F7F7] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[13px] text-[#717171] mb-3">
              {l(
                'Chọn các tài liệu, hợp đồng, video nháp hoặc tệp thiết kế bạn muốn đính kèm:',
                'Select documents, contracts, video drafts, or design assets to attach:',
                '첨부할 기획서, 계약서, 영상 초안 또는 디자인 파일을 선택하세요:'
              )}
            </p>

            <div className="max-h-60 overflow-y-auto divide-y divide-[#EBEBEB] border border-[#EBEBEB] rounded-2xl mb-4">
              {recentFiles.length === 0 ? (
                <div className="p-6 text-center text-[14px] text-[#717171]">
                  {l('Không tìm thấy tệp nào gần đây trong Google Drive.', 'No recent files found in Google Drive.', 'Google Drive에서 최근 파일을 찾을 수 없습니다.')}
                </div>
              ) : (
                recentFiles.map(file => {
                  const isChecked = selectedFileIds.has(file.id);
                  return (
                    <div 
                      key={file.id}
                      onClick={() => toggleSelectFile(file.id)}
                      className={`p-3 flex items-center justify-between gap-3 text-[14px] cursor-pointer transition-colors ${isChecked ? 'bg-[#EFF6FF]' : 'hover:bg-[#F7F7F7]'}`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileText className="w-4 h-4 text-[#2563EB] shrink-0" />
                        <span className="font-medium text-[#222222] truncate">{file.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <a 
                          href={file.url} 
                          target="_blank" 
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#717171] hover:text-[#2563EB]"
                          title={l('Xem tệp', 'View file', '파일 보기')}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${isChecked ? 'bg-[#222222] border-[#222222] text-white' : 'border-[#DDDDDD]'}`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EBEBEB]">
              <button
                type="button"
                onClick={() => setShowFileModal(false)}
                className="px-4 py-2 text-[14px] font-semibold text-[#717171] hover:text-[#222222] rounded-xl cursor-pointer"
              >
                {l('Hủy', 'Cancel', '취소')}
              </button>
              <button
                type="button"
                disabled={selectedFileIds.size === 0}
                onClick={handleConfirmSelectModal}
                className="px-5 py-2.5 text-[14px] font-semibold text-white btn-airbnb-primary disabled:opacity-50 rounded-xl cursor-pointer shadow-xs transition-all"
              >
                {l('Đính kèm', 'Attach', '첨부하기')} ({selectedFileIds.size})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
