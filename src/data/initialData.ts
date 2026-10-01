import { Business, Creator, Campaign, CollaborationMatch, NotificationItem, CampaignAnalytics } from '../types';
import { ALL_RAW_BUSINESSES } from './businessesData';
import { ALL_RAW_CAMPAIGNS } from './campaignsData';

const RAW_BUSINESSES: Business[] = ALL_RAW_BUSINESSES;

const enrichBusiness = (b: Business): Business => {
  const isCafe = b.category.includes('Cafe') || b.category.includes('Trà') || b.category.includes('Bánh');
  const isFood = b.category.includes('Ẩm Thực') || b.category.includes('Nhà Hàng') || b.category.includes('Bánh Mì') || b.category.includes('Cơm');
  const isBeauty = b.category.includes('Spa') || b.category.includes('Làm Đẹp') || b.category.includes('Thảo Mộc');
  const isNightlife = b.category.includes('Bar') || b.category.includes('Cocktail') || b.category.includes('Đĩa Than');
  const isFashion = b.category.includes('Thời Trang');

  // 1. Filming Conditions
  const filmingConditions = isCafe
    ? {
        bestLightingHours: '08:30 – 10:30 & 14:00 – 16:30 (Ánh sáng tự nhiên ngập tràn qua giếng trời & cửa vòm)',
        noiseLevel: 'Yên tĩnh & Nhạc Acoustic/Lofi nhẹ nhàng. Quán sẵn sàng vặn nhỏ hoặc tắt nhạc khi creator quay video thu âm trực tiếp.',
        filmingSpots: [
          { name: 'Ban công ngắm phố cổ', description: 'Góc rộng bao quát toàn cảnh đường phố rợp bóng cây xanh và nhịp sống Hà Nội cổ kính.' },
          { name: 'Quầy Barista mở', description: 'Cận cảnh thao tác pour-over, lớp bọt sữa matcha mịn màng và khói nóng bốc lên thơm ngát.' },
          { name: 'Bàn gỗ dài cạnh giếng trời', description: 'Bố cục flat-lay tĩnh vật cùng ánh nắng rọi xiên, tôn vinh trọn vẹn màu sắc đồ uống.' },
          { name: 'Góc gương check-in OOTD', description: 'Góc chụp ảnh toàn thân với hoa khô và gương cong nghệ thuật được giới trẻ ưa chuộng.' }
        ],
        amenities: ['Ổ cắm điện tại mọi bàn', 'Wifi 5GHz tốc độ cao 200Mbps', 'Chỗ đỗ xe máy miễn phí có bảo vệ dắt', 'Hỗ trợ chân máy & đèn phụ', 'Nước lọc detox miễn phí cho ekip'],
        recommendedVisitTime: '09:00 – 11:30 sáng Thứ 3 đến Thứ 6 (Giờ vắng khách nhất, quay không gian thoáng đãng)'
      }
    : isFood
    ? {
        bestLightingHours: '10:30 – 12:00 & 16:30 – 18:30 (Ánh sáng đèn vàng ấm cúng và ánh sáng tự nhiên chuẩn màu đồ ăn)',
        noiseLevel: 'Âm thanh xèo xèo sống động từ bếp mở & Nhạc Jazz êm dịu. Bếp trưởng sẵn sàng thao tác khò lửa hoặc trang trí đĩa trực tiếp.',
        filmingSpots: [
          { name: "Bàn VIP Chef's Table", description: 'Góc quan sát trực tiếp kỹ thuật điêu luyện của các đầu bếp trong không gian bếp mở.' },
          { name: 'Bàn tiệc cạnh vách kính lớn', description: 'Bắt trọn mâm cỗ hoặc set ăn đầy ắp món với ánh sáng tự nhiên căng tràn.' },
          { name: 'Góc gạch mộc & Tranh sơn mài', description: 'Phông nền mang tính biểu tượng, tôn vinh nét văn hóa đương đại kết hợp truyền thống.' }
        ],
        amenities: ['Khu vực chuẩn bị ánh sáng chuyên dụng', 'Wifi tốc độ cao 150Mbps', 'Bộ đĩa thìa decor riêng biệt', 'Chỗ đỗ ô tô và xe máy rộng rãi'],
        recommendedVisitTime: '10:30 – 11:30 sáng hoặc 16:30 – 18:00 chiều (Trước giờ cao điểm ăn uống)'
      }
    : isBeauty
    ? {
        bestLightingHours: '09:00 – 17:00 (Ánh sáng đèn vàng thư giãn, nến thơm lung linh và giếng trời xanh mát)',
        noiseLevel: 'Tuyệt đối yên tĩnh, chỉ có tiếng nhạc thiền êm dịu và tiếng nước róc rách chữa lành.',
        filmingSpots: [
          { name: 'Phòng ngâm bồn thảo mộc Pơ-mu', description: 'Hơi nước thảo mộc nghi ngút bên hoa sen tươi và ánh nến lung linh mờ ảo.' },
          { name: 'Giường trị liệu khăn lụa trắng', description: 'Góc máy macro quay cận cảnh thao tác bấm huyệt và làn da mịn màng.' },
          { name: 'Khu thưởng trà thảo dược đón khách', description: 'Bàn gỗ mộc, ấm trà nóng và bánh hạt sen thơm dịu, rất tao nhã.' }
        ],
        amenities: ['Phòng riêng tư để quay video', 'Bộ đồ lụa spa chuẩn bị sẵn', 'Phòng tắm và bàn trang điểm đầy đủ tiện nghi', 'Trà thảo mộc và mứt miễn phí'],
        recommendedVisitTime: '09:30 – 12:00 sáng các ngày trong tuần'
      }
    : isNightlife
    ? {
        bestLightingHours: '17:30 – 19:30 (Khung giờ hoàng hôn twilight) & 20:00 – 22:00 (Ánh đèn vàng ấm cinematic)',
        noiseLevel: 'Nhạc Jazz/Blues cổ điển hoặc đĩa than analog. Bartender sẵn sàng biểu diễn lắc bình shaker kim loại tạo âm thanh ASMR.',
        filmingSpots: [
          { name: 'Quầy Bar trung tâm', description: 'Tủ rượu gỗ sồi cao kịch trần phản chiếu ánh đèn vàng lấp lánh như phim điện ảnh.' },
          { name: 'Căn phòng bí mật sau cánh cửa sách', description: 'Điểm nhấn độc nhất vô nhị kích thích tính tò mò của người xem TikTok.' },
          { name: 'Bàn lounge nhung đỏ bên đĩa than', description: 'Vibe cổ điển retro thập niên 80s sang trọng và riêng tư.' }
        ],
        amenities: ['Hỗ trợ góc quay thiếu sáng không nhiễu', 'Cung cấp mocktail không cồn cho creator', 'Bảo vệ trông xe suốt đêm'],
        recommendedVisitTime: '18:00 – 20:00 (Giờ mở cửa sớm, không gian thoáng nhất để quay)'
      }
    : {
        bestLightingHours: '09:00 – 16:30 (Ánh sáng tự nhiên ban ngày ngập tràn)',
        noiseLevel: 'Âm thanh bàn xoay gốm, mùi đất mộc và tiếng cười vui vẻ, truyền cảm hứng tích cực.',
        filmingSpots: [
          { name: 'Khu vực bàn xoay gốm thủ công', description: 'Bắt trọn khoảnh khắc đôi tay vuốt đất sét biến hình mềm mại.' },
          { name: 'Kệ trưng bày sản phẩm gốm mộc', description: 'Các tác phẩm men rạn thô mộc dưới nắng sớm rực rỡ.' },
          { name: 'Góc decor sân vườn nhiệt đới', description: 'Không gian xanh mướt ngập tràn năng lượng sáng tạo.' }
        ],
        amenities: ['Tạp dề workshop sạch sẽ', 'Kệ phơi và lò nung tại chỗ', 'Wifi mạnh để quay phim/livestream', 'Hỗ trợ nguyên vật liệu thực hành'],
        recommendedVisitTime: '10:00 – 12:00 sáng hoặc 14:00 – 16:00 chiều'
      };

  // 2. Creator Perks & Hospitality
  const creatorPerks = isCafe
    ? {
        complimentaryMenu: 'Miễn phí toàn bộ 1 set đồ uống Signature + 1 bánh nướng nóng trong ngày cho Creator (Hạn mức 400.000₫)',
        plusOneAllowed: true,
        plusOnePerk: 'Miễn phí 1 ly cà phê hoặc nước hoa quả cho bạn đi cùng / quay phim',
        cashBudgetRange: '600.000₫ – 1.200.000₫ / video (Thanh toán qua Escrow CollabLocal)',
        welcomeContact: 'Quản lý ca hoặc Chủ quán trực tiếp đón & chuẩn bị món đẹp nhất để quay'
      }
    : isFood
    ? {
        complimentaryMenu: 'Miễn phí set ăn đầy đủ 3-4 món Signature dành cho 2 người (Hạn mức 850.000₫)',
        plusOneAllowed: true,
        plusOnePerk: 'Người đi cùng được thưởng thức trọn vẹn set ăn cùng Creator hoàn toàn miễn phí',
        cashBudgetRange: '800.000₫ – 1.800.000₫ / video (Thanh toán qua Escrow CollabLocal)',
        welcomeContact: 'Bếp trưởng hoặc Quản lý nhà hàng trực tiếp tiếp đón & chia sẻ câu chuyện món ăn'
      }
    : isBeauty
    ? {
        complimentaryMenu: 'Trải nghiệm miễn phí trọn gói Liệu trình Trị Liệu Cổ Vai Gáy Chuyên Sâu 75 phút (Trị giá 650.000₫)',
        plusOneAllowed: true,
        plusOnePerk: 'Người đi cùng được tặng dịch vụ ngâm chân thảo mộc & massage bấm huyệt 30 phút',
        cashBudgetRange: '700.000₫ – 1.500.000₫ / video (Thanh toán qua Escrow CollabLocal)',
        welcomeContact: 'Quản lý Spa đích thân tư vấn liệu trình và đồng hành trong buổi trải nghiệm'
      }
    : isNightlife
    ? {
        complimentaryMenu: 'Miễn phí 2 ly Cocktail Signature pha theo khẩu vị riêng + 1 phần Cold Cut / Phô mai tổng hợp (Trị giá 550.000₫)',
        plusOneAllowed: true,
        plusOnePerk: 'Người đi cùng được phục vụ 1 ly đồ uống Signature tương đương miễn phí',
        cashBudgetRange: '800.000₫ – 1.600.000₫ / video (Thanh toán qua Escrow CollabLocal)',
        welcomeContact: 'Head Bartender hoặc Chủ quán tiếp đón & trình diễn kỹ thuật pha chế'
      }
    : {
        complimentaryMenu: 'Trải nghiệm miễn phí trọn vẹn 1 buổi workshop tự làm sản phẩm mang về (Trị giá 450.000₫)',
        plusOneAllowed: true,
        plusOnePerk: 'Người đi cùng được hỗ trợ đầy đủ nguyên vật liệu để cùng trải nghiệm',
        cashBudgetRange: '600.000₫ – 1.300.000₫ / video (Thanh toán qua Escrow CollabLocal)',
        welcomeContact: 'Nghệ nhân / Quản lý Workshop hướng dẫn từng bước chi tiết'
      };

  // 3. Signature Items
  const signatureItems = isCafe
    ? [
        { id: `${b.id}-sig-1`, name: 'Matcha Cloud Foam Cold Brew', price: '65.000₫', isHero: true, highlight: 'Lớp bọt kem matcha bồng bềnh phủ trên cà phê ủ lạnh 24h, phân tầng tuyệt đẹp khi lên hình.', flavorNotes: 'Béo ngậy thơm mát, hậu vị thanh đắng socola' },
        { id: `${b.id}-sig-2`, name: 'Croissant Trứng Muối Nướng Giòn', price: '55.000₫', isHero: false, highlight: 'Vỏ ngàn lớp giòn rụm âm thanh ASMR cuốn hút, sốt hoàng kim tan chảy béo bùi.', flavorNotes: 'Bơ Pháp thơm ngát, mặn ngọt cân bằng' },
        { id: `${b.id}-sig-3`, name: 'Pour-Over Arabica Cầu Đất Tuyển Chọn', price: '85.000₫', isHero: false, highlight: 'Pha thủ công bằng phễu V60, nước cà phê trong vắt và hương thơm hoa quả tự nhiên.', flavorNotes: 'Hương hoa nhài, quả chín mọng và vị ngọt mật ong' }
      ]
    : isFood
    ? [
        { id: `${b.id}-sig-1`, name: 'Cá Hồi Nướng Sốt Chanh Leo Thảo Mộc', price: '245.000₫', isHero: true, highlight: 'Da giòn rụm, thịt cá giữ trọn độ ẩm hồng đào, sốt chanh leo chua thanh kích thích vị giác.', flavorNotes: 'Tươi ngọt, béo ngậy và thơm thảo mộc dịu nhẹ' },
        { id: `${b.id}-sig-2`, name: 'Bò Wagyu Nướng Đá Núi Lửa', price: '320.000₫', isHero: false, highlight: 'Bò vân mỡ cẩm thạch xèo xèo trên đá nham thạch nóng 300 độ ngay tại bàn.', flavorNotes: 'Thịt mềm tan như bơ, đậm đà hương thơm nướng mộc' },
        { id: `${b.id}-sig-3`, name: 'Set Cơm Trưa 5 Món Tinh Hoa Bắc Bộ', price: '165.000₫', isHero: false, highlight: 'Canh cua đồng mồng tơi, thịt ba chỉ rang cháy cạnh và cà pháo giòn tan chuẩn vị cơm mẹ nấu.', flavorNotes: 'Đậm đà thuần Việt, ấm lòng bữa trưa' }
      ]
    : isBeauty
    ? [
        { id: `${b.id}-sig-1`, name: 'Trị Liệu Cổ Vai Gáy Thảo Mộc Dao Đỏ', price: '450.000₫', isHero: true, highlight: 'Kết hợp ấn huyệt chuyên sâu và đắp gối chườm 36 vị thuốc quý giúp giải tỏa căng thẳng thần kinh.', flavorNotes: 'Mùi tinh dầu quế, hồi và thảo quả ấm nồng dễ chịu' },
        { id: `${b.id}-sig-2`, name: 'Massage Body Tinh Dầu Cam & Đá Nóng', price: '550.000₫', isHero: false, highlight: 'Đá bazan giữ nhiệt lâu giúp lưu thông khí huyết và thư giãn từng thớ cơ sâu.', flavorNotes: 'Mát lành hương cam ngọt, xua tan mệt mỏi tức thì' }
      ]
    : isNightlife
    ? [
        { id: `${b.id}-sig-1`, name: 'The Alchemist Autumn Negroni', price: '195.000₫', isHero: true, highlight: 'Pha chế cùng rượu ngâm vỏ cam sấy và khói quế hun trực tiếp trước mắt khách hàng.', flavorNotes: 'Đắng dịu thanh lịch, ấm áp hậu vị gỗ sồi' },
        { id: `${b.id}-sig-2`, name: 'Hanoi Twilight Floral Cocktail', price: '180.000₫', isHero: false, highlight: 'Màu tím hoàng hôn chuyển đổi kỳ ảo khi vắt chanh tươi, trang trí hoa khô hữu cơ.', flavorNotes: 'Chua ngọt dịu dàng, phảng phất hương hoa cúc' }
      ]
    : [
        { id: `${b.id}-sig-1`, name: 'Workshop Nặn Gốm Bàn Xoay Tự Do', price: '350.000₫', isHero: true, highlight: 'Tự tay nhào nặn chiếc cốc hoặc bình hoa độc bản mang dấu ấn cá nhân của riêng mình.', flavorNotes: 'Trải nghiệm xúc giác đất sét mộc mạc và thư thái' },
        { id: `${b.id}-sig-2`, name: 'Tự Đổ Nến Thơm Hoa Khô Hữu Cơ', price: '280.000₫', isHero: false, highlight: 'Phối trộn tinh dầu thiên nhiên và trang trí cánh hoa khô lên sáp đậu nành lành tính.', flavorNotes: 'Hương hoa oải hương và gỗ tuyết tùng an yên' }
      ];

  // 4. Brand Story & Target Audience
  const brandStory = isCafe
    ? {
        concept: 'Tối giản Nhật Bản mộc mạc kết hợp văn hóa cà phê Specialty phố cổ Hà Nội',
        philosophy: 'Tôn vinh hạt cà phê mộc nguyên bản và kiến tạo chốn dừng chân bình yên giữa lòng thủ đô',
        targetAudience: 'Giới trẻ văn phòng, người làm việc tự do (freelancer) và người yêu thích phong cách sống chữa lành',
        avgCustomerSpend: '55.000₫ – 95.000₫ / khách'
      }
    : isFood
    ? {
        concept: 'Bistro ẩm thực đương đại kết hợp tinh hoa gia vị Việt Nam',
        philosophy: 'Nâng tầm món ăn truyền thống với kỹ thuật nấu nướng hiện đại và nguyên liệu hữu cơ tươi mới mỗi ngày',
        targetAudience: 'Nhóm bạn trẻ tụ họp, gia đình ấm cúng và các buổi gặp gỡ đối tác lịch sự',
        avgCustomerSpend: '180.000₫ – 350.000₫ / khách'
      }
    : isBeauty
    ? {
        concept: 'Ốc đảo tĩnh lặng mang cảm hứng thảo mộc cổ truyền phương Đông',
        philosophy: 'Chăm sóc sức khỏe toàn diện từ thân đến tâm bằng 100% thảo mộc hữu cơ bản địa',
        targetAudience: 'Phụ nữ văn phòng, người chịu áp lực công việc và người có thói quen chăm sóc sức khỏe định kỳ',
        avgCustomerSpend: '350.000₫ – 800.000₫ / khách'
      }
    : isNightlife
    ? {
        concept: 'Quán bar Speakeasy bí ẩn mang cảm hứng kiến trúc Châu Âu cổ điển',
        philosophy: 'Mỗi ly đồ uống là một tác phẩm nghệ thuật chứa đựng câu chuyện cảm xúc riêng biệt',
        targetAudience: 'Giới trẻ có gu, dân công sở thư giãn sau giờ làm và các cặp đôi hẹn hò lãng mạn',
        avgCustomerSpend: '200.000₫ – 450.000₫ / khách'
      }
    : {
        concept: 'Không gian workshop thủ công bản địa khuyến khích sự sáng tạo cá nhân',
        philosophy: 'Chữa lành bằng hành động tự tay tạo nên những món đồ mộc mạc lưu giữ kỷ niệm',
        targetAudience: 'Các bạn trẻ yêu thích nghệ thuật, cặp đôi hẹn hò trải nghiệm và gia đình có con nhỏ',
        avgCustomerSpend: '250.000₫ – 450.000₫ / khách'
      };

  // 5. Creator Guidelines
  const creatorGuidelines = {
    contentTone: 'Chân thật, thoải mái và tôn trọng cảm nhận cá nhân của Creator. Quán hoàn toàn ủng hộ phong cách review riêng của kênh.',
    reviewTurnaroundHours: 24,
    dos: [
      'Gắn thẻ vị trí quán trên TikTok & Instagram để người xem dễ dàng tìm đường',
      'Nhắc mã ưu đãi độc quyền của Creator trong video và caption',
      'Tận dụng góc máy ánh sáng tự nhiên tại quán để hình ảnh món ăn lên màu đẹp nhất'
    ],
    donts: [
      'Tránh quay cận cảnh rõ mặt khách hàng khác đang ngồi dùng bữa',
      'Không dùng filter màu quá ảo làm biến đổi màu sắc thật của đồ ăn / không gian'
    ]
  };

  // 6. Past Collabs
  const pastCollabs = [
    {
      creatorName: '@linhfoodie',
      campaignTitle: 'Trải Nghiệm Món Signature & Không Gian Quán',
      platform: 'TikTok' as const,
      views: '78.5K',
      engagement: '6.4%',
      quote: 'Quán đón tiếp vô cùng chu đáo, đồ ăn ngon đúng như mô tả và thanh toán ký quỹ Escrow được duyệt rất nhanh!'
    },
    {
      creatorName: '@namreviews',
      campaignTitle: 'Khám Phá Góc Check-in Mới & Review Menu',
      platform: 'TikTok' as const,
      views: '54.2K',
      engagement: '5.8%',
      quote: 'Ánh sáng quán cực kỳ dễ quay, nhân viên hỗ trợ nhiệt tình. Fan của mình ghé quán đông vui lắm!'
    }
  ];

  // 7. Fan Offer
  const fanOffer = {
    codeTemplate: isCafe ? '[CREATOR]15' : isFood ? '[CREATOR]COMBO' : '[CREATOR]VIP',
    discount: isCafe ? 'Giảm 15% tổng hóa đơn đồ uống và bánh' : isFood ? 'Tặng 1 món tráng miệng Signature hoặc Giảm 10% bill' : 'Giảm 15% gói dịch vụ trải nghiệm',
    staffTrained: true
  };

  // 8. Operational Info
  const operationalInfo = {
    openingHours: isNightlife ? '18:00 – 01:30 sáng' : isFood ? '10:30 – 14:00 & 17:30 – 22:00' : '07:30 – 22:30 hàng ngày',
    parkingDetails: 'Có chỗ đỗ xe máy miễn phí trước quán có bảo vệ trông giữ; ô tô có bãi đỗ thuận tiện cách 40m',
    hotline: '0988 123 456 (Zalo hỗ trợ Creator)'
  };

  return {
    ...b,
    filmingConditions,
    creatorPerks,
    signatureItems,
    brandStory,
    creatorGuidelines,
    pastCollabs,
    fanOffer,
    operationalInfo
  };
};

