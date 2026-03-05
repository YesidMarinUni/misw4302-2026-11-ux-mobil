import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { AlarmProvider, useAlarm, SCREENS } from '../AlarmContext';
import BottomTabBar from '../components/BottomTabBar';

import HomeScreen from './main/HomeScreen';
import SleepScreen from './main/SleepScreen';
import MorningScreen from './main/MorningScreen';
import ToolsScreen from './main/ToolsScreen';
import CreateEditScreen from './main/CreateEditScreen';
import PurposeEditorScreen from './main/PurposeEditorScreen';
import AlarmRingingScreen from './main/AlarmRingingScreen';
import SnoozePickerScreen from './main/SnoozePickerScreen';
import FeedbackScreen from './main/FeedbackScreen';
import FocusScreen from './main/FocusScreen';
import GoodMorningScreen from './main/GoodMorningScreen';

const TAB_SCREENS = [SCREENS.HOME, SCREENS.TAB_SLEEP, SCREENS.TAB_MORNING, SCREENS.TAB_TOOLS];

function AppContent() {
  const { screen, goHome, navigateSleep, navigateMorning, navigateTools } = useAlarm();
  const [activeTab, setActiveTab] = useState('alarms');

  const showTabBar = TAB_SCREENS.includes(screen);

  useEffect(() => {
    if (screen === SCREENS.HOME) setActiveTab('alarms');
    else if (screen === SCREENS.TAB_SLEEP) setActiveTab('sleep');
    else if (screen === SCREENS.TAB_MORNING) setActiveTab('morning');
    else if (screen === SCREENS.TAB_TOOLS) setActiveTab('tools');
  }, [screen]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'alarms') goHome();
    else if (tab === 'sleep') navigateSleep();
    else if (tab === 'morning') navigateMorning();
    else if (tab === 'tools') navigateTools();
  };

  const renderScreen = () => {
    switch (screen) {
      case SCREENS.HOME: return <HomeScreen />;
      case SCREENS.TAB_SLEEP: return <SleepScreen />;
      case SCREENS.TAB_MORNING: return <MorningScreen />;
      case SCREENS.TAB_TOOLS: return <ToolsScreen />;
      case SCREENS.CREATE_EDIT: return <CreateEditScreen />;
      case SCREENS.PURPOSE_EDITOR: return <PurposeEditorScreen />;
      case SCREENS.ALARM_RINGING: return <AlarmRingingScreen />;
      case SCREENS.SNOOZE_PICKER: return <SnoozePickerScreen />;
      case SCREENS.FEEDBACK: return <FeedbackScreen />;
      case SCREENS.EXTRAS_FOCUS: return <FocusScreen />;
      case SCREENS.GOOD_MORNING: return <GoodMorningScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {renderScreen()}
      </View>
      {showTabBar && (
        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </View>
  );
}

export default function MainScreen({ navigation }) {
  const handleLogout = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <AlarmProvider onLogout={handleLogout}>
      <AppContent />
    </AlarmProvider>
  );
}
