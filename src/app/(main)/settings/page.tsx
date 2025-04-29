import SettingsPage from '@/modules/settings/components/SettingsPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your categories, sources, and other settings.',
};

const Settings = () => {
  return <SettingsPage />;
};

export default Settings;