export const INITIAL_BUSINESSES: Business[] = RAW_BUSINESSES.map(enrichBusiness);

const enrichCreator = (c: Creator): Creator => {
  const isFood = c.niche.includes('Ẩm Thực') || c.niche.includes('Food') || c.niche.includes('Cafe') || c.niche.includes('Bánh');
  const isBeauty = c.niche.includes('Làm Đẹp') || c.niche.includes('Beauty') || c.niche.includes('Spa') || c.niche.includes('Skincare');
  const isNightlife = c.niche.includes('Đêm') || c.niche.includes('Cocktail') || c.niche.includes('Bar') || c.niche.includes('Nightlife');
  const isFashion = c.niche.includes('Thời Trang') || c.niche.includes('Fashion') || c.niche.includes('Streetwear') || c.niche.includes('Lookbook');
  const isCraft = c.niche.includes('Thủ Công') || c.niche.includes('Gốm') || c.niche.includes('Workshop') || c.niche.includes('Nghệ Thuật');

  // 1. Content Capabilities
  let capabilities: Creator['capabilities'] = [];
  if (isFood) {
    capabilities = [
      {
        id: 'cap-1',
        name: 'Quay B-Roll 4K & Phối màu chuẩn ấm cúng',
        level: 'Chuyên gia (Level 5/5)',
        description: 'Bắt trọn dòng chảy pour-over, lớp bọt sữa matcha mịn màng, khói bốc nghi ngút và ánh sáng tự nhiên của quán.'
      },
      {
        id: 'cap-2',
        name: 'Kể chuyện Voiceover chân thành & truyền cảm',
        level: 'Chuyên gia (Level 5/5)',
        description: 'Giọng trầm ấm chuẩn Hà Nội, nhấn nhá cảm xúc, truyền tải câu chuyện sáng lập và nét độc bản của quán.'
      },
      {
        id: 'cap-3',
        name: 'Bày trí món ăn & Chụp ảnh tĩnh vật (Food Styling)',
        level: 'Xuất sắc (Level 4/5)',
        description: 'Bố cục flat-lay và góc xiên 45 độ nghệ thuật, tặng kèm quán 5 ảnh chụp độ nét cao để cập nhật Google Maps.'
      },
      {
        id: 'cap-4',
        name: 'Kỹ thuật Hook 3 giây đầu bắt trend viral',
        level: 'Xuất sắc (Level 4/5)',
        description: 'Tỷ lệ giữ chân người xem sau 3 giây đầu đạt trên 72%, kích thích tò mò muốn ghé quán ngay.'
      },
      {
        id: 'cap-5',
        name: 'Tự tin dẫn hình & Nói trước ống kính (On-camera)',
        level: 'Thành thạo (Level 4/5)',
        description: 'Phong thái tự nhiên, trang phục lịch sự hài hòa với không gian quán, mang lại cảm giác tin cậy cho khán giả.'
      },
      {
        id: 'cap-6',
        name: 'Kêu gọi hành động & Nhắc mã voucher tại quầy',
        level: 'Chuyên gia (Level 5/5)',
        description: 'Lồng ghép mã giảm giá tự nhiên vào video và caption, nhắc khách cách đọc mã với nhân viên thu ngân.'
      }
    ];
  } else if (isBeauty) {
    capabilities = [
      {
        id: 'cap-1',
        name: 'Review liệu trình Spa chuẩn khoa học & da liễu',
        level: 'Chuyên gia (Level 5/5)',
        description: 'Phân tích thành phần tinh dầu, công dụng từng bước massage thảo mộc và trải nghiệm thư giãn thực tế.'
      },
      {
        id: 'cap-2',
        name: 'Quay cận cảnh làn da & Thao tác trị liệu',
        level: 'Chuyên gia (Level 5/5)',
        description: 'Góc máy macro chi tiết không dùng filter ảo, tôn vinh kỹ thuật tay nghề của kỹ thuật viên tại spa.'
      },
      {
        id: 'cap-3',
        name: 'Phong cách video chữa lành, nhẹ nhàng (Healing)',
        level: 'Xuất sắc (Level 5/5)',
        description: 'Âm nhạc thiền định, nhịp cắt êm ái tạo cảm giác muốn đặt lịch nghỉ ngơi chăm sóc bản thân ngay.'
      },
      {
        id: 'cap-4',
        name: 'Điều hướng tệp khách hàng nữ giới có thu nhập tốt',
        level: 'Chuyên gia (Level 5/5)',
        description: '92% khán giả là phụ nữ 22-38 tuổi tại Hà Nội quan tâm đến sắc đẹp, sức khỏe và dịch vụ spa cao cấp.'
      }
    ];
  } else if (isNightlife) {
    capabilities = [
      {
        id: 'cap-1',
        name: 'Quay video ánh sáng yếu (Low-light) sắc nét',
        level: 'Chuyên gia (Level 5/5)',
        description: 'Sử dụng cảm biến Full-frame và lens khẩu lớn F1.4 bắt trọn ánh đèn vàng ấm, quầy bar và ly cocktail không bị nhiễu hạt.'
      },
      {
        id: 'cap-2',
        name: 'Kể câu chuyện về Bartender & Công thức Signature',
        level: 'Chuyên gia (Level 5/5)',
        description: 'Khai thác cảm hứng sáng tạo đồ uống, văn hóa thưởng thức rượu văn minh và phong cách âm nhạc của quán.'
      },
      {
        id: 'cap-3',
        name: 'Âm thanh ASMR đá lắc & rót rượu sống động',
        level: 'Xuất sắc (Level 5/5)',
        description: 'Âm thanh shaker kim loại, tiếng rót rượu và tiếng cụng ly giòn tan kích thích mọi giác quan.'
      },
      {
        id: 'cap-4',
        name: 'Điều hướng tệp khách hàng có gu & chi tiêu cao',
        level: 'Chuyên gia (Level 5/5)',
        description: 'Khán giả theo dõi là giới văn phòng, doanh nhân trẻ và người yêu thích cocktail chất lượng cao.'
      }
    ];
  } else {
    capabilities = [
      {
        id: 'cap-1',
        name: 'Quay B-Roll Cinematic & Bắt trọn không gian',
        level: 'Chuyên gia (Level 5/5)',
        description: 'Góc quay kiến trúc, chuyển động mượt mà tái hiện trọn vẹn phong cách và điểm độc bản của địa điểm.'
      },
      {
        id: 'cap-2',
        name: 'Nội dung Storytelling trải nghiệm thực tế',
        level: 'Xuất sắc (Level 5/5)',
        description: 'Kịch bản có cốt truyện rõ ràng, mở đầu cuốn hút, giữ chân người xem đến giây cuối cùng.'
      },
      {
        id: 'cap-3',
        name: 'Nhiếp ảnh sản phẩm & Không gian chất lượng cao',
        level: 'Xuất sắc (Level 4/5)',
        description: 'Cung cấp ảnh tĩnh chụp sắc nét để thương hiệu tận dụng truyền thông đa kênh.'
      },
      {
        id: 'cap-4',
        name: 'Đo lường chuyển đổi & Kêu gọi ghé thăm',
        level: 'Chuyên gia (Level 5/5)',
        description: 'Kêu gọi lưu địa chỉ, gắn link bản đồ và kích thích người xem đến trải nghiệm trực tiếp.'
      }
    ];
  }

  // 2. Production Equipment & Gear
  const equipment = [
    {
      category: 'Máy quay & Ống kính',
      items: isNightlife 
        ? ['Sony A7C II Full-frame 4K 60fps', 'Ống kính Sony FE 35mm F1.4 GM (chuyên trị thiếu sáng)', 'iPhone 15 Pro Max 4K ProRes']
        : ['iPhone 15 Pro Max quay 4K 60fps ProRes HDR', 'Ống kính góc rộng 13mm & Tele 120mm sắc nét', 'Sony Alpha chuyên dụng chụp ảnh không gian']
    },
    {
      category: 'Âm thanh & Thu âm',
      items: ['Bộ micro không dây DJI Mic 2 chống ồn lọc tạp âm quán', 'Đầu thu âm thanh nổi định hướng', 'Bộ chắn gió lọc tiếng ồn ngoài trời']
    },
    {
      category: 'Chống rung & Ánh sáng',
      items: ['Gimbal chống rung 3 trục DJI Osmo Mobile 6', 'Đèn LED di động Aputure Amaran MC chỉnh màu nhiệt độ K', 'Chân máy mini tàng hình Joby Gorillapod']
    },
    {
      category: 'Phần mềm hậu kỳ',
      items: ['CapCut Pro bản quyền (Keyframe, Speed ramping bắt beat)', 'Adobe Premiere Pro & DaVinci Resolve Studio', 'Preset chỉnh màu phim độc quyền']
    }
  ];

  // 3. Audience Demographics
  const audienceDemographics = {
    ageGroups: isBeauty
      ? [{ range: '18-24 tuổi', percent: 35 }, { range: '25-34 tuổi', percent: 52 }, { range: '35+ tuổi', percent: 13 }]
      : isNightlife
      ? [{ range: '18-24 tuổi', percent: 28 }, { range: '25-34 tuổi', percent: 58 }, { range: '35+ tuổi', percent: 14 }]
      : [{ range: '18-24 tuổi', percent: 48 }, { range: '25-34 tuổi', percent: 42 }, { range: '35+ tuổi', percent: 10 }],
    gender: isBeauty 
      ? { female: 88, male: 12 }
      : isNightlife
      ? { female: 48, male: 52 }
      : { female: 65, male: 35 },
    topLocations: [
      { city: 'Hà Nội (trọng tâm)', percent: 82 },
      { city: 'TP. Hồ Chí Minh', percent: 11 },
      { city: 'Các tỉnh lân cận (Hải Phòng, Bắc Ninh)', percent: 7 }
    ],
    purchasingHabits: isNightlife
      ? 'Khán giả có thu nhập khá và cao, thích giao lưu cuối tuần tại các quán bar yên tĩnh, mức chi tiêu trung bình 200.000₫ – 500.000₫/người.'
      : isBeauty
      ? 'Chị em văn phòng và phụ nữ trẻ có nhu cầu chăm sóc da định kỳ, mức chi tiêu 350.000₫ – 1.200.000₫/liệu trình spa.'
      : 'Khán giả trẻ trung, dân văn phòng và sinh viên tại các quận trung tâm Hà Nội. Thói quen đi cafe 2-4 lần/tuần, mức chi tiêu 60.000₫ – 160.000₫/buổi.'
  };

  // 4. Case Studies
  const baseRate = c.ratePerVideo || 700000;
  let caseStudies: Creator['caseStudies'] = [];
  if (isFood) {
    caseStudies = [
      {
        id: `${c.id}-cs-1`,
        brandName: 'Luna Coffee Roastery',
        campaignTitle: 'Ra Mắt Món Matcha Cloud & Thúc Đẩy Khách Ghé Thử Cold Brew',
        date: 'Tháng 8/2026',
        deliverables: '1 Video TikTok 55s + 3 Instagram Stories + Đánh giá Google Maps 5 sao',
        results: {
          views: '84.5K',
          saves: '4.8K',
          redemptions: 184,
          highlight: '+34% lượng order món Matcha Cloud trong 2 tuần đầu phát hành'
        },
        quote: '"Góc quay của creator rất tinh tế, khách ghé quán mang theo clip chỉ định đúng món để nhân viên phục vụ!"'
      },
      {
        id: `${c.id}-cs-2`,
        brandName: 'Nori Kitchen Fusion Bistro',
        campaignTitle: 'Chiến Dịch Khám Phá Set Cơm Trưa Công Sở Phong Cách Á Đương Đại',
        date: 'Tháng 7/2026',
        deliverables: '1 Video TikTok 60s + Bài viết đánh giá hình ảnh Instagram Grid',
        results: {
          views: '65.2K',
          saves: '3.6K',
          redemptions: 142,
          highlight: 'Kín bàn khung giờ trưa 11h30 - 13h30 trong suốt 14 ngày'
        },
        quote: '"Rất ấn tượng về tác phong quay phim, không gây phiền hà khách đang ngồi ăn mà thước phim vẫn đẹp lung linh."'
      }
    ];
  } else if (isBeauty) {
    caseStudies = [
      {
        id: `${c.id}-cs-1`,
        brandName: 'An Yên Spa & Wellness',
        campaignTitle: 'Trải Nghiệm Liệu Trình Trị Liệu Cổ Vai Gáy Thảo Mộc Tự Nhiên',
        date: 'Tháng 8/2026',
        deliverables: '1 Video TikTok 65s + 2 Reel Instagram + Check-in vị trí',
        results: {
          views: '78.2K',
          saves: '5.4K',
          redemptions: 126,
          highlight: 'Lấp đầy 95% lịch hẹn đặt trước trong khung giờ vàng thứ 7 & chủ nhật'
        },
        quote: '"Khách hàng xem video đều khen không gian spa thanh tịnh, nhiều khách đặt ngay liệu trình 10 buổi sau khi xem review."'
      }
    ];
  } else {
    caseStudies = [
      {
        id: `${c.id}-cs-1`,
        brandName: 'The Alchemist Bar & Speakeasy',
        campaignTitle: 'Khai Trương Menu Cocktail Mùa Thu & Khám Phá Không Gian Bí Mật',
        date: 'Tháng 8/2026',
        deliverables: '1 Video TikTok 50s + 1 Instagram Reel + Review chi tiết',
        results: {
          views: '54.0K',
          saves: '4.1K',
          redemptions: 108,
          highlight: '+28% lượng khách đặt bàn trước vào các tối cuối tuần'
        },
        quote: '"Creator am hiểu về hương vị cocktail, truyền tải đúng tinh thần bí ẩn của quán."'
      }
    ];
  }

  // 5. Packages
  const packages = [
    {
      id: `${c.id}-pkg-basic`,
      name: 'Gói Trải Nghiệm Cơ Bản',
      price: baseRate,
      priceDisplay: `${(baseRate / 1000).toLocaleString()}K VND`,
      turnaroundDays: 2,
      revisions: 1,
      features: [
        '1 Video ngắn TikTok / Reel chuẩn 4K dọc (45s - 60s)',
        'Kịch bản Voiceover và B-roll quay trực tiếp tại quán',
        'Lồng ghép mã ưu đãi độc quyền của quán trong video & caption',
        'Bàn giao video bản nháp trong vòng 48 giờ sau khi ghé quán',
        '1 lần chỉnh sửa miễn phí theo phản hồi của chủ quán'
      ],
      isRecommended: false
    },
    {
      id: `${c.id}-pkg-pro`,
      name: 'Gói Toàn Diện Kéo Khách (Best Value)',
      price: Math.round(baseRate * 1.55),
      priceDisplay: `${(Math.round(baseRate * 1.55) / 1000).toLocaleString()}K VND`,
      turnaroundDays: 3,
      revisions: 2,
      features: [
        '1 Video TikTok chính + 1 Instagram Reel đăng chéo kênh',
        'Tặng bộ 5 ảnh chụp tĩnh vật & không gian Decor độ phân giải cao',
        'Đăng 2 Instagram Stories check-in trực tiếp gắn link Google Maps',
        'Ghim mã ưu đãi độc quyền trên đầu trang cá nhân trong 30 ngày',
        'Cam kết đạt tối thiểu 20.000 lượt xem tự nhiên (bảo hành view)',
        '2 lần chỉnh sửa miễn phí trước khi xuất bản'
      ],
      isRecommended: true
    },
    {
      id: `${c.id}-pkg-omni`,
      name: 'Gói Đa Nền Tảng & Bản Quyền Quảng Cáo',
      price: Math.round(baseRate * 2.2),
      priceDisplay: `${(Math.round(baseRate * 2.2) / 1000).toLocaleString()}K VND`,
      turnaroundDays: 3,
      revisions: 3,
      features: [
        'Toàn bộ quyền lợi của Gói Toàn Diện Kéo Khách',
        'Quyền sử dụng video chạy quảng cáo TikTok Spark Ads / Meta trong 45 ngày',
        'Bài đánh giá có ảnh chụp 5 sao trên Google Maps của quán',
        'Xuất bản đồng thời trên cả TikTok và Instagram Reels giờ vàng',
        'Báo cáo hiệu suất chi tiết (lượt xem, thời lượng xem, số lượt lưu địa chỉ)'
      ],
      isRecommended: false
    }
  ];

  // 6. Collaboration Policies
  const policies = {
    advanceBookingDays: 2,
    exclusivityCommitment: isFood
      ? 'Cam kết không nhận review quán cafe/nhà hàng cùng phân khúc trong bán kính 1km trong vòng 14 ngày.'
      : isBeauty
      ? 'Cam kết không nhận liệu trình cùng dịch vụ với spa khác trong bán kính 2km trong vòng 21 ngày.'
      : 'Cam kết độc quyền ngành cùng địa bàn trong 14 ngày kể từ khi xuất bản video.',
    adUsageRights: 'Quán được toàn quyền sử dụng video đăng lại trên Fanpage/Instagram và chạy TikTok Spark Ads trong thời hạn hợp đồng.',
    cancellationNotice: 'Thông báo đổi lịch trước 24 giờ để sắp xếp lại buổi quay, hỗ trợ quay bù miễn phí nếu quán có việc đột xuất.'
  };

  // 7. Category Fits
  const categoryFits = isFood
    ? [
        { category: 'Quán Cafe Specialty & Trà Bánh', matchScore: 98, note: 'Rất phù hợp · Thế mạnh quay bọt sữa, pour-over và decor sống ảo' },
        { category: 'Nhà Hàng Bistro & Ẩm Thực Á', matchScore: 94, note: 'Phù hợp cao · Trải nghiệm món ăn, không gian ăn trưa/tối ấm cúng' },
        { category: 'Tiệm Bánh & Đồ Ngọt', matchScore: 92, note: 'Phù hợp cao · Bắt trọn khoảnh khắc cắt bánh, phô mai kéo sợi' },
        { category: 'Quán Bar & Lounge', matchScore: 82, note: 'Khá phù hợp · Phù hợp cho khung giờ trà chiều chuyển giao tối' }
      ]
    : isBeauty
    ? [
        { category: 'Spa Trị Liệu & Massage Thảo Mộc', matchScore: 99, note: 'Xuất sắc · Tệp khán giả nữ 22-35 tuổi quan tâm chăm sóc sức khỏe' },
        { category: 'Thẩm Mỹ Viện & Chăm Sóc Da', matchScore: 95, note: 'Rất phù hợp · Review chuẩn khoa học, tôn vinh kỹ thuật tay nghề' },
        { category: 'Nail & Mi Nghệ Thuật', matchScore: 90, note: 'Phù hợp cao · Góc máy macro sắc nét' },
        { category: 'Fitness & Pilates Studio', matchScore: 86, note: 'Phù hợp tốt · Tinh thần năng động, khỏe khoắn' }
      ]
    : isNightlife
    ? [
        { category: 'Speakeasy Bar & Cocktail', matchScore: 99, note: 'Chuyên biệt · Hiểu biết sâu về hương vị cocktail và vibe âm nhạc' },
        { category: 'Pub & Craft Beer', matchScore: 95, note: 'Rất phù hợp · Không khí gặp gỡ bạn bè sôi động' },
        { category: 'Nhà Hàng Fine Dining & Rượu Vang', matchScore: 92, note: 'Phù hợp cao · Tác phong lịch thiệp, tôn vinh món ăn đêm' },
        { category: 'Quán Cafe Đêm & Boardgame', matchScore: 88, note: 'Phù hợp tốt · Khám phá địa điểm chơi đêm văn minh' }
      ]
    : [
        { category: 'Workshop Thủ Công & Nghệ Thuật', matchScore: 96, note: 'Rất phù hợp · Truyền tải tinh thần sáng tạo và trải nghiệm cá nhân' },
        { category: 'Thời Trang Thiết Kế & Phụ Kiện', matchScore: 94, note: 'Phù hợp cao · Bắt trọn chi tiết đường may và form dáng' },
        { category: 'Quán Cafe Concept & Không Gian Sống Ảo', matchScore: 90, note: 'Phù hợp cao · Bố cục góc quay đẹp mắt' }
      ];

  const contentStyleTags = isFood
    ? ['#CinematicBroll', '#VoiceoverStory', '#CafeCheckin', '#ASMRFood', '#GocQuay4K', '#ChanThucKhongAo']
    : isBeauty
    ? ['#SpaHealing', '#SkincareReview', '#ChuaLanh', '#ThuGianCuoiTuan', '#QuayMacroSacNet']
    : isNightlife
    ? ['#CocktailStory', '#SpeakeasyHanoi', '#NightlifeVibes', '#ASMRDaLac', '#DiBarVanMinh']
    : ['#TraiNghiemThucTe', '#KhongGianDep', '#GocQuayDocBan', '#LifestyleHanoi'];

  const defaultThumbnails = isFood
    ? [
        '/src/assets/images/luna_coffee_interior_1790496155821.jpg',
        '/src/assets/images/nori_kitchen_food_1790496188394.jpg',
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=800&fit=crop&q=80'
      ]
    : isBeauty
    ? [
        '/src/assets/images/an_yen_spa_hanoi_1790497529692.jpg',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=800&fit=crop&q=80'
      ]
    : isNightlife
    ? [
        '/src/assets/images/the_alchemist_bar_1790497544022.jpg',
        'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&h=800&fit=crop&q=80'
      ]
    : isFashion
    ? [
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop&q=80'
      ]
    : [
        '/src/assets/images/moc_craft_workshop_1790496201352.jpg',
        'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=800&fit=crop&q=80'
      ];

  const enrichedPortfolio = (c.portfolio || []).map((item, idx) => ({
    ...item,
    thumbnailUrl: item.thumbnailUrl || defaultThumbnails[idx % defaultThumbnails.length],
    videoDuration: item.videoDuration || (idx === 0 ? '0:55' : idx === 1 ? '1:02' : '0:48'),
    savesCount: item.savesCount || `${Math.max(1.2, Math.floor(parseFloat(item.views || '40') * 0.09 * 10) / 10)}K`
  }));

  return {
    ...c,
    portfolio: enrichedPortfolio,
    capabilities,
    equipment,
    audienceDemographics,
    caseStudies,
    packages,
    policies,
    categoryFits,
    contentStyleTags,
    avgTurnaroundHours: 48
  };
};

