import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useT } from '../../i18n/useT';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, 
  Star, 
  Heart, 
  Sparkles, 
  X, 
  Layers, 
  ZoomIn, 
  ZoomOut,
  SlidersHorizontal,
  Navigation,
  Compass,
  Building2,
  ArrowRight,
  Maximize2,
  Columns,
  RotateCcw,
  Check,
  Tag,
  Gift,
  ShieldCheck,
  Search,
  Eye
} from 'lucide-react';
import { Business, Campaign } from '../../types';

export const MapView: React.FC = () => {
  const { 
    businesses, 
    campaigns, 
    role, 
    likeCampaign, 
    setViewingCampaignId,
    setViewingBusinessId,
    likes,
    activeCreator
  } = useApp();

  const { t, l, loc } = useT();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedBudget, setSelectedBudget] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isSplitView, setIsSplitView] = useState<boolean>(true);
  const [hoveredBizId, setHoveredBizId] = useState<string | null>(null);

  const [selectedItem, setSelectedItem] = useState<{
    business: Business;
    campaign: Campaign;
  } | null>(null);

  // Map DOM and Leaflet instances
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const labelsLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Center presets for districts & creator hubs across Vietnam
  const districtCenters: Record<string, { lat: number; lng: number; zoom: number }> = {
    'all': { lat: 21.033, lng: 105.835, zoom: 12 },
    'hoankiem': { lat: 21.0285, lng: 105.8530, zoom: 15 },
    'badinh': { lat: 21.0380, lng: 105.8350, zoom: 15 },
    'tayho': { lat: 21.0620, lng: 105.8280, zoom: 14 },
    'dongda': { lat: 21.0150, lng: 105.8280, zoom: 14 },
    'caugiay': { lat: 21.0330, lng: 105.7860, zoom: 14 },
    'haibatrung': { lat: 21.0110, lng: 105.8500, zoom: 15 },
    'hcm': { lat: 10.7769, lng: 106.7009, zoom: 13 },
    'danang': { lat: 16.0544, lng: 108.2022, zoom: 13 },
    'dalat': { lat: 11.9404, lng: 108.4583, zoom: 13 }
  };

  // Filter campaigns
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(c => {
      const biz = businesses.find(b => b.id === c.businessId);
      if (!biz) return false;

      // Category filter
      if (selectedCategory !== 'all' && c.category.toLowerCase().indexOf(selectedCategory.toLowerCase()) === -1) {
        return false;
      }

      // District / Area filter
      if (selectedDistrict !== 'all') {
        const locLower = (biz.location + ' ' + biz.name).toLowerCase();
        if (selectedDistrict === 'hoankiem' && !locLower.includes('hoàn kiếm') && !locLower.includes('hoan kiem') && !locLower.includes('tràng tiền')) return false;
        if (selectedDistrict === 'badinh' && !locLower.includes('ba đình') && !locLower.includes('ba dinh') && !locLower.includes('phan đình phùng')) return false;
        if (selectedDistrict === 'tayho' && !locLower.includes('tây hồ') && !locLower.includes('tay ho') && !locLower.includes('đặng thai mai')) return false;
        if (selectedDistrict === 'dongda' && !locLower.includes('đống đa') && !locLower.includes('dong da')) return false;
        if (selectedDistrict === 'caugiay' && !locLower.includes('cầu giấy') && !locLower.includes('cau giay')) return false;
        if (selectedDistrict === 'haibatrung' && !locLower.includes('hai bà trưng') && !locLower.includes('hai ba trung')) return false;
        if (selectedDistrict === 'hcm' && !locLower.includes('hồ chí minh') && !locLower.includes('saigon') && !locLower.includes('quận') && !locLower.includes('thảo điền') && !locLower.includes('hcm')) return false;
        if (selectedDistrict === 'danang' && !locLower.includes('đà nẵng') && !locLower.includes('da nang') && !locLower.includes('sơn trà') && !locLower.includes('hải châu')) return false;
        if (selectedDistrict === 'dalat' && !locLower.includes('đà lạt') && !locLower.includes('da lat') && !locLower.includes('lâm đồng')) return false;
      }

      // Budget filter
      if (selectedBudget === 'under700k' && c.budgetMax > 700000) return false;
      if (selectedBudget === 'above700k' && c.budgetMax < 700000) return false;

      // Keyword filter
      if (searchKeyword.trim() !== '') {
        const query = searchKeyword.toLowerCase();
        const matchTitle = c.title.toLowerCase().includes(query);
        const matchBiz = biz.name.toLowerCase().includes(query);
        const matchLoc = biz.location.toLowerCase().includes(query);
        if (!matchTitle && !matchBiz && !matchLoc) return false;
      }

      return true;
    });
  }, [campaigns, businesses, selectedCategory, selectedDistrict, selectedBudget, searchKeyword]);

  const getPinPrice = (c: Campaign) => {
    if (c.budgetMax >= 2000000) return '2M+';
    if (c.budgetMax >= 1500000) return '1.5M';
    if (c.budgetMax >= 1000000) return '1.1M';
    if (c.budgetMax >= 800000) return '850K';
    if (c.budgetMax >= 700000) return '700K';
    return '600K';
  };

  // Satellite HD Tile Layer URLs
  const SATELLITE_TILE_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
  const SATELLITE_LABELS_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}';

  // Initialize Leaflet Map (Satellite Only)
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const initialCenter = districtCenters['all'];
    const map = L.map(mapContainerRef.current, {
      center: [initialCenter.lat, initialCenter.lng],
      zoom: initialCenter.zoom,
      zoomControl: false,
      attributionControl: false
    });

    // Satellite Imagery Layer
    const tileLayer = L.tileLayer(SATELLITE_TILE_URL, {
      maxZoom: 19,
      attribution: 'Esri, Maxar, Earthstar Geographics'
    }).addTo(map);

    // High contrast street and boundary labels over satellite
    const labelsLayer = L.tileLayer(SATELLITE_LABELS_URL, {
      maxZoom: 19,
      attribution: 'Esri'
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    labelsLayerRef.current = labelsLayer;
    mapInstanceRef.current = map;

    // User location beacon
    const userLat = activeCreator?.lat || 21.0295;
    const userLng = activeCreator?.lng || 105.8512;

    const userBeaconIcon = L.divIcon({
      className: 'user-location-beacon-wrapper',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-8 h-8 rounded-full bg-blue-500/30 animate-ping"></div>
          <div class="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-md"></div>
          <span class="absolute top-5 bg-white/95 text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-blue-200 whitespace-nowrap">
            ${l('Vị trí của bạn', 'Your Location', '현재 위치')}
          </span>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const userMarker = L.marker([userLat, userLng], { icon: userBeaconIcon, zIndexOffset: 1000 }).addTo(map);
    userMarkerRef.current = userMarker;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Venue Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    filteredCampaigns.forEach(camp => {
      const biz = businesses.find(b => b.id === camp.businessId);
      if (!biz || !biz.lat || !biz.lng) return;

      const isSelected = selectedItem?.business.id === biz.id;
      const isHovered = hoveredBizId === biz.id;
      const pinPrice = getPinPrice(camp);

      const markerHtml = `
        <div class="airbnb-pin-pill-container transition-transform duration-150 ${isSelected ? 'scale-115 z-50' : isHovered ? 'scale-110 z-40' : 'hover:scale-108'}">
          <div class="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-[13px] font-mono shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-all ${
            isSelected
              ? 'bg-[#0F172A] text-white ring-4 ring-blue-500/20 scale-105'
              : isHovered
              ? 'bg-[#0F172A] text-white shadow-lg'
              : 'bg-white text-[#0F172A] border border-[#CBD5E1]'
          }">
            <span class="w-2 h-2 rounded-full ${isSelected ? 'bg-[#2563EB]' : 'bg-[#2563EB]'}"></span>
            <span>${pinPrice}</span>
            ${camp.isSponsored ? '<span class="text-[9px] bg-blue-50 text-[#2563EB] px-1 py-0.2 rounded font-semibold uppercase">PRO</span>' : ''}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'airbnb-custom-leaflet-marker',
        html: markerHtml,
        iconSize: [70, 32],
        iconAnchor: [35, 16]
      });

      const marker = L.marker([biz.lat, biz.lng], {
        icon: customIcon,
        zIndexOffset: isSelected ? 500 : isHovered ? 400 : 100
      }).addTo(map);

      marker.on('click', () => {
        setSelectedItem({ business: biz, campaign: camp });
        map.panTo([biz.lat, biz.lng], { animate: true, duration: 0.5 });
      });

      marker.on('mouseover', () => {
        setHoveredBizId(biz.id);
      });

      marker.on('mouseout', () => {
        setHoveredBizId(null);
      });

      markersRef.current.push(marker);
    });
  }, [filteredCampaigns, selectedItem, hoveredBizId, businesses]);

  // Handle District FlyTo
  const handleSelectDistrict = (distId: string) => {
    setSelectedDistrict(distId);
    const center = districtCenters[distId] || districtCenters['all'];
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([center.lat, center.lng], center.zoom, {
        duration: 0.8,
        easeLinearity: 0.25
      });
    }
  };

  const handleResetMap = () => {
    handleSelectDistrict('all');
    setSelectedCategory('all');
    setSelectedBudget('all');
    setSearchKeyword('');
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-8">
      
      {/* Top Filter & Airbnb Control Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 sm:px-5 sm:py-3.5 rounded-2xl border border-[#EBEBEB] shadow-2xs">
        
        {/* District Quick Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full lg:max-w-xl">
          {[
            { id: 'all', label: l('Tất Cả', 'All Areas', '전체'), count: campaigns.length },
            { id: 'hoankiem', label: l('Hoàn Kiếm', 'Hoan Kiem', '호안끼엠'), count: 7 },
            { id: 'tayho', label: l('Tây Hồ', 'Tay Ho', '떠이호'), count: 7 },
            { id: 'badinh', label: l('Ba Đình', 'Ba Dinh', '바딘'), count: 7 },
            { id: 'caugiay', label: l('Cầu Giấy', 'Cau Giay', '꺼우저이'), count: 7 },
            { id: 'dongda', label: l('Đống Đa', 'Dong Da', '동다'), count: 7 },
            { id: 'haibatrung', label: l('Hai Bà Trưng', 'Hai Ba Trung', '하이바쯩'), count: 5 },
            { id: 'hcm', label: l('TP. Hồ Chí Minh', 'Ho Chi Minh City', '호치민'), count: 7 },
            { id: 'danang', label: l('Đà Nẵng', 'Da Nang', '다낭'), count: 5 },
            { id: 'dalat', label: l('Đà Lạt', 'Da Lat', '달랏'), count: 4 }
          ].map((dist) => (
            <button
              key={dist.id}
              onClick={() => handleSelectDistrict(dist.id)}
              className={`px-3 py-1.5 rounded-full text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 shrink-0 ${
                selectedDistrict === dist.id
                  ? 'bg-[#222222] text-white shadow-xs'
                  : 'bg-[#F7F7F7] text-[#717171] hover:text-[#222222] hover:bg-[#EBEBEB]'
              }`}
            >
              <span>{dist.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                selectedDistrict === dist.id ? 'bg-white/25 text-white' : 'bg-[#E5E5E5] text-[#717171]'
              }`}>
                {dist.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Bar Input */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="w-4 h-4 text-[#717171] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder={l('Tìm tên quán, đường phố...', 'Search venue, street...', '매장, 거리 검색...')}
            className="w-full pl-9 pr-3 py-1.5 bg-[#F7F7F7] hover:bg-[#EFEFEF] focus:bg-white text-[13px] rounded-full border border-transparent focus:border-[#222222] transition-colors outline-none"
          />
          {searchKeyword && (
            <button
              onClick={() => setSearchKeyword('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#717171] hover:text-[#222222]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View Layout Mode (Split vs Full Map) & Reset */}
        <div className="flex items-center gap-2 ml-auto">
          
          {/* Pure Satellite View Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#DDDDDD] text-[13px] font-semibold text-[#222222] bg-white shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <Layers className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="hidden sm:inline">
              {l('Vệ Tinh (Satellite HD)', 'Satellite HD', '위성 지도 HD')}
            </span>
          </div>

          <button
            onClick={() => setIsSplitView(!isSplitView)}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#DDDDDD] hover:border-[#222222] text-[13px] font-semibold text-[#222222] bg-white transition-colors cursor-pointer"
          >
            {isSplitView ? (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-[#717171]" />
                <span>{l('Bản Đồ Rộng', 'Full Map', '전체 지도')}</span>
              </>
            ) : (
              <>
                <Columns className="w-3.5 h-3.5 text-[#717171]" />
                <span>{l('Chia Đôi Màn Hình', 'Split View', '분할 화면')}</span>
              </>
            )}
          </button>

          <button
            onClick={handleResetMap}
            className="p-2 rounded-full border border-[#DDDDDD] hover:border-[#222222] text-[#717171] hover:text-[#222222] bg-white transition-colors cursor-pointer"
            title={l('Về vị trí trung tâm', 'Reset view', '초기화')}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Container: Split Grid or Full Map */}
      <div className={`grid gap-4 ${isSplitView ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
        
        {/* Left Side: Scrollable Listing Cards (Airbnb Style Split-Screen) */}
        {isSplitView && (
          <div className="lg:col-span-5 flex flex-col h-[700px] bg-white rounded-3xl border border-[#EBEBEB] p-4 overflow-hidden shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#EBEBEB] shrink-0">
              <div>
                <h3 className="text-[16px] font-semibold text-[#222222] font-display">
                  {l('Địa Điểm Tuyển Creator', 'Venues Booking Creators', '크리에이터 모집 매장')}
                </h3>
                <span className="text-[12px] text-[#717171]">
                  {filteredCampaigns.length} {l('chiến dịch đang mở nhận đề xuất', 'active campaigns available', '개 캠페인 진행 중')}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {l('⚡ Trả Lời Nhanh', '⚡ Fast Response', '⚡ 빠른 응답')}
              </span>
            </div>

            {/* Scrollable list */}
            <div className="overflow-y-auto space-y-3 pt-3 flex-1 pr-1">
              {filteredCampaigns.map((camp) => {
                const biz = businesses.find(b => b.id === camp.businessId);
                if (!biz) return null;
                const isHovered = hoveredBizId === biz.id;
                const isSelected = selectedItem?.business.id === biz.id;

                return (
                  <div
                    key={camp.id}
                    onMouseEnter={() => setHoveredBizId(biz.id)}
                    onMouseLeave={() => setHoveredBizId(null)}
                    onClick={() => {
                      setSelectedItem({ business: biz, campaign: camp });
                      if (mapInstanceRef.current && biz.lat && biz.lng) {
                        mapInstanceRef.current.panTo([biz.lat, biz.lng], { animate: true });
                      }
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex gap-3.5 ${
                      isSelected
                        ? 'border-[#222222] bg-[#F7F7F7] shadow-sm ring-1 ring-[#222222]'
                        : isHovered
                        ? 'border-[#DDDDDD] bg-[#FAFAFA]'
                        : 'border-[#EBEBEB] bg-white hover:border-[#DDDDDD]'
                    }`}
                  >
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#F7F7F7] shrink-0 border border-[#EBEBEB] relative">
                      <img
                        src={biz.image}
                        alt={biz.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold">
                        {camp.platform}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="text-[12px] font-semibold text-[#717171] truncate">
                            {loc(biz.category)} · {biz.distanceKm} km
                          </span>
                          <div className="flex items-center gap-0.5 text-[12px] font-semibold text-[#222222] shrink-0">
                            <Star className="w-3 h-3 fill-[#222222]" />
                            <span>{biz.rating}</span>
                          </div>
                        </div>

                        <h4 className="text-[14px] font-semibold text-[#222222] truncate hover:text-[#2563EB]">
                          {biz.name}
                        </h4>
                        <p className="text-[12px] text-[#717171] truncate">
                          {loc(camp.title)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-[#EBEBEB]/80 mt-1">
                        <span className="text-[14px] font-semibold text-[#222222] font-mono">
                          {camp.budgetDisplay}
                        </span>
                        <span className="text-[11px] text-[#2563EB] font-semibold">
                          {l('Tasting Miễn Phí →', 'Free Tasting →', '무료 시식 →')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Right Side / Full Map: Real Leaflet Interactive Cartography */}
        <div className={`${isSplitView ? 'lg:col-span-7' : 'w-full'} relative h-[700px] rounded-3xl overflow-hidden border border-[#EBEBEB] bg-[#F4F3F0] shadow-sm select-none`}>
          
          {/* Leaflet DOM container */}
          <div 
            ref={mapContainerRef} 
            className="w-full h-full z-10"
            style={{ minHeight: '100%' }}
          />

          {/* Floating Zoom Controls (Bottom-Right) */}
          <div className="absolute bottom-6 right-6 z-20 flex flex-col items-center bg-white/95 backdrop-blur-md rounded-2xl border border-[#DDDDDD] shadow-[0_4px_12px_rgba(0,0,0,0.15)] overflow-hidden">
            <button
              onClick={handleZoomIn}
              className="p-2.5 hover:bg-[#F7F7F7] text-[#222222] border-b border-[#EBEBEB] transition-colors cursor-pointer"
              title={l('Phóng to', 'Zoom In', '확대')}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2.5 hover:bg-[#F7F7F7] text-[#222222] transition-colors cursor-pointer"
              title={l('Thu nhỏ', 'Zoom Out', '축소')}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          {/* Floating Venue Preview Modal Card (Airbnb Bottom / Center Overlay) */}
          {selectedItem && (
            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-[380px] z-30 bg-white rounded-3xl p-4 shadow-[0_16px_36px_rgba(0,0,0,0.2)] border border-[#EBEBEB] animate-in slide-in-from-bottom-6 duration-200">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/80 hover:bg-white text-[#717171] hover:text-[#222222] cursor-pointer shadow-2xs border border-[#EBEBEB] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex gap-3 mb-3">
                <div 
                  onClick={() => setViewingBusinessId(selectedItem.business.id)}
                  className="w-20 h-20 rounded-2xl overflow-hidden bg-[#F7F7F7] shrink-0 border border-[#EBEBEB] cursor-pointer hover:opacity-90 transition-opacity"
                  title={l('Xem hồ sơ quán', 'View venue profile', '매장 프로필 보기')}
                >
                  <img
                    src={selectedItem.business.image}
                    alt={selectedItem.business.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0 pr-6">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#717171] mb-0.5">
                    <span className="font-semibold text-[#222222]">{loc(selectedItem.business.category)}</span>
                    <span>·</span>
                    <span className="text-[#008A05] font-semibold">{selectedItem.business.distanceKm} km</span>
                  </div>
                  <h3 
                    onClick={() => setViewingBusinessId(selectedItem.business.id)}
                    className="text-[16px] font-semibold text-[#222222] truncate font-display cursor-pointer hover:text-[#2563EB] hover:underline"
                    title={l('Xem hồ sơ quán', 'View venue profile', '매장 프로필 보기')}
                  >
                    {selectedItem.business.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[13px] text-[#222222] font-semibold mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-[#222222] text-[#222222]" />
                    <span>{selectedItem.business.rating}</span>
                    <span className="text-[#717171] font-normal">({selectedItem.business.reviewsCount} {l('đánh giá', 'reviews', '리뷰')})</span>
                  </div>
                </div>
              </div>

              {/* Campaign Highlights */}
              <div className="bg-[#F7F7F7] border border-[#EBEBEB] rounded-2xl p-3 mb-3 text-[13px] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[#717171] font-medium">{l('Thù lao chi trả:', 'Campaign Budget:', '예산:')}</span>
                  <span className="font-semibold text-[#2563EB] font-mono text-[14px]">
                    {selectedItem.campaign.budgetDisplay}
                  </span>
                </div>
                <p className="text-[12px] text-[#717171] line-clamp-1">
                  <strong className="text-[#222222]">{l('Yêu cầu:', 'Requirements:', '요구사항:')}</strong> {loc(selectedItem.campaign.deliverables)}
                </p>
                <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-700 font-semibold">
                  <span>{l('✓ Tasting Menu Miễn Phí', '✓ Complimentary Tasting', '✓ 무료 시식 제공')}</span>
                  <span>•</span>
                  <span>🛡️ 100% Escrow</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewingBusinessId(selectedItem.business.id)}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-[#222222] hover:bg-[#F7F7F7] text-[#222222] text-[13px] font-semibold transition-colors cursor-pointer text-center"
                >
                  {l('Hồ Sơ Quán', 'Venue Profile', '매장 프로필')}
                </button>
                <button
                  onClick={() => {
                    likeCampaign(selectedItem.campaign.id);
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl btn-airbnb-primary text-white text-[13px] font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{l('Ứng Tuyển', 'Apply Now', '지원하기')}</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
