import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { ImageVideoUpload } from './components/ImageVideoUpload';
import { ArticleVerification } from './components/ArticleVerification';
import { HistoryPage } from './components/HistoryPage';
import { ProjectsPage } from './components/ProjectsPage';
import { OrganizationPage } from './components/OrganizationPage';
import { SettingsPage } from './components/SettingsPage';
import { Navigation } from './components/Navigation';

export type UserMode = 'Basic' | 'Creator' | 'Professional';
export type Page = 'landing' | 'dashboard' | 'verify-media' | 'verify-article' | 'history' | 'projects' | 'organization' | 'settings';

export default function App() {
    const [currentPage, setCurrentPage] = useState<Page>('landing');
    const [userMode, setUserMode] = useState<UserMode>('Basic');

    const renderPage = () => {
        switch (currentPage) {
            case 'landing':
                return <LandingPage onNavigate={setCurrentPage} />;
            case 'dashboard':
                return <Dashboard onNavigate={setCurrentPage} userMode={userMode} />;
            case 'verify-media':
                return <ImageVideoUpload userMode={userMode} />;
            case 'verify-article':
                return <ArticleVerification userMode={userMode} />;
            case 'history':
                return <HistoryPage />;
            case 'projects':
                return <ProjectsPage userMode={userMode} />;
            case 'organization':
                return <OrganizationPage />;
            case 'settings':
                return <SettingsPage />;
            default:
                return <LandingPage onNavigate={setCurrentPage} />;
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white">
            {currentPage !== 'landing' && (
                <Navigation
                    currentPage={currentPage}
                    onNavigate={setCurrentPage}
                    userMode={userMode}
                    onModeChange={setUserMode}
                />
            )}
            {renderPage()}
        </div>
    );
}
