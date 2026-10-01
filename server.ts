import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const isProd = process.env.NODE_ENV === 'production';
const app = express();
const port = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google Gen AI client with telemetry user-agent
const apiKey = process.env.GEMINI_API_KEY || '';
const isValidKey = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim().length > 10);
let ai: GoogleGenAI | null = null;
if (isValidKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

const SYSTEM_PROMPT = `Bạn là Trợ lý AI Chuyên Viên Tư Vấn & Hỗ Trợ Khách Hàng Cao Cấp của nền tảng CollabLocal (Chợ kết nối Nhà hàng, Quán cafe, Spa, Workshop địa phương và Creator tại Hà Nội).

Vai trò và trách nhiệm của bạn:
1. Dành cho Creator (Content Creator, TikToker, Instagram Reviewer, Photographer):
   - Tư vấn chọn quán phù hợp theo phong cách kênh (ẩm thực, cafe, phong cách sống, du lịch, đêm).
   - Giải thích cơ chế bảo vệ thù lao 100% Escrow CollabLocal: Quán ký quỹ trước vào sàn, Creator nghiệm thu video xong là tiền tự động giải ngân về ví trong ngày, tuyệt đối không lo bị bùng tiền.
   - Hướng dẫn quyền lợi: Menu trải nghiệm miễn phí (Tasting Menu từ 400K - 850K) và chính sách đi kèm 1 bạn hỗ trợ/cameraman (+1 crew).
   - Gợi ý góc quay đẹp, khung giờ ánh sáng tự nhiên vàng (8h30-10h30, 14h-16h30), mẹo quay b-roll 4K và cách viết câu mở đầu (hook) 3 giây đầu thu hút view.
   - Hướng dẫn thỏa thuận hợp đồng, deal thù lao công bằng (600K - 1.8M VND/video).

2. Dành cho Chủ Quán / Doanh Nghiệp (Chủ nhà hàng, Cafe, Spa, Workshop):
   - Tư vấn tạo chiến dịch thu hút Creator chất lượng, đặt mức thù lao hợp lý theo quy mô kênh (Micro 10k-50k followers: 600k-1M, Macro 50k-200k+: 1.2M-2M+).
   - Hướng dẫn tiếp đón Creator: Bố trí góc ngồi đẹp, hỗ trợ cắm sạc/wifi, chuẩn bị món Hero Visual nóng sốt phân tầng bọt kem/phô mai chảy để lên hình đẹp mắt.
   - Quy trình kiểm duyệt video nháp cam kết trong vòng 24 giờ để kịp giờ vàng đăng bài.
   - Thiết lập mã voucher độc quyền cho fan của Creator (ví dụ: LINH15 giảm 15%) và cách training nhân viên thu ngân áp dụng mã.

Phong cách phản hồi:
- Lịch thiệp, ân cần, chuyên nghiệp, súc tích, định dạng gạch đầu dòng rõ ràng.
- Sử dụng tiếng Việt chuẩn mực, xưng hô "CollabLocal Support" hoặc "Em/Mình" và gọi người dùng là "bạn" hoặc "Anh/Chị".
- Luôn kết thúc bằng một gợi ý hành động cụ thể hoặc hỏi thăm để hỗ trợ tiếp.`;

// API Endpoint: Multi-Turn Chat
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { messages, userRole, modelPreference = 'general' } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    // Select model according to system rules
    // gemini-3.1-pro-preview for complex tasks, gemini-3.5-flash for general, gemini-3.1-flash-lite for fast
    let selectedModel = 'gemini-3.5-flash';
    if (modelPreference === 'fast') {
      selectedModel = 'gemini-3.1-flash-lite';
    } else if (modelPreference === 'complex') {
      selectedModel = 'gemini-3.1-pro-preview';
    }

    // Context prefix based on active user role
    const roleContext = userRole === 'business'
      ? '[Người dùng hiện tại là: CHỦ QUÁN / NHÀ HÀNG tại Hà Nội cần tư vấn vận hành, tuyển Creator và quản lý chiến dịch]'
      : '[Người dùng hiện tại là: CREATOR / REVIEWER tại Hà Nội cần tư vấn chọn quán, deal thù lao, quay video và thanh toán Escrow]';

    // Format conversation history for Gemini contents
    const contents = [
      {
        role: 'user',
        parts: [{ text: `${SYSTEM_PROMPT}\n\n${roleContext}` }]
      },
      {
        role: 'model',
        parts: [{ text: 'Chào bạn! CollabLocal Support đã sẵn sàng đồng hành và hỗ trợ bạn mọi thông tin về hợp tác, địa điểm và quyền lợi.' }]
      }
    ];

    for (const msg of messages) {
      contents.push({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      });
    }

    if (ai) {
      try {
        const callPromise = ai.models.generateContent({
          model: selectedModel,
          contents: contents
        });
        const timeoutPromise = new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('AI timeout')), 8000)
        );
        const response: any = await Promise.race([callPromise, timeoutPromise]);

        const replyText = response.text || 'CollabLocal Support luôn sẵn sàng hỗ trợ bạn. Bạn cần tư vấn thêm về nội dung nào?';
        return res.json({
          reply: replyText,
          model: selectedModel,
          role: userRole
        });
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to smart domain response:', geminiError?.message);
      }
    }

    // Fallback response generator if API key is not yet set or rate-limited
    const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
    let fallbackReply = '';

    if (userRole === 'business') {
      if (lastUserMessage.includes('ngân sách') || lastUserMessage.includes('giá') || lastUserMessage.includes('chi phí') || lastUserMessage.includes('thù lao')) {
        fallbackReply = `Chào Anh/Chị! Đối với các quán cafe và nhà hàng tại Hà Nội trên CollabLocal, mức ngân sách thù lao tiền mặt khuyến nghị như sau:
• **Micro Creator (10K - 50K followers):** 600.000₫ – 1.000.000₫ / video. Rất phù hợp để phủ sóng địa bàn lân cận, tương tác thật.
• **Mid-tier Creator (50K - 150K followers):** 1.200.000₫ – 1.800.000₫ / video. Khả năng lên xu hướng TikTok/IG Reels cao.
• **Đãi ngộ bắt buộc:** Quán chuẩn bị 1 Set Tasting Menu Signature miễn phí (trị giá 350k - 600k) cho Creator và 1 bạn cameraman đi cùng.
Tất cả thù lao đều được ký quỹ an toàn qua CollabLocal Escrow và chỉ giải ngân khi Anh/Chị đã duyệt video đúng hẹn.`;
      } else if (lastUserMessage.includes('tiếp đón') || lastUserMessage.includes('chuẩn bị') || lastUserMessage.includes('đến quay')) {
        fallbackReply = `Để buổi quay của Creator đạt hiệu quả triệu view, Anh/Chị nên chuẩn bị các bước sau:
1. **Khung giờ đón tiếp:** Nên hẹn Creator vào giờ vắng khách (9h00-11h30 sáng hoặc 14h30-17h00 chiều) để có góc quay thoáng.
2. **Món Hero bắt mắt:** Làm món nóng hổi, trình bày bọt kem, phô mai kéo sợi hoặc khò lửa đẹp nhất ngay khi Creator bật máy.
3. **Tiện ích:** Chuẩn bị sẵn ổ cắm sạc dự phòng, wifi tốc độ cao và 1 ly nước chào đón bạn quay phim đi cùng.
4. **Voucher độc quyền:** Cấp mã voucher (ví dụ: [TEN_CREATOR]15) và báo trước cho thu ngân để nhận diện khách đến theo video.`;
      } else {
        fallbackReply = `Chào Anh/Chị chủ quán! CollabLocal hỗ trợ kết nối quán với hơn 200+ Creator ẩm thực và đời sống uy tín tại Hà Nội. Anh/Chị có thể tạo chiến dịch tuyển dụng, ký quỹ thù lao minh bạch qua Escrow và xem hồ sơ Creator chi tiết. Anh/Chị cần tư vấn thêm về cách tạo brief hay chính sách đón tiếp ekip?`;
      }
    } else {
      // Creator role
      if (lastUserMessage.includes('escrow') || lastUserMessage.includes('thanh toán') || lastUserMessage.includes('tiền') || lastUserMessage.includes('bùng')) {
        fallbackReply = `Bạn hoàn toàn có thể yên tâm 100% khi hợp tác qua CollabLocal:
🛡️ **Cơ chế Ký Quỹ Escrow:**
1. Khi quán mời bạn hoặc bạn được duyệt chiến dịch, quán bắt buộc phải nạp 100% thù lao vào tài khoản ký quỹ bảo đảm của CollabLocal.
2. Bạn đến trải nghiệm, quay video và gửi bản nháp nghiệm thu.
3. Quán duyệt video trong vòng 24 giờ. Ngay sau khi duyệt, tiền thù lao tự động mở khóa và chuyển về tài khoản của bạn mà không lo bị bùng hay chậm trễ.`;
      } else if (lastUserMessage.includes('hook') || lastUserMessage.includes('kịch bản') || lastUserMessage.includes('quay') || lastUserMessage.includes('view')) {
        fallbackReply = `Gợi ý kịch bản mở đầu (Hook 3s) cực hút view cho bạn:
✨ **Mẫu 1 (Gây tò mò địa điểm):** "Đố mọi người tìm được quán cafe nào ở Hoàn Kiếm mà có góc ban công view trọn phố cổ bình yên thế này..." *(chèn góc quay lia máy từ tách cà phê ra đường phố)*
✨ **Mẫu 2 (Trải nghiệm độc bản):** "Lần đầu tiên thử lớp bọt kem matcha bồng bềnh 24h tan chảy trên nền cà phê mộc..." *(tiếng ASMR giòn tan của bánh)*
✨ **Mẹo quay:** Nhớ tận dụng khung giờ nắng xiên 8h30-10h30 hoặc 14h-16h30 tại các quán có giếng trời để lên màu đồ uống trong trẻo nhất nhé!`;
      } else {
        fallbackReply = `Chào bạn Creator! CollabLocal có hơn 14+ địa điểm cafe, nhà hàng, spa và workshop tại Hà Nội đang mở tuyển với thù lao từ 600K – 1.8M VND kèm miễn phí Tasting Menu và bạn đi cùng (+1 crew). Bạn đang tìm kiếm quán ở khu vực nào (Hoàn Kiếm, Tây Hồ, Cầu Giấy...) để mình gợi ý nhé!`;
      }
    }

    return res.json({
      reply: fallbackReply,
      model: selectedModel,
      role: userRole,
      isFallback: true
    });
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({ error: error?.message || 'Internal server error' });
  }
});

