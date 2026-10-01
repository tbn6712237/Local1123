import { Campaign } from '../types';
import { ALL_RAW_BUSINESSES } from './businessesData';

export const ALL_RAW_CAMPAIGNS: Campaign[] = ALL_RAW_BUSINESSES.map((biz, index) => {
  const isFoodOrCafe = biz.category.includes('Ẩm Thực') || biz.category.includes('Nhà Hàng') || biz.category.includes('Cafe') || biz.category.includes('Bánh');
  const isNightlife = biz.category.includes('Bar') || biz.category.includes('Bia') || biz.category.includes('Jazz') || biz.category.includes('Acoustic');
  const isSpaOrBeauty = biz.category.includes('Spa') || biz.category.includes('Hair') || biz.category.includes('Skincare') || biz.category.includes('Làm Đẹp');
  const isFitness = biz.category.includes('Fitness') || biz.category.includes('Pilates') || biz.category.includes('Boxing') || biz.category.includes('SUP') || biz.category.includes('Surf');
  const isFashion = biz.category.includes('Thời Trang') || biz.category.includes('Áo Dài') || biz.category.includes('Len');
  const isCraft = biz.category.includes('Workshop') || biz.category.includes('Gốm') || biz.category.includes('Nước Hoa') || biz.category.includes('Florist') || biz.category.includes('Sơn Mài') || biz.category.includes('Nhẫn Bạc');
  const isStay = biz.category.includes('Villa') || biz.category.includes('Homestay') || biz.category.includes('Penthouse') || biz.category.includes('Loft');

  let budgetMax = 800000;
  let budgetMin = 600000;
  let budgetDisplay = '800.000 ₫';
  let deliverables = '1 Video TikTok 60s + 1 Story';
  let brief = `Trải nghiệm thực tế không gian ${biz.name} và chia sẻ chân thực cảm nhận dịch vụ đến người theo dõi.`;
  let platform: 'TikTok' | 'Instagram' | 'Multi-platform' = 'TikTok';

  if (isFoodOrCafe) {
    budgetMin = 600000;
    budgetMax = 900000;
    budgetDisplay = '850.000 ₫';
    deliverables = '1 Video TikTok 60s + 1 Story trải nghiệm';
    brief = `Quay review món ăn đặc trưng, không gian quán và phong cách phục vụ tại ${biz.name}. Tặng menu thử món miễn phí 2 người.`;
    platform = index % 3 === 0 ? 'TikTok' : index % 3 === 1 ? 'Instagram' : 'Multi-platform';
  } else if (isNightlife) {
    budgetMin = 750000;
    budgetMax = 1200000;
    budgetDisplay = '1.000.000 ₫';
    deliverables = '1 Video Reel Instagram + 2 Story bắt trọn âm nhạc & cocktail';
    brief = `Ghi lại không khí đêm lung linh, bartender biểu diễn pha chế cocktail signature và giai điệu âm nhạc tại ${biz.name}.`;
    platform = 'Instagram';
  } else if (isSpaOrBeauty) {
    budgetMin = 800000;
    budgetMax = 1500000;
    budgetDisplay = '1.200.000 ₫';
    deliverables = '1 Video TikTok review quy trình liệu trình chuyên sâu';
    brief = `Trải nghiệm dịch vụ chăm sóc thư giãn 90 phút, quay cận cảnh kỹ thuật massage và làn da rạng rỡ sau liệu trình.`;
    platform = 'TikTok';
  } else if (isFitness) {
    budgetMin = 700000;
    budgetMax = 1200000;
    budgetDisplay = '950.000 ₫';
    deliverables = '1 Video TikTok trải nghiệm buổi tập thử thách + B-roll';
    brief = `Tham gia buổi tập tràn đầy năng lượng cùng huấn luyện viên, truyền cảm hứng sống khỏe và luyện tập đến cộng đồng.`;
    platform = 'TikTok';
  } else if (isFashion) {
    budgetMin = 900000;
    budgetMax = 1600000;
    budgetDisplay = '1.250.000 ₫';
    deliverables = '1 Video Reel phối đồ OOTD + 1 Bộ ảnh Lookbook';
    brief = `Mix & match 3 set trang phục mới nhất của thương hiệu, nêu bật chất liệu cao cấp và form dáng chuẩn chỉ.`;
    platform = 'Instagram';
  } else if (isCraft) {
    budgetMin = 650000;
    budgetMax = 1100000;
    budgetDisplay = '900.000 ₫';
    deliverables = '1 Video TikTok ASMR workshop + Cận cảnh thành phẩm';
    brief = `Ghi lại hành trình tự tay sáng tạo tác phẩm thủ công độc bản từ khâu bắt đầu đến lúc hoàn thiện tuyệt mỹ.`;
    platform = 'TikTok';
  } else if (isStay) {
    budgetMin = 1500000;
    budgetMax = 3000000;
    budgetDisplay = '2.200.000 ₫';
    deliverables = '1 Video TikTok room tour + 1 Reel toàn cảnh nghỉ dưỡng';
    brief = `Trải nghiệm trọn gói 1 đêm nghỉ dưỡng cao cấp, review view cảnh quan, tiện ích hồ bơi và bữa sáng thịnh soạn.`;
    platform = 'Multi-platform';
  }

  // Demo preservation for Luna Coffee
  if (biz.id === 'biz-luna') {
    budgetMin = 500000;
    budgetMax = 800000;
    budgetDisplay = '650.000 ₫';
    deliverables = '1 Video TikTok 60s + 1 Story';
    brief = 'Quay trải nghiệm không gian tối giản mới nâng cấp, cận cảnh thao tác Pour-over Barista và góc check-in giếng trời.';
  }

  return {
    id: biz.id === 'biz-luna' ? 'camp-luna-launch' : `camp-${biz.id.replace('biz-', '')}`,
    businessId: biz.id,
    title: biz.id === 'biz-luna' ? 'Chiến Dịch Khai Trương Luna Coffee Tràng Tiền' : `Chiến dịch quảng bá trải nghiệm ${biz.name}`,
    category: biz.category,
    location: biz.location,
    distanceKm: biz.distanceKm,
    budgetMin,
    budgetMax,
    budgetDisplay,
    paymentType: 'Cash + Perks',
    creatorType: 'Nano & Micro Creator',
    followerRange: '10K - 150K followers',
    platform,
    deliverables,
    deadline: `Còn ${3 + (index % 10)} ngày`,
    numberCreators: 2 + (index % 4),
    brief,
    status: 'active',
    isSponsored: index % 4 === 0,
    createdAt: '2026-09-25T10:00:00Z'
  };
});
