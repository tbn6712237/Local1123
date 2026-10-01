/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopBar } from './components/common/TopBar';
import { RoleNavigation } from './components/common/RoleNavigation';
import { LandingPage } from './components/landing/LandingPage';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { MatchModal } from './components/common/MatchModal';
import { ReportDisputeModal } from './components/common/ReportDisputeModal';
import { DemoWalkthroughModal } from './components/common/DemoWalkthroughModal';
import { NewbieSetupModal } from './components/newbie/NewbieSetupModal';

// Business views
import { BusinessDashboard } from './components/business/BusinessDashboard';
import { DiscoverCreators } from './components/business/DiscoverCreators';
import { CampaignsList } from './components/business/CampaignsList';
import { AnalyticsDashboard } from './components/business/AnalyticsDashboard';
import { BusinessProModal } from './components/business/BusinessProModal';
import { CreateCampaignModal } from './components/business/CreateCampaignModal';
import { CreatorProfileModal } from './components/business/CreatorProfileModal';
import { BusinessProfileModal } from './components/business/BusinessProfileModal';

// Creator views
import { CreatorDashboard } from './components/creator/CreatorDashboard';
import { DiscoverCampaigns } from './components/creator/DiscoverCampaigns';
import { SwipeDeck } from './components/creator/SwipeDeck';
import { EarningsView } from './components/creator/EarningsView';
import { CampaignDetailModal } from './components/creator/CampaignDetailModal';

// Support AI widget
import { CustomerSupportWidget } from './components/support/CustomerSupportWidget';

// Shared views
import { MapView } from './components/map/MapView';
import { CollaborationRoom } from './components/collaboration/CollaborationRoom';
import { MatchesList } from './components/common/MatchesList';

function MainAppShell() {
  const { role, currentView, showLanding, setShowLanding } = useApp();

  if (showLanding) {
    return <LandingPage onEnterApp={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-white text-[#222222] flex flex-col pb-16 sm:pb-8">
      {/* 3-Zone Top Bar */}
      <TopBar onOpenLanding={() => setShowLanding(true)} />

      {/* Role Context Navigation */}
      <RoleNavigation />

      {/* Dynamic View Router */}
      <main className="flex-1 bg-white">
        {role === 'business' ? (
          <>
            {currentView === 'dashboard' && <BusinessDashboard />}
            {currentView === 'discover' && <DiscoverCreators />}
            {currentView === 'map' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
                <div className="mb-4">
                  <h1 className="text-[26px] sm:text-[32px] font-semibold font-display text-[#222222] tracking-tight leading-tight">Hanoi Location Discovery Map</h1>
                  <p className="text-[15px] text-[#717171] mt-1">Click campaign pins to view budget tiers, distance, and creator briefs.</p>
                </div>
                <MapView />
              </div>
            )}
            {currentView === 'campaigns' && <CampaignsList />}
            {currentView === 'matches' && <MatchesList />}
            {currentView === 'collab' && <CollaborationRoom />}
            {currentView === 'analytics' && <AnalyticsDashboard />}
          </>
        ) : (
          <>
            {currentView === 'dashboard' && <CreatorDashboard />}
            {currentView === 'discover' && <DiscoverCampaigns />}
            {currentView === 'map' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
                <div className="mb-4">
                  <h1 className="text-[26px] sm:text-[32px] font-semibold font-display text-[#222222] tracking-tight leading-tight">Local Campaigns Map</h1>
                  <p className="text-[15px] text-[#717171] mt-1">Discover nearby businesses actively offering paid collaborations.</p>
                </div>
                <MapView />
              </div>
            )}
            {currentView === 'swipe' && <SwipeDeck />}
            {currentView === 'matches' && <MatchesList />}
            {currentView === 'collab' && <CollaborationRoom />}
            {currentView === 'earnings' && <EarningsView />}
          </>
        )}
      </main>

      {/* Universal Floating Modals & Drawers */}
      <MatchModal />
      <NotificationDrawer />
      <ReportDisputeModal />
      <DemoWalkthroughModal />
      <NewbieSetupModal />
      <CreateCampaignModal />
      <CreatorProfileModal />
      <BusinessProfileModal />
      <CampaignDetailModal />
      <BusinessProModal />
      <CustomerSupportWidget />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppShell />
    </AppProvider>
  );
}