// API Endpoint: Voice AI Consultation (Gemini 3.8 Live / Voice)
app.post('/api/ai/voice', async (req, res) => {
  try {
    const { transcript, userRole } = req.body;

    const rolePrompt = userRole === 'business'
      ? 'Bạn là Trợ lý giọng nói tư vấn dành cho Chủ Quán tại Hà Nội. Trả lời ngắn gọn, thân thiện, truyền cảm trong 2-3 câu ngắn để phát âm thanh tự nhiên.'
      : 'Bạn là Trợ lý giọng nói đồng hành cùng Creator tại Hà Nội. Trả lời ấm áp, khích lệ, súc tích trong 2-3 câu ngắn để phát âm thanh mượt mà.';

    let spokenReply = '';

    if (ai) {
      try {
        const callPromise = ai.models.generateContent({
          model: 'gemini-3.8-live', // Live voice model
          contents: [
            {
              role: 'user',
              parts: [{ text: `${rolePrompt}\nCâu hỏi của người dùng: "${transcript || 'Chào trợ lý'}"` }]
            }
          ]
        });
        const timeoutPromise = new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Voice AI timeout')), 8000)
        );
        const response: any = await Promise.race([callPromise, timeoutPromise]);
        spokenReply = response.text || '';
      } catch (err) {
        console.warn('Voice AI call failed, falling back:', err);
      }
    }

    if (!spokenReply) {
      spokenReply = userRole === 'business'
        ? 'Dạ em chào Anh Chị! Em có thể hỗ trợ Anh Chị lên ngân sách, duyệt video nháp hoặc chuẩn bị góc đón tiếp Creator chu đáo nhất ạ.'
        : 'Chào bạn Creator! Bạn cần gợi ý quán cafe ánh sáng đẹp ở Tây Hồ hay Hoàn Kiếm, hay muốn kiểm tra quyền lợi ký quỹ thù lao Escrow ạ?';
    }

    return res.json({
      reply: spokenReply,
      model: 'gemini-3.8-live'
    });
  } catch (error: any) {
    console.error('Voice AI endpoint error:', error);
    return res.status(500).json({ error: 'Voice processing error' });
  }
});

// Start Server & mount Vite in dev
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
