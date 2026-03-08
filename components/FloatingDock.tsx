import React from 'react';
import { StudentTab, SystemSettings } from '../types';

interface Props {
    onTabSelect: (tab: StudentTab) => void;
    onGoHome: () => void;
    onGoBack: () => void;
    isStudent: boolean;
    settings?: SystemSettings;
}

export const FloatingDock: React.FC<Props> = () => {
    // The Floating Dock's quick navigation features have been migrated
    // directly into the FloatingActionMenu (floating app logo button).
    // This component now returns null to prevent duplicate UI rendering.
    return null;
};
