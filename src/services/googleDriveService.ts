export interface DriveDocItem {
  id: string;
  name: string;
  url: string;
  mimeType?: string;
  sizeBytes?: number;
  iconUrl?: string;
}

const SAMPLE_DRIVE_FILES: DriveDocItem[] = [
  {
    id: 'drive_doc_01',
    name: 'Luna_Coffee_Brand_Guideline_Brief_2026.pdf',
    url: 'https://docs.google.com/document/d/sample-guideline',
    mimeType: 'application/pdf',
    sizeBytes: 1540000
  },
  {
    id: 'drive_doc_02',
    name: 'Hop_Dong_Nghiem_Thu_CollabLocal_Escrow.pdf',
    url: 'https://docs.google.com/document/d/sample-contract',
    mimeType: 'application/pdf',
    sizeBytes: 420000
  },
  {
    id: 'drive_doc_03',
    name: 'Video_Review_Draft_4K_LinhFoodie_TastingMenu.mp4',
    url: 'https://drive.google.com/file/d/sample-draft-video',
    mimeType: 'video/mp4',
    sizeBytes: 48000000
  },
  {
    id: 'drive_doc_04',
    name: 'Menu_Trai_Nghiem_Va_Chinh_Sach_Cameraman.docx',
    url: 'https://docs.google.com/document/d/sample-menu',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    sizeBytes: 280000
  },
  {
    id: 'drive_doc_05',
    name: 'Moodboard_Goc_Quay_Anh_Sang_Ban_Ngay.pdf',
    url: 'https://drive.google.com/file/d/sample-moodboard',
    mimeType: 'application/pdf',
    sizeBytes: 3100000
  }
];

let cachedToken: string | null = null;

export async function getAccessToken(): Promise<string | null> {
  if (cachedToken) return cachedToken;
  try {
    const saved = localStorage.getItem('collablocal_drive_token');
    if (saved) {
      cachedToken = saved;
      return saved;
    }
  } catch (e) {
    // Ignore storage error
  }
  return null;
}

export async function googleSignIn(): Promise<{ accessToken: string }> {
  // Use mock token for seamless in-app demo experience
  const mockToken = 'mock_google_oauth_token_' + Date.now();
  cachedToken = mockToken;
  try {
    localStorage.setItem('collablocal_drive_token', mockToken);
  } catch (e) {
    // Ignore storage error
  }
  return { accessToken: mockToken };
}

export async function openDrivePicker(
  onSuccess: (docs: DriveDocItem[]) => void,
  onCancel?: () => void
): Promise<void> {
  // Check if Google Picker API script is loaded
  const gapi = (window as any).gapi;
  const google = (window as any).google;

  if (!gapi || !google?.picker) {
    // Fall back to direct file selector in modal
    throw new Error('Native Google Drive Picker not loaded in browser iframe.');
  }

  // Native picker logic if present
  try {
    const token = await getAccessToken();
    const view = new google.picker.DocsView().setIncludeFolders(true);
    const picker = new google.picker.PickerBuilder()
      .addView(view)
      .setOAuthToken(token || '')
      .setCallback((data: any) => {
        if (data.action === google.picker.Action.PICKED) {
          const docs: DriveDocItem[] = data.docs.map((d: any) => ({
            id: d.id,
            name: d.name,
            url: d.url,
            mimeType: d.mimeType
          }));
          onSuccess(docs);
        } else if (data.action === google.picker.Action.CANCEL) {
          if (onCancel) onCancel();
        }
      })
      .build();

    picker.setVisible(true);
  } catch (err) {
    throw err;
  }
}

export async function fetchDriveFilesDirect(token: string | null): Promise<DriveDocItem[]> {
  // If a real token and network call can be made:
  if (token && !token.startsWith('mock_')) {
    try {
      const response = await fetch(
        'https://www.googleapis.com/drive/v3/files?pageSize=15&fields=files(id,name,mimeType,webViewLink,size)',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.files && data.files.length > 0) {
          return data.files.map((f: any) => ({
            id: f.id,
            name: f.name,
            url: f.webViewLink || `https://drive.google.com/file/d/${f.id}`,
            mimeType: f.mimeType,
            sizeBytes: f.size ? Number(f.size) : undefined
          }));
        }
      }
    } catch (err) {
      console.warn('Direct Google Drive API fetch failed, using realistic demo files:', err);
    }
  }

  // Return realistic demo files
  return SAMPLE_DRIVE_FILES;
}
