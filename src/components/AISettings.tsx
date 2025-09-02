import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bot, Settings, Shield, Bell, Zap, Brain, Lock, AlertTriangle, Trash2, Save, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface AISettingsData {
  general: {
    aiAssistantEnabled: boolean;
    personality: string;
    language: string;
  };
  model: {
    modelType: string;
    responseLength: string;
    speedVsAccuracy: string;
  };
  privacy: {
    dataLogging: boolean;
    safeMode: boolean;
  };
  notifications: {
    aiAlerts: boolean;
    inAppNotifications: boolean;
    emailNotifications: boolean;
  };
}

const defaultAISettings: AISettingsData = {
  general: {
    aiAssistantEnabled: true,
    personality: 'Friendly',
    language: 'English'
  },
  model: {
    modelType: 'Standard',
    responseLength: 'Medium',
    speedVsAccuracy: 'Balanced'
  },
  privacy: {
    dataLogging: false,
    safeMode: true
  },
  notifications: {
    aiAlerts: true,
    inAppNotifications: true,
    emailNotifications: false
  }
};

export const AISettings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<AISettingsData>(defaultAISettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const [showClearHistoryModal, setShowClearHistoryModal] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('symbiotic-city-ai-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('symbiotic-city-ai-settings', JSON.stringify(settings));
    setHasChanges(true);
  }, [settings]);

  const handleSave = () => {
    setSavedMessage(true);
    setHasChanges(false);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  const handleToggle = (section: keyof AISettingsData, key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSelectChange = (section: keyof AISettingsData, key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleClearHistory = () => {
    // Simulate clearing AI history
    console.log('Clearing AI history...');
    setShowClearHistoryModal(false);
    // You can add actual API call here
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
                  <Bot className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gradient-primary">AI Settings</h1>
                  <p className="text-sm text-muted-foreground">Configure Your AI Experience</p>
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
          
          {/* General AI Preferences Section */}
          <motion.section variants={sectionVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-gradient-primary">General AI Preferences</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* AI Assistant Toggle */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">AI Assistant</label>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border/50 dark:bg-card dark:border-border/50">
                  <span className="text-foreground">Disabled</span>
                  <button
                    onClick={() => handleToggle('general', 'aiAssistantEnabled', !settings.general.aiAssistantEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${
                      settings.general.aiAssistantEnabled ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.general.aiAssistantEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="text-foreground">Enabled</span>
                </div>
              </motion.div>

              {/* AI Personality */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">AI Personality</label>
                <select
                  value={settings.general.personality}
                  onChange={(e) => handleSelectChange('general', 'personality', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all dark:bg-card dark:border-border/50"
                >
                  <option value="Friendly">Friendly</option>
                  <option value="Formal">Formal</option>
                  <option value="Technical">Technical</option>
                </select>
              </motion.div>

              {/* Language Selection */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Language</label>
                <select
                  value={settings.general.language}
                  onChange={(e) => handleSelectChange('general', 'language', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all dark:bg-card dark:border-border/50"
                >
                  <option value="English">English</option>
                  <option value="中文">中文</option>
                  <option value="Bahasa Melayu">Bahasa Melayu</option>
                  <option value="Tamil">Tamil</option>
                </select>
              </motion.div>
            </div>
          </motion.section>

          {/* Model & Performance Section */}
          <motion.section variants={sectionVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-secondary flex items-center justify-center">
                <Zap className="w-5 h-5 text-secondary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-gradient-secondary">Model & Performance</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Model Selection */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">AI Model</label>
                <select
                  value={settings.model.modelType}
                  onChange={(e) => handleSelectChange('model', 'modelType', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all dark:bg-card dark:border-border/50"
                >
                  <option value="Standard">Standard</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Experimental">Experimental</option>
                </select>
              </motion.div>

              {/* Response Length */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Response Length</label>
                <select
                  value={settings.model.responseLength}
                  onChange={(e) => handleSelectChange('model', 'responseLength', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all dark:bg-card dark:border-border/50"
                >
                  <option value="Short">Short</option>
                  <option value="Medium">Medium</option>
                  <option value="Long">Long</option>
                </select>
              </motion.div>

              {/* Speed vs Accuracy */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Speed vs Accuracy</label>
                <select
                  value={settings.model.speedVsAccuracy}
                  onChange={(e) => handleSelectChange('model', 'speedVsAccuracy', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all dark:bg-card dark:border-border/50"
                >
                  <option value="Fast">Fast</option>
                  <option value="Balanced">Balanced</option>
                  <option value="Accurate">Accurate</option>
                </select>
              </motion.div>
            </div>
          </motion.section>

          {/* Privacy & Security Section */}
          <motion.section variants={sectionVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-gradient-accent">Privacy & Security</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Data Logging Toggle */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">AI Data Logging</label>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border/50 dark:bg-card dark:border-border/50">
                  <span className="text-foreground">Disabled</span>
                  <button
                    onClick={() => handleToggle('privacy', 'dataLogging', !settings.privacy.dataLogging)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 ${
                      settings.privacy.dataLogging ? 'bg-accent' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.privacy.dataLogging ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="text-foreground">Enabled</span>
                </div>
              </motion.div>

              {/* Safe Mode Toggle */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Safe Mode</label>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border/50 dark:bg-card dark:border-border/50">
                  <span className="text-foreground">Disabled</span>
                  <button
                    onClick={() => handleToggle('privacy', 'safeMode', !settings.privacy.safeMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 ${
                      settings.privacy.safeMode ? 'bg-accent' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.privacy.safeMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="text-foreground">Enabled</span>
                </div>
              </motion.div>

              {/* Clear History Button */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">AI History</label>
                <Button
                  variant="outline"
                  onClick={() => setShowClearHistoryModal(true)}
                  className="w-full border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear AI History
                </Button>
              </motion.div>
            </div>
          </motion.section>

          {/* Notifications Section */}
          <motion.section variants={sectionVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-gradient-primary">Notifications</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* AI Alerts Toggle */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">AI Alerts</label>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border/50 dark:bg-card dark:border-border/50">
                  <span className="text-foreground">Disabled</span>
                  <button
                    onClick={() => handleToggle('notifications', 'aiAlerts', !settings.notifications.aiAlerts)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${
                      settings.notifications.aiAlerts ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.notifications.aiAlerts ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="text-foreground">Enabled</span>
                </div>
              </motion.div>

              {/* In-App Notifications Toggle */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">In-App Notifications</label>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border/50 dark:bg-card dark:border-border/50">
                  <span className="text-foreground">Disabled</span>
                  <button
                    onClick={() => handleToggle('notifications', 'inAppNotifications', !settings.notifications.inAppNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${
                      settings.notifications.inAppNotifications ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.notifications.inAppNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="text-foreground">Enabled</span>
                </div>
              </motion.div>

              {/* Email Notifications Toggle */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">Email Notifications</label>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border/50 dark:bg-card dark:border-border/50">
                  <span className="text-foreground">Disabled</span>
                  <button
                    onClick={() => handleToggle('notifications', 'emailNotifications', !settings.notifications.emailNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${
                      settings.notifications.emailNotifications ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.notifications.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className="text-foreground">Enabled</span>
                </div>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </motion.main>

      {/* Clear History Modal */}
      <AnimatePresence>
        {showClearHistoryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border/50 rounded-lg p-6 max-w-md w-full dark:bg-card dark:border-border/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Clear AI History</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                This will permanently delete all AI conversation history and learning data. This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowClearHistoryModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleClearHistory}
                >
                  Clear History
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
