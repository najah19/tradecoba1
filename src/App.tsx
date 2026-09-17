import React from 'react';
import { MarketProvider, useMarket } from './context/MarketContext';
import { MarketTicker } from './components/layout/MarketTicker';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';

// Sections
import { HeroSection } from './components/home/HeroSection';
import { MarketOverview } from './components/markets/MarketOverview';
import { XauusdMarketCenter } from './components/markets/XauusdMarketCenter';
import { TradingIdeasSection } from './components/trading/TradingIdeasSection';
import { EconomicCalendarView } from './components/calendar/EconomicCalendarView';
import { BreakingNewsSection } from './components/news/BreakingNewsSection';
import { TradingToolsView } from './components/tools/TradingToolsView';
import { AcademyView } from './components/academy/AcademyView';
import { CommunityView } from './components/community/CommunityView';
import { UserDashboardView } from './components/dashboard/UserDashboardView';
import { TradingAccountView } from './components/trading/TradingAccountView';

// Modals & Notifications
import { DemoAccountModal } from './components/modals/DemoAccountModal';
import { LiveAccountKycModal } from './components/modals/LiveAccountKycModal';
import { AiAssistantModal } from './components/modals/AiAssistantModal';
import { ToastContainer } from './components/common/ToastContainer';

const MainAppContent: React.FC = () => {
  const { activeTab } = useMarket();

  return (
    <div className="min-h-screen flex flex-col bg-[#080B12] text-white selection:bg-yellow-500 selection:text-black font-sans">
      {/* 1. Global Live Market Ticker */}
      <MarketTicker />

      {/* 2. Main Navigation Header */}
      <Navbar />

      {/* 3. Dynamic Page View Routing */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection />
            <MarketOverview />
            <XauusdMarketCenter />
            <TradingIdeasSection />
            <EconomicCalendarView />
            <BreakingNewsSection />
          </>
        )}

        {activeTab === 'markets' && (
          <div className="pt-2">
            <MarketOverview />
            <XauusdMarketCenter />
          </div>
        )}

        {activeTab === 'gold' && (
          <div className="pt-2">
            <XauusdMarketCenter />
            <TradingIdeasSection />
          </div>
        )}

        {activeTab === 'trading' && (
          <div className="pt-2">
            <TradingAccountView />
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="pt-2">
            <TradingIdeasSection />
            <XauusdMarketCenter />
          </div>
        )}

        {activeTab === 'news' && (
          <div className="pt-2">
            <BreakingNewsSection />
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="pt-2">
            <EconomicCalendarView />
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="pt-2">
            <TradingToolsView />
          </div>
        )}

        {activeTab === 'academy' && (
          <div className="pt-2">
            <AcademyView />
          </div>
        )}

        {activeTab === 'community' && (
          <div className="pt-2">
            <CommunityView />
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="pt-2">
            <UserDashboardView />
          </div>
        )}
      </main>

      {/* 4. Financial Footer */}
      <Footer />

      {/* 5. Mobile Bottom Navigation */}
      <MobileNav />

      {/* 6. Global Modals & Alerts */}
      <DemoAccountModal />
      <LiveAccountKycModal />
      <AiAssistantModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <MarketProvider>
      <MainAppContent />
    </MarketProvider>
  );
}