const RAW_CREATORS: Creator[] = [
  {
    id: 'creator-linh',
    username: '@linhfoodie',
    name: 'Linh Nguyễn',
    avatar: '/src/assets/images/creator_linh_foodie_1790496173627.jpg',
    niche: 'Ẩm Thực & Đời Sống',
    location: 'Hoàn Kiếm, Hà Nội',
    distanceKm: 2.1,
    followers: 18200,
    followersDisplay: '18.2K',
    averageViews: 32000,
    averageViewsDisplay: '32K',
    engagementRate: 4.8,
    platforms: ['TikTok', 'Instagram'],
    ratePerVideo: 700000,
    rateDisplay: '700K VND / video',
    rating: 4.9,
    completionRate: 96,
    responseRate: 92,
    previousCollabsCount: 24,
    bio: 'Người khám phá ẩm thực chân thực tại Hà Nội. Chia sẻ trải nghiệm các quán cafe yên tĩnh, tiệm ăn ngon ngõ ngách và bữa brunch cuối tuần.',
    badges: ['Creator Đã Xác Thực', 'Chuyên Gia Ẩm Thực', 'Phản Hồi Nhanh'],
    lat: 21.0295,
    lng: 105.8512,
    aiReason: 'Gợi ý cho bạn: Cách 2.1 km · Đúng tệp Ẩm thực & Cafe · Khớp ngân sách 500K–1M · Tương tác TikTok 4.8% tệp 18-28 tuổi tại Hà Nội',
    portfolio: [
      {
        id: 'port-1',
        title: 'Thưởng thức Pour-Over thủ công tại phố cổ Tràng Tiền',
        views: '45.2K',
        engagement: '5.2%',
        platform: 'TikTok',
        caption: 'Tìm được chốn dừng chân bình yên giữa lòng phố cổ Hà Nội. Món cold brew hoa quả thơm nức ☕️'
      },
      {
        id: 'port-2',
        title: 'Top 5 quán cafe góc làm việc yên tĩnh ngập nắng ở Hà Nội',
        views: '82.4K',
        engagement: '6.8%',
        platform: 'TikTok',
        caption: 'Lưu lại ngay danh sách này cho buổi hẹn cuối tuần cùng bạn bè nhé!'
      }
    ],
    reviews: [
      {
        id: 'rev-c-1',
        authorName: 'Luna Coffee',
        authorRole: 'business',
        rating: 5,
        date: '2 tuần trước',
        comment: 'Creator làm việc cực kỳ chuyên nghiệp, nộp video trước hạn. Quán nhận được hơn 180 lượt khách ghé dùng mã ưu đãi!',
        criteria: [
          { label: 'Giao tiếp', score: 5 },
          { label: 'Chất lượng nội dung', score: 5 },
          { label: 'Chuyên nghiệp', score: 5 },
          { label: 'Đúng hạn', score: 5 }
        ]
      }
    ]
  },
  {
    id: 'creator-tra',
    username: '@tra.beauty',
    name: 'Trà My',
    avatar: '/src/assets/images/creator_tra_beauty_1790497556148.jpg',
    niche: 'Làm Đẹp & Chăm Sóc Da',
    location: 'Hoàn Kiếm, Hà Nội',
    distanceKm: 1.8,
    followers: 34000,
    followersDisplay: '34K',
    averageViews: 52000,
    averageViewsDisplay: '52K',
    engagementRate: 5.8,
    platforms: ['TikTok', 'Instagram'],
    ratePerVideo: 950000,
    rateDisplay: '950K VND / video',
    rating: 5.0,
    completionRate: 98,
    responseRate: 96,
    previousCollabsCount: 28,
    bio: 'Chuyên gia review skincare hữu cơ, quy trình chăm sóc da chuẩn khoa học và trải nghiệm spa thư giãn tại Hà Nội.',
    badges: ['Creator Đã Xác Thực', 'Chuyên Gia Làm Đẹp', 'Top Đánh Giá 5.0'],
    lat: 21.0280,
    lng: 105.8500,
    aiReason: 'Rất phù hợp cho spa & thẩm mỹ · 52K lượt xem trung bình · 98% khán giả nữ tại Hà Nội quan tâm chăm sóc sức khỏe',
    portfolio: [
      {
        id: 'port-tb-1',
        title: 'Một buổi chiều trị liệu cổ vai gáy thảo mộc phục hồi năng lượng',
        views: '61.5K',
        engagement: '6.4%',
        platform: 'TikTok',
        caption: 'Sau một tuần nhìn màn hình máy tính 10 tiếng mỗi ngày, đây là liệu trình cứu rỗi cơ thể ✨'
      }
    ],
    reviews: [
      {
        id: 'rev-ctb-1',
        authorName: 'An Yên Spa & Wellness',
        authorRole: 'business',
        rating: 5,
        date: '1 tuần trước',
        comment: 'Bạn quay góc máy rất thanh lịch, giọng thuyết minh truyền cảm. Lượng khách đặt lịch massage tăng vọt!',
        criteria: [
          { label: 'Giao tiếp', score: 5 },
          { label: 'Chất lượng nội dung', score: 5 },
          { label: 'Chuyên nghiệp', score: 5 },
          { label: 'Đúng hạn', score: 5 }
        ]
      }
    ]
  },
  {
    id: 'creator-viet',
    username: '@vietcocktail',
    name: 'Việt Anh',
    avatar: '/src/assets/images/creator_viet_night_1790497568611.jpg',
    niche: 'Đời Sống Ban Đêm & Cocktail',
    location: 'Hoàn Kiếm, Hà Nội',
    distanceKm: 1.5,
    followers: 15800,
    followersDisplay: '15.8K',
    averageViews: 38000,
    averageViewsDisplay: '38K',
    engagementRate: 6.4,
    platforms: ['TikTok', 'Instagram'],
    ratePerVideo: 800000,
    rateDisplay: '800K VND / video',
    rating: 4.9,
    completionRate: 95,
    responseRate: 94,
    previousCollabsCount: 19,
    bio: 'Kể những câu chuyện đằng sau ly cocktail và khám phá những quán bar ẩn mình có gu nhất thủ đô.',
    badges: ['Creator Đã Xác Thực', 'Cocktail & Nightlife', 'Tương Tác Cao (6.4%)'],
    lat: 21.0330,
    lng: 105.8490,
    aiReason: 'Chuyên biệt quán bar & lounge · Tệp khán giả trẻ có thu nhập tốt · Video ánh sáng tối xử lý cực kỳ nét',
    portfolio: [
      {
        id: 'port-vc-1',
        title: 'Khám phá quán speakeasy giấu sau cánh cửa tủ sách cổ',
        views: '49.0K',
        engagement: '7.1%',
        platform: 'TikTok',
        caption: 'Món cocktail khói thảo mộc khiến ai lần đầu thử cũng phải trầm trồ.'
      }
    ],
    reviews: [
      {
        id: 'rev-cvc-1',
        authorName: 'The Alchemist Lounge',
        authorRole: 'business',
        rating: 5,
        date: '1 tuần trước',
        comment: 'Kiến thức về đồ uống rất chắc chắn, quay phim tôn vinh được không gian mộc mạc của quán.',
        criteria: [
          { label: 'Giao tiếp', score: 5 },
          { label: 'Chất lượng nội dung', score: 5 },
          { label: 'Chuyên nghiệp', score: 5 },
          { label: 'Đúng hạn', score: 5 }
        ]
      }
    ]
  },
  {
    id: 'creator-budget',
    username: '@hanoieats.budget',
    name: 'Quang Huy',
    avatar: '/src/assets/images/creator_linh_foodie_1790496173627.jpg',
    niche: 'Ẩm Thực Bình Dân & Ngõ Ngách',
    location: 'Cầu Giấy, Hà Nội',
    distanceKm: 3.0,
    followers: 42000,
    followersDisplay: '42K',
    averageViews: 75000,
    averageViewsDisplay: '75K',
    engagementRate: 7.2,
    platforms: ['TikTok'],
    ratePerVideo: 600000,
    rateDisplay: '600K VND / video',
    rating: 4.8,
    completionRate: 100,
    responseRate: 98,
    previousCollabsCount: 35,
    bio: 'Cùng sinh viên càn quét đồ ăn ngon Hà Nội giá học sinh sinh viên. Review thật, khen chê rõ ràng, không nhận review ảo.',
    badges: ['Top Tương Tác (7.2%)', 'Hoàn Thành 100%', 'Viral Chắc Chắn'],
    lat: 21.0340,
    lng: 105.7950,
    aiReason: 'Lượng view khủng 75K/video · Giá hợp lý 600K · Rất thích hợp cho quán bánh mì, đồ ăn vặt và cafe trẻ',
    portfolio: [
      {
        id: 'port-hb-1',
        title: 'Hàng bánh mì patê truyền thống mở cửa từ 6h sáng hết veo trong 3 tiếng',
        views: '112.5K',
        engagement: '8.4%',
        platform: 'TikTok',
        caption: 'Chiếc bánh mì 25K ngập patê béo ngậy giữa lòng thủ đô!'
      }
    ],
    reviews: [
      {
        id: 'rev-chb-1',
        authorName: 'Bánh Mì & Cốm Xưa',
        authorRole: 'business',
        rating: 4.9,
        date: '2 tuần trước',
        comment: 'Huy rất lễ phép, quay tự nhiên, lượng khách trẻ đổ về quán sau video cực kỳ đông!',
        criteria: [
          { label: 'Giao tiếp', score: 5 },
          { label: 'Chất lượng nội dung', score: 5 },
          { label: 'Chuyên nghiệp', score: 4.8 },
          { label: 'Đúng hạn', score: 5 }
        ]
      }
    ]
  },
  {
    id: 'creator-minh',
    username: '@minhtravels',
    name: 'Minh Trần',
    avatar: '/src/assets/images/creator_viet_night_1790497568611.jpg',
    niche: 'Du Lịch & Phong Cách Sống',
    location: 'Tây Hồ, Hà Nội',
    distanceKm: 3.5,
    followers: 25000,
    followersDisplay: '25K',
    averageViews: 41000,
    averageViewsDisplay: '41K',
    engagementRate: 5.1,
    platforms: ['TikTok', 'Instagram'],
    ratePerVideo: 900000,
    rateDisplay: '900K VND / video',
    rating: 4.8,
    completionRate: 98,
    responseRate: 95,
    previousCollabsCount: 32,
    bio: 'Kể chuyện qua những thước phim điện ảnh chậm rãi tại miền Bắc. Chuyên về workshop trải nghiệm, villa nghỉ dưỡng và sống chậm.',
    badges: ['Creator Đã Xác Thực', 'Thước Phim Điện Ảnh', 'Tỉ Lệ Giữ Chân Cao'],
    lat: 21.0585,
    lng: 105.8290,
    aiReason: 'Rất hợp cho workshop, trải nghiệm & villa nghỉ dưỡng · 41K view trung bình · Máy quay 4K và góc quay nghệ thuật',
    portfolio: [
      {
        id: 'port-m1',
        title: 'Tự tay nặn chiếc cốc gốm đầu tiên bên bờ Hồ Tây',
        views: '64.1K',
        engagement: '5.8%',
        platform: 'TikTok',
        caption: 'Liệu trình chữa lành: chậm rãi xoay đất sét trong chiều thu gió lộng.'
      }
    ],
    reviews: [
      {
        id: 'rev-cm-1',
        authorName: 'Mộc Workshop',
        authorRole: 'business',
        rating: 4.8,
        date: '3 tuần trước',
        comment: 'Màu phim xuất sắc, giúp xưởng kín lịch các lớp học gốm trong tháng 10.',
        criteria: [
          { label: 'Giao tiếp', score: 4.8 },
          { label: 'Chất lượng nội dung', score: 5 },
          { label: 'Chuyên nghiệp', score: 4.8 },
          { label: 'Đúng hạn', score: 4.9 }
        ]
      }
    ]
  },
  {
    id: 'creator-chau',
    username: '@chau.wellness',
    name: 'Bảo Châu',
    avatar: '/src/assets/images/creator_tra_beauty_1790497556148.jpg',
    niche: 'Yoga & Lối Sống Lành Mạnh',
    location: 'Tây Hồ, Hà Nội',
    distanceKm: 4.0,
    followers: 19500,
    followersDisplay: '19.5K',
    averageViews: 29000,
    averageViewsDisplay: '29K',
    engagementRate: 5.0,
    platforms: ['Instagram', 'TikTok'],
    ratePerVideo: 700000,
    rateDisplay: '700K VND / video',
    rating: 4.9,
    completionRate: 97,
    responseRate: 95,
    previousCollabsCount: 22,
    bio: 'HLV Yoga và người lan tỏa lối sống cân bằng, ăn uống thuận tự nhiên và những địa điểm nghỉ dưỡng xanh tại Hà Nội.',
    badges: ['Creator Đã Xác Thực', 'Wellness & Sức Khỏe', 'Khán Giả Trung Thành'],
    lat: 21.0650,
    lng: 105.8240,
    aiReason: 'Phù hợp các không gian xanh, villa nghỉ dưỡng và thực phẩm sạch lành mạnh',
    portfolio: [
      {
        id: 'port-cw-1',
        title: 'Buổi sáng thức giấc đón bình minh tại villa ven hồ',
        views: '38.2K',
        engagement: '5.4%',
        platform: 'Instagram',
        caption: 'Bắt đầu ngày mới bằng bài tập thở và một tách trà nóng bình yên.'
      }
    ],
    reviews: [
      {
        id: 'rev-ccw-1',
        authorName: 'Maison De Tay Ho',
        authorRole: 'business',
        rating: 5,
        date: '1 tháng trước',
        comment: 'Châu có lối sống và năng lượng rất tích cực. Video truyền tải đúng tinh thần nghỉ dưỡng của villa.',
        criteria: [
          { label: 'Giao tiếp', score: 5 },
          { label: 'Chất lượng nội dung', score: 5 },
          { label: 'Chuyên nghiệp', score: 5 },
          { label: 'Đúng hạn', score: 5 }
        ]
      }
    ]
  },
  {
    id: 'creator-anna',
    username: '@anna.style',
    name: 'Anna Lê',
    avatar: '/src/assets/images/creator_tra_beauty_1790497556148.jpg',
    niche: 'Thời Trang & Phối Đồ',
    location: 'Đống Đa, Hà Nội',
    distanceKm: 4.0,
    followers: 12500,
    followersDisplay: '12.5K',
    averageViews: 28000,
    averageViewsDisplay: '28K',
    engagementRate: 6.2,
    platforms: ['Instagram', 'TikTok'],
    ratePerVideo: 800000,
    rateDisplay: '800K VND / reel',
    rating: 4.9,
    completionRate: 94,
    responseRate: 90,
    previousCollabsCount: 16,
    bio: 'Lookbook thời trang đường phố, gợi ý phối đồ capsule wardrobe tối giản cho các bạn trẻ và nhân viên văn phòng.',
    badges: ['Creator Đã Xác Thực', 'Tương Tác Cao (6.2%)', 'Gu Thời Trang Đỉnh'],
    lat: 21.0115,
    lng: 105.8310,
    aiReason: 'Tương tác cao 6.2% · Khán giả Gen-Z mê thời trang thiết kế · Kỹ năng phối đồ và tạo dáng tự nhiên',
    portfolio: [
      {
        id: 'port-a1',
        title: 'Gợi ý 4 outfit ấm áp mùa thu Hà Nội dạo phố 🍂',
        views: '52.3K',
        engagement: '7.1%',
        platform: 'TikTok',
        caption: 'Phối các thiết kế local brand Việt Nam cho những ngày se lạnh.'
      }
    ],
    reviews: [
      {
        id: 'rev-ca-1',
        authorName: 'Urban Thread',
        authorRole: 'business',
        rating: 4.9,
        date: '2 tuần trước',
        comment: 'Anna có gu thẩm mỹ rất tốt. Chiếc reel phối áo khoác nhung của bạn đã kéo về nhiều đơn đặt hàng tức thì.',
        criteria: [
          { label: 'Giao tiếp', score: 5 },
          { label: 'Chất lượng nội dung', score: 5 },
          { label: 'Chuyên nghiệp', score: 4.8 },
          { label: 'Đúng hạn', score: 5 }
        ]
      }
    ]
  },
  {
    id: 'creator-nam',
    username: '@namreviews',
    name: 'Nam Trần',
    avatar: '/src/assets/images/creator_viet_night_1790497568611.jpg',
    niche: 'Ẩm Thực Đường Phố',
    location: 'Hai Bà Trưng, Hà Nội',
    distanceKm: 2.8,
    followers: 8700,
    followersDisplay: '8.7K',
    averageViews: 21000,
    averageViewsDisplay: '21K',
    engagementRate: 4.9,
    platforms: ['TikTok'],
    ratePerVideo: 500000,
    rateDisplay: '500K VND / video',
    rating: 4.7,
    completionRate: 100,
    responseRate: 96,
    previousCollabsCount: 12,
    bio: 'Micro-influencer khám phá các ngõ ngách ăn vặt, quán cafe gia đình ấm cúng tại Hà Nội. Cam kết 100% cảm nhận thực tế.',
    badges: ['Creator Uy Tín', 'Đúng Hạn 100%', 'Bàn Giao Nhanh'],
    lat: 21.0080,
    lng: 105.8540,
    aiReason: 'Chi phí cực kỳ tối ưu 500K · Cam kết nộp video trong 48h · Tệp người xem địa phương Hà Nội',
    portfolio: [
      {
        id: 'port-n1',
        title: 'Review quán cà phê trứng 40 năm tuổi sâu trong con ngõ phố cổ',
        views: '24.5K',
        engagement: '5.0%',
        platform: 'TikTok',
        caption: 'Hương vị cà phê trứng béo ngậy vẫn giữ trọn vẹn theo năm tháng.'
      }
    ],
    reviews: [
      {
        id: 'rev-cn-1',
        authorName: 'Luna Coffee',
        authorRole: 'business',
        rating: 4.7,
        date: '1 tháng trước',
        comment: 'Tác phong làm việc nhanh gọn, nộp bản nháp chỉ sau 48h không cần chỉnh sửa gì thêm.',
        criteria: [
          { label: 'Giao tiếp', score: 4.8 },
          { label: 'Chất lượng nội dung', score: 4.6 },
          { label: 'Chuyên nghiệp', score: 4.8 },
          { label: 'Đúng hạn', score: 5 }
        ]
      }
    ]
  },
  {
    id: 'creator-huyen',
    username: '@huyen.pilates',
    name: 'Nguyễn Thu Huyền',
    avatar: '/src/assets/images/creator_tra_beauty_1790497556148.jpg',
    niche: 'Pilates, Thể Thao & Sống Khỏe',
    location: 'Ba Đình, Hà Nội',
    distanceKm: 2.5,
    followers: 22500,
    followersDisplay: '22.5K',
    averageViews: 35000,
    averageViewsDisplay: '35K',
    engagementRate: 5.6,
    platforms: ['TikTok', 'Instagram'],
    ratePerVideo: 800000,
    rateDisplay: '800K VND / video',
    rating: 4.9,
    completionRate: 98,
    responseRate: 95,
    previousCollabsCount: 20,
    bio: 'HLV Pilates Reformer quốc tế. Chia sẻ bài tập chỉnh dáng, giảm đau lưng dân văn phòng và thói quen ăn uống lành mạnh.',
    badges: ['Creator Đã Xác Thực', 'Fitness Chuyên Nghiệp', 'Tương Tác Nữ 85%'],
    lat: 21.0315,
    lng: 105.8235,
    aiReason: 'Rất phù hợp phòng tập gym/pilates · Tệp khán giả nữ văn phòng thu nhập cao tại Ba Đình & Hoàn Kiếm',
    portfolio: [
      {
        id: 'port-h-1',
        title: '3 bài tập Pilates máy Reformer giúp thẳng lưng và thon gọn eo',
        views: '48.9K',
        engagement: '6.1%',
        platform: 'TikTok',
        caption: 'Dành cho hội chị em ngồi làm việc văn phòng suốt 8 tiếng mỗi ngày!'
      }
    ],
    reviews: [
      {
        id: 'rev-h-1',
        authorName: 'Zenith Reformer Pilates',
        authorRole: 'business',
        rating: 5,
        date: '1 tuần trước',
        comment: 'Huyền hướng dẫn động tác rất chuẩn, góc máy đẹp và lôi cuốn người xem.',
        criteria: [
          { label: 'Giao tiếp', score: 5 },
          { label: 'Chất lượng nội dung', score: 5 },
          { label: 'Chuyên nghiệp', score: 5 },
          { label: 'Đúng hạn', score: 5 }
        ]
      }
    ]
  },
  {
    id: 'creator-duong',
    username: '@duongtech.hanoi',
    name: 'Dương Nguyễn',
    avatar: '/src/assets/images/creator_viet_night_1790497568611.jpg',
    niche: 'Công Nghệ & Không Gian Làm Việc',
    location: 'Cầu Giấy, Hà Nội',
    distanceKm: 4.5,
    followers: 45000,
    followersDisplay: '45K',
    averageViews: 62000,
    averageViewsDisplay: '62K',
    engagementRate: 6.1,
    platforms: ['TikTok', 'Instagram'],
    ratePerVideo: 900000,
    rateDisplay: '900K VND / video',
    rating: 4.9,
    completionRate: 100,
    responseRate: 97,
    previousCollabsCount: 29,
    bio: 'Review các quán cafe wifi mạnh làm việc cả ngày, thiết bị công nghệ văn phòng và workshop sáng tạo độc lạ tại Hà Nội.',
    badges: ['Top Tech Reviewer', 'View Khủng 62K', 'Đúng Hạn 100%'],
    lat: 21.0325,
    lng: 105.7860,
    aiReason: 'Lượng view cao 62K/video · Tệp dân công nghệ & văn phòng chi tiêu tốt ở Cầu Giấy và Ba Đình',
    portfolio: [
      {
        id: 'port-d-1',
        title: 'Quán cafe có ổ điện từng bàn và wifi 300Mbps cho dân lập trình',
        views: '78.4K',
        engagement: '6.9%',
        platform: 'TikTok',
        caption: 'Chốn làm việc lý tưởng cho các buổi deadline thâu đêm.'
      }
    ],
    reviews: [
      {
        id: 'rev-d-1',
        authorName: 'The Scent Lab Vietnam',
        authorRole: 'business',
        rating: 5,
        date: '2 tuần trước',
        comment: 'Bạn dựng video rất hiện đại, âm thanh thu cực kỳ trong trẻo.',
        criteria: [
          { label: 'Giao tiếp', score: 5 },
          { label: 'Chất lượng nội dung', score: 5 },
          { label: 'Chuyên nghiệp', score: 5 },
          { label: 'Đúng hạn', score: 5 }
        ]
      }
    ]
  },
  {
    id: 'creator-phuong',
    username: '@phuong.artlife',
    name: 'Phương Đỗ',
    avatar: '/src/assets/images/creator_linh_foodie_1790496173627.jpg',
    niche: 'Hội Họa, Thủ Công & Triển Lãm',
    location: 'Hoàn Kiếm, Hà Nội',
    distanceKm: 1.4,
    followers: 18200,
    followersDisplay: '18.2K',
    averageViews: 26000,
    averageViewsDisplay: '26K',
    engagementRate: 5.9,
    platforms: ['Instagram', 'TikTok'],
    ratePerVideo: 650000,
    rateDisplay: '650K VND / video',
    rating: 4.9,
    completionRate: 97,
    responseRate: 94,
    previousCollabsCount: 18,
    bio: 'Cùng mình dạo quanh các triển lãm nghệ thuật, workshop làm nến thơm, cắm hoa và không gian sáng tạo tinh tế ở Hà Nội.',
    badges: ['Creator Nghệ Thuật', 'Thẩm Mỹ Tinh Tế', 'Tương Tác Cao'],
    lat: 21.0290,
    lng: 105.8505,
    aiReason: 'Gu thẩm mỹ cao · Rất hợp workshop cắm hoa, nến thơm, gốm và tranh vẽ',
    portfolio: [
      {
        id: 'port-p-1',
        title: 'Một buổi sáng tự tay đổ nến thơm hoa khô thơm ngát',
        views: '36.5K',
        engagement: '6.2%',
        platform: 'TikTok',
        caption: 'Cảm giác nhìn sáp nến đông lại và mùi tinh dầu cam ngọt lan tỏa thật dễ chịu 🕯'
      }
    ],
    reviews: [
      {
        id: 'rev-p-1',
        authorName: "Tiệm Hoa & Nến Thơm L'Amour",
        authorRole: 'business',
        rating: 5,
        date: '2 tuần trước',
        comment: 'Phương bắt góc máy rất thơ mộng. Video mang lại lượng đăng ký workshop kỷ lục.',
        criteria: [
          { label: 'Giao tiếp', score: 5 },
          { label: 'Chất lượng nội dung', score: 5 },
          { label: 'Chuyên nghiệp', score: 5 },
          { label: 'Đúng hạn', score: 5 }
        ]
      }
    ]
  },
  {
    id: 'creator-hoanganh',
    username: '@hoanganh.ootd',
    name: 'Hoàng Anh',
    avatar: '/src/assets/images/creator_viet_night_1790497568611.jpg',
    niche: 'Thời Trang Nam & Vintage Thrift',
    location: 'Hai Bà Trưng, Hà Nội',
    distanceKm: 2.9,
    followers: 31000,
    followersDisplay: '31K',
    averageViews: 44000,
    averageViewsDisplay: '44K',
    engagementRate: 6.5,
    platforms: ['TikTok', 'Instagram'],
    ratePerVideo: 850000,
    rateDisplay: '850K VND / video',
    rating: 4.8,
    completionRate: 96,
    responseRate: 93,
    previousCollabsCount: 23,
    bio: 'Phối đồ nam thanh lịch từ streetwear đến phong cách cổ điển retro. Gợi ý tiệm quần áo thiết kế Việt Nam chất lượng.',
    badges: ['Thời Trang Nam', 'Tương Tác 6.5%', 'Creator Xác Thực'],
    lat: 21.0120,
    lng: 105.8520,
    aiReason: 'Tỷ lệ tương tác cao 6.5% · Thích hợp nhãn hàng thời trang thiết kế và phụ kiện da cao cấp',
    portfolio: [
      {
        id: 'port-ha-1',
        title: 'Thử phối 3 chiếc áo khoác da vintage dạo phố Hà Nội mùa đông',
        views: '58.0K',
        engagement: '7.0%',
        platform: 'TikTok',
        caption: 'Bí quyết chọn đồ da bền đẹp theo năm tháng.'
      }
    ],
    reviews: [
      {
        id: 'rev-ha-1',
        authorName: 'Urban Thread',
        authorRole: 'business',
        rating: 4.8,
        date: '1 tháng trước',
        comment: 'Người mẫu ảnh xuất sắc, lên đồ rất tôn dáng và cuốn hút.',
        criteria: [
          { label: 'Giao tiếp', score: 5 },
          { label: 'Chất lượng nội dung', score: 4.8 },
          { label: 'Chuyên nghiệp', score: 5 },
          { label: 'Đúng hạn', score: 5 }
        ]
      }
    ]
  },
  {
    id: 'creator-cafehop',
    username: '@hanoicafe.hop',
    name: 'Hà My',
    avatar: '/src/assets/images/creator_tra_beauty_1790497556148.jpg',
    niche: 'Cafe Hopping & Check-in Đẹp',
    location: 'Cầu Giấy, Hà Nội',
    distanceKm: 4.2,
    followers: 58000,
    followersDisplay: '58K',
    averageViews: 82000,
    averageViewsDisplay: '82K',
    engagementRate: 7.4,
    platforms: ['TikTok', 'Instagram'],
    ratePerVideo: 950000,
    rateDisplay: '950K VND / video',
    rating: 5.0,
    completionRate: 100,
    responseRate: 98,
    previousCollabsCount: 42,
    bio: 'Cô gái đi săn tất cả các quán cafe mới mở, góc check-in sống ảo triệu like và món matcha ngon nhất Hà Nội.',
    badges: ['Top Cafe Reviewer', 'View Khủng 82K', '5.0 Tuyệt Đối'],
    lat: 21.0330,
    lng: 105.7910,
    aiReason: 'Lượng view cao nhất 82K · Tương tác cực khủng 7.4% · Chuyên gia đẩy quán cafe lên xu hướng',
    portfolio: [
      {
        id: 'port-cm-1',
        title: 'Quán cafe tone trắng phong cách Nhật mới toanh ở Cầu Giấy',
        views: '124.0K',
        engagement: '8.8%',
        platform: 'TikTok',
        caption: 'Góc sân rợp bóng cây xanh và món bánh sừng bò nướng giòn rụm!'
      }
    ],
    reviews: [
      {
        id: 'rev-cm-1',
        authorName: 'Kohi Matcha & Artisan Bakery',
        authorRole: 'business',
        rating: 5,
        date: '1 tuần trước',
        comment: 'Video của My lên thẳng xu hướng TikTok với hơn 100K view, quán quá tải đơn hàng!',
        criteria: [
          { label: 'Giao tiếp', score: 5 },
          { label: 'Chất lượng nội dung', score: 5 },
          { label: 'Chuyên nghiệp', score: 5 },
          { label: 'Đúng hạn', score: 5 }
        ]
      }
    ]
  },
  {
    id: 'creator-bepvlog',
    username: '@bepvlog.linh',
    name: 'Thùy Linh',
    avatar: '/src/assets/images/creator_linh_foodie_1790496173627.jpg',
    niche: 'Nấu Ăn & Hương Vị Cơm Nhà',
    location: 'Đống Đa, Hà Nội',
    distanceKm: 3.4,
    followers: 72000,
    followersDisplay: '72K',
    averageViews: 105000,
    averageViewsDisplay: '105K',
    engagementRate: 6.8,
    platforms: ['TikTok', 'Instagram'],
    ratePerVideo: 1100000,
    rateDisplay: '1.1M VND / video',
    rating: 4.9,
    completionRate: 98,
    responseRate: 96,
    previousCollabsCount: 39,
    bio: 'Kênh vlog nấu ăn gia đình và tôn vinh các món ngon thuần Việt. Nói không với review thổi phồng.',
    badges: ['Top Food Vlogger', 'View 100K+', 'Tỉ Lệ Tin Cậy Cao'],
    lat: 21.0205,
    lng: 105.8230,
    aiReason: 'Độ tin cậy tuyệt đối · 105K view trung bình · Lượng khách gia đình và dân văn phòng cực lớn',
    portfolio: [
      {
        id: 'port-bv-1',
        title: 'Mâm cơm Bắc Bộ ngày mưa: canh cua đồng mồng tơi và thịt kho trám',
        views: '165.0K',
        engagement: '7.8%',
        platform: 'TikTok',
        caption: 'Hương vị tuổi thơ không bao giờ phai mờ.'
      }
    ],
    reviews: [
      {
        id: 'rev-bv-1',
        authorName: 'Bếp Mẹ Mây - Cơm Nhà Miền Bắc',
        authorRole: 'business',
        rating: 5,
        date: '5 ngày trước',
        comment: 'Giọng đọc mộc mạc và chân thành. Khách hàng tới quán khen nức nở.',
        criteria: [
          { label: 'Giao tiếp', score: 5 },
          { label: 'Chất lượng nội dung', score: 5 },
          { label: 'Chuyên nghiệp', score: 5 },
          { label: 'Đúng hạn', score: 5 }
        ]
      }
    ]
  },
  {
    id: 'creator-tuanphoto',
    username: '@tuan.photo',
    name: 'Tuấn Vũ',
    avatar: '/src/assets/images/creator_viet_night_1790497568611.jpg',
    niche: 'Nhiếp Ảnh Phố Phường & Điện Ảnh',
    location: 'Hoàn Kiếm, Hà Nội',
    distanceKm: 1.3,
    followers: 28500,
    followersDisplay: '28.5K',
    averageViews: 46000,
    averageViewsDisplay: '46K',
    engagementRate: 5.7,
    platforms: ['Instagram', 'TikTok'],
    ratePerVideo: 750000,
    rateDisplay: '750K VND / video',
    rating: 4.8,
    completionRate: 100,
    responseRate: 95,
    previousCollabsCount: 25,
    bio: 'Lưu giữ những lát cắt bình yên của Hà Nội bằng máy ảnh phim và góc quay điện ảnh retro.',
    badges: ['Nhiếp Ảnh Gia', 'Màu Phim Điện Ảnh', 'Đúng Hạn 100%'],
    lat: 21.0310,
    lng: 105.8475,
    aiReason: 'Màu phim retro điện ảnh xuất sắc · Rất hợp quán bar, cafe đĩa than và không gian nghệ thuật',
    portfolio: [
      {
        id: 'port-tp-1',
        title: 'Hà Nội trong một chiều thu tĩnh lặng qua lăng kính máy phim',
        views: '62.0K',
        engagement: '6.5%',
        platform: 'TikTok',
        caption: 'Tiếng còi tàu và tiếng đĩa than xước nhẹ giữa phố cổ.'
      }
    ],
    reviews: [
      {
        id: 'rev-tp-1',
        authorName: 'Vintage Haven Record Bar',
        authorRole: 'business',
        rating: 4.9,
        date: '2 tuần trước',
        comment: 'Tuấn chụp ảnh và dựng video có chiều sâu nghệ thuật đáng kinh ngạc.',
        criteria: [
          { label: 'Giao tiếp', score: 5 },
          { label: 'Chất lượng nội dung', score: 5 },
          { label: 'Chuyên nghiệp', score: 4.9 },
          { label: 'Đúng hạn', score: 5 }
        ]
      }
    ]
  }
];

