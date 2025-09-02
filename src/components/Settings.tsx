import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Palette, Bell, Globe, Monitor, Clock, Calendar, Save, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface SettingsData {
  profile: {
    username: string;
    email: string;
  };
  theme: 'dark' | 'light';
  notifications: boolean;
  preferences: {
    language: string;
    dashboardLayout: string;
    timezone: string;
    dateFormat: string;
  };
}

const defaultSettings: SettingsData = {
  profile: {
    username: 'Digital Citizen',
    email: 'citizen@new-singapore-2070.gov.sg'
  },
  theme: 'dark',
  notifications: true,
  preferences: {
    language: 'English',
    dashboardLayout: 'Grid',
    timezone: 'Asia/Singapore',
    dateFormat: 'DD/MM/YYYY'
  }
};

export const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('symbiotic-city-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('symbiotic-city-settings', JSON.stringify(settings));
    setHasChanges(true);
  }, [settings]);

  const handleSave = () => {
    setSavedMessage(true);
    setHasChanges(false);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  const handleProfileEdit = (field: 'username' | 'email') => {
    setIsEditing(field);
  };

  const handleProfileSave = (field: 'username' | 'email', value: string) => {
    setSettings(prev => ({
      ...prev,
      profile: { ...prev.profile, [field]: value }
    }));
    setIsEditing(null);
  };

  const handleThemeToggle = () => {
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark'
    }));
    // Apply theme to document
    document.documentElement.classList.toggle('light');
  };

  const handleNotificationsToggle = () => {
    setSettings(prev => ({
      ...prev,
      notifications: !prev.notifications
    }));
  };

  const handlePreferenceChange = (key: keyof SettingsData['preferences'], value: string) => {
    setSettings(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value }
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border/50 bg-gradient-surface backdrop-blur-xl sticky top-0 z-50 dark:bg-gradient-surface dark:border-border/50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="hover:bg-accent/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gradient-primary">Settings</h1>
                  <p className="text-sm text-muted-foreground">Customize Your Digital Experience</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <AnimatePresence>
                {savedMessage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-success/20 border border-success/30 text-success"
                  >
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">Settings Saved!</span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <Button 
                onClick={handleSave}
                disabled={!hasChanges}
                className="glow-primary"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 py-8"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Profile Section */}
          <motion.section variants={sectionVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-gradient-primary">Profile</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Username</label>
                <div className="relative">
                  {isEditing === 'username' ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={settings.profile.username}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          profile: { ...prev.profile, username: e.target.value }
                        }))}
                        className="flex-1 px-4 py-3 rounded-lg bg-card border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all dark:bg-card dark:border-border/50"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        onClick={() => handleProfileSave('username', settings.profile.username)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-colors dark:bg-card dark:border-border/50 dark:hover:border-primary/50">
                      <span className="text-foreground">{settings.profile.username}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleProfileEdit('username')}
                        className="hover:bg-accent/10"
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <div className="relative">
                  {isEditing === 'email' ? (
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          profile: { ...prev.profile, email: e.target.value }
                        }))}
                        className="flex-1 px-4 py-3 rounded-lg bg-card border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all dark:bg-card dark:border-border/50"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        onClick={() => handleProfileSave('email', settings.profile.email)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-colors dark:bg-card dark:border-border/50 dark:hover:border-primary/50">
                      <span className="text-foreground">{settings.profile.email}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleProfileEdit('email')}
                        className="hover:bg-accent/10"
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Theme Section */}
          <motion.section variants={sectionVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-secondary flex items-center justify-center">
                <Palette className="w-5 h-5 text-secondary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-gradient-secondary">Theme</h2>
            </div>
            
            <motion.div variants={itemVariants} className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">Appearance</label>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border/50 dark:bg-card dark:border-border/50">
                <span className="text-foreground">Dark Mode</span>
                <button
                  onClick={handleThemeToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${
                    settings.theme === 'dark' ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-foreground">Light Mode</span>
              </div>
            </motion.div>
          </motion.section>

          {/* Notifications Section */}
          <motion.section variants={sectionVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center">
                <Bell className="w-5 h-5 text-accent-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-gradient-accent">Notifications</h2>
            </div>
            
            <motion.div variants={itemVariants} className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">All Notifications</label>
              <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border/50 dark:bg-card dark:border-border/50">
                <span className="text-foreground">Enable Notifications</span>
                <button
                  onClick={handleNotificationsToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 ${
                    settings.notifications ? 'bg-accent' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-foreground">Disable Notifications</span>
              </div>
            </motion.div>
          </motion.section>

          {/* App Preferences Section */}
          <motion.section variants={sectionVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Monitor className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-gradient-primary">App Preferences</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Language */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Language</label>
                <select
                  value={settings.preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all dark:bg-card dark:border-border/50"
                >
                  <option value="English">English</option>
                  <option value="中文">中文</option>
                  <option value="Bahasa Melayu">Bahasa Melayu</option>
                  <option value="Tamil">Tamil</option>
                </select>
              </motion.div>

              {/* Dashboard Layout */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Dashboard Layout</label>
                <select
                  value={settings.preferences.dashboardLayout}
                  onChange={(e) => handlePreferenceChange('dashboardLayout', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all dark:bg-card dark:border-border/50"
                >
                  <option value="Grid">Grid Layout</option>
                  <option value="List">List Layout</option>
                  <option value="Compact">Compact Layout</option>
                  <option value="Expanded">Expanded Layout</option>
                </select>
              </motion.div>

              {/* Timezone */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Timezone</label>
                <select
                  value={settings.preferences.timezone}
                  onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all dark:bg-card dark:border-border/50"
                >
                  <option value="Asia/Singapore">Asia/Singapore (UTC+8)</option>
                  <option value="UTC">UTC (UTC+0)</option>
                  <option value="America/New_York">America/New_York (UTC-5)</option>
                  <option value="Europe/London">Europe/London (UTC+0)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
                </select>
              </motion.div>

              {/* Date Format */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Date Format</label>
                <select
                  value={settings.preferences.dateFormat}
                  onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all dark:bg-card dark:border-border/50"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                </select>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </motion.main>
    </div>
  );
};