export const INITIAL_CREATORS: Creator[] = RAW_CREATORS.map(enrichCreator);

export const INITIAL_CAMPAIGNS: Campaign[] = ALL_RAW_CAMPAIGNS;

export const INITIAL_MATCHES: CollaborationMatch[] = [
  {
    id: 'match-demo-luna',
    businessId: 'biz-luna',
    creatorId: 'creator-linh',
    campaignId: 'camp-luna-launch',
    status: 'matched',
    createdAt: '2026-09-26T14:30:00Z',
    offers: [
      {
        id: 'off-1',
        sender: 'business',
        senderName: 'Luna Coffee',
        amount: 600000,
        perks: 'Tặng kèm set nếm thử cà phê pour-over + bánh ngọt tự chọn',
        note: 'Chào Linh! Bên mình rất thích phong cách review tự nhiên của bạn. Bên mình đề xuất thù lao 600K cho 1 video TikTok + 1 Story giới thiệu không gian mới nhé.',
        timestamp: 'Hôm qua, 14:35',
        status: 'countered'
      },
      {
        id: 'off-2',
        sender: 'creator',
        senderName: '@linhfoodie',
        amount: 700000,
        perks: 'Tặng thêm khung hỏi đáp Q&A trên Instagram Story để tăng tương tác',
        note: 'Cảm ơn Luna Coffee đã quan tâm đến kênh của mình! Thù lao tiêu chuẩn cho 1 video review độc quyền có chỉnh màu sắc nét của mình là 700K VND. Quán xem xét mức này nhé.',
        timestamp: 'Hôm qua, 16:10',
        status: 'countered'
      },
      {
        id: 'off-3',
        sender: 'business',
        senderName: 'Luna Coffee',
        amount: 650000,
        perks: '650K VND tiền mặt + Miễn phí toàn bộ đồ uống & bánh cho Linh và 1 bạn đi cùng trong buổi quay',
        note: 'Luna Coffee gửi đề xuất mức 650K VND tiền mặt + miễn phí mọi thức uống signature cho 2 người trong buổi ghi hình nhé. Rất mong được hợp tác cùng bạn!',
        timestamp: 'Hôm nay, 09:15',
        status: 'pending'
      }
    ],
    agreedAmount: undefined,
    agreedPerks: undefined,
    booking: undefined,
    submission: undefined,
    payment: undefined,
    promoCode: 'LINH10',
    promoCodeUses: 186,
    chatMessages: [
      {
        id: 'msg-1',
        senderId: 'biz-luna',
        senderRole: 'business',
        text: 'Xin chào Linh! Rất vui được kết nối với bạn trong chiến dịch khai trương chi nhánh Tràng Tiền của Luna Coffee.',
        timestamp: 'Hôm qua, 14:32'
      },
      {
        id: 'msg-2',
        senderId: 'creator-linh',
        senderRole: 'creator',
        text: 'Chào Luna Coffee! Mình đã xem qua không gian bên quán rồi, thiết kế gỗ phong cách tối giản rất đẹp mắt và có gu!',
        timestamp: 'Hôm qua, 14:40'
      }
    ]
  },
  {
    id: 'match-demo-zenith',
    businessId: 'biz-zenith',
    creatorId: 'creator-huyen',
    campaignId: 'camp-zenith-reformer',
    status: 'offer_accepted',
    createdAt: '2026-09-25T10:15:00Z',
    offers: [
      {
        id: 'off-z1',
        sender: 'business',
        senderName: 'Zenith Reformer Pilates',
        amount: 900000,
        perks: 'Tặng kèm 3 buổi tập Reformer riêng trị giá 1.8M',
        note: 'Chào Huyền! Studio rất thích các bài hướng dẫn tư thế của bạn. Studio mời bạn hợp tác trải nghiệm nhé.',
        timestamp: '3 ngày trước',
        status: 'accepted'
      }
    ],
    agreedAmount: 900000,
    agreedPerks: 'Tặng kèm 3 buổi tập Reformer riêng trị giá 1.8M',
    booking: {
      date: '2026-10-02',
      time: '09:00',
      guests: 2,
      notes: 'Cần phòng tập máy vắng người từ 9h-10h30 sáng để ghi hình',
      status: 'confirmed'
    },
    submission: undefined,
    payment: {
      grossAmount: 900000,
      platformFee: 90000,
      netCreatorAmount: 810000,
      status: 'escrowed'
    },
    promoCode: 'HUYENPILATES',
    promoCodeUses: 64,
    chatMessages: [
      {
        id: 'msg-z1',
        senderId: 'biz-zenith',
        senderRole: 'business',
        text: 'Studio đã ký quỹ 900.000 VND thành công vào Escrow. Hẹn gặp bạn sáng Thứ Sáu tới!',
        timestamp: '3 ngày trước'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Kết Nối Mới Thành Công!',
    message: 'Bạn và @linhfoodie đã khớp nối cho chiến dịch "Luna Coffee Tràng Tiền". Mở phòng hợp tác để chốt thù lao.',
    timestamp: '1 giờ trước',
    read: false,
    type: 'match',
    linkMatchId: 'match-demo-luna'
  },
  {
    id: 'notif-2',
    title: 'Có Đề Xuất Báo Giá Mới',
    message: 'Luna Coffee đã gửi đề xuất mới: 650K VND + miễn phí thức uống và bánh ngọt cho 2 người.',
    timestamp: '2 giờ trước',
    read: false,
    type: 'offer',
    linkMatchId: 'match-demo-luna'
  },
  {
    id: 'notif-3',
    title: 'Báo Cáo Hiệu Quả Chiến Dịch',
    message: 'Mã khuyến mãi LINH10 đã cán mốc 186 lượt áp dụng tại quầy với 74 đơn hàng chuyển đổi thành công!',
    timestamp: '1 ngày trước',
    read: true,
    type: 'general'
  }
];

export const INITIAL_ANALYTICS: CampaignAnalytics = {
  campaignId: 'camp-luna-launch',
  campaignTitle: 'Chiến Dịch Khai Trương Luna Coffee Tràng Tiền',
  totalViews: 128000,
  totalViewsDisplay: '128K',
  engagementCount: 8400,
  engagementDisplay: '8.4K',
  clicks: 1240,
  promoCodeUses: 186,
  estimatedConversions: 74,
  completionRate: 100,
  participatingCreators: 5,
  creatorBreakdowns: [
    {
      creatorId: 'creator-linh',
      creatorName: 'Linh Nguyễn',
      username: '@linhfoodie',
      views: 52400,
      engagement: 3820,
      promoUses: 94,
      status: 'Đang Thực Hiện'
    },
    {
      creatorId: 'creator-nam',
      creatorName: 'Nam Trần',
      username: '@namreviews',
      views: 31200,
      engagement: 1950,
      promoUses: 48,
      status: 'Đã Hoàn Thành'
    },
    {
      creatorId: 'creator-cafehop',
      creatorName: 'Hà My',
      username: '@hanoicafe.hop',
      views: 45800,
      engagement: 3100,
      promoUses: 44,
      status: 'Đã Hoàn Thành'
    }
  ]
};
