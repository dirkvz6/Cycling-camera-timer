import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Info, 
  Trash2, 
  Camera, 
  Timer, 
  Volume2,
  Vibrate,
  ChevronRight 
} from 'lucide-react-native';
import { useTimingStore } from '@/stores/timingStore';

export default function SettingsScreen() {
  const { clearHistory } = useTimingStore();
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [vibrationEnabled, setVibrationEnabled] = React.useState(true);
  const [autoSave, setAutoSave] = React.useState(true);

  const handleClearHistory = () => {
    Alert.alert(
      'Clear All History',
      'Are you sure you want to clear all race history? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: clearHistory,
        },
      ]
    );
  };

  const SettingRow = ({ 
    icon, 
    title, 
    description, 
    onPress, 
    rightElement 
  }: {
    icon: React.ReactNode;
    title: string;
    description?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity style={styles.settingRow} onPress={onPress}>
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {description && (
            <Text style={styles.settingDescription}>{description}</Text>
          )}
        </View>
      </View>
      {rightElement || <ChevronRight size={20} color="#9CA3AF" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timing Preferences</Text>
          
          <SettingRow
            icon={<Volume2 size={20} color="#2563EB" />}
            title="Sound Effects"
            description="Play sounds when starting/stopping timer"
            rightElement={
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: '#E5E7EB', true: '#DBEAFE' }}
                thumbColor={soundEnabled ? '#2563EB' : '#9CA3AF'}
              />
            }
          />

          <SettingRow
            icon={<Vibrate size={20} color="#2563EB" />}
            title="Haptic Feedback"
            description="Vibrate when recording lap times"
            rightElement={
              <Switch
                value={vibrationEnabled}
                onValueChange={setVibrationEnabled}
                trackColor={{ false: '#E5E7EB', true: '#DBEAFE' }}
                thumbColor={vibrationEnabled ? '#2563EB' : '#9CA3AF'}
              />
            }
          />

          <SettingRow
            icon={<Timer size={20} color="#2563EB" />}
            title="Auto-Save Races"
            description="Automatically save completed races"
            rightElement={
              <Switch
                value={autoSave}
                onValueChange={setAutoSave}
                trackColor={{ false: '#E5E7EB', true: '#DBEAFE' }}
                thumbColor={autoSave ? '#2563EB' : '#9CA3AF'}
              />
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Camera Settings</Text>
          
          <SettingRow
            icon={<Camera size={20} color="#2563EB" />}
            title="Camera Resolution"
            description="Optimize for performance or quality"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          
          <SettingRow
            icon={<Trash2 size={20} color="#EF4444" />}
            title="Clear All History"
            description="Delete all recorded races permanently"
            onPress={handleClearHistory}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <SettingRow
            icon={<Info size={20} color="#2563EB" />}
            title="App Information"
            description="Version 1.0.0 - Track Cycling Timer"
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Designed for professional track cycling timing
          </Text>
          <Text style={styles.footerSubtext}>
            Accurate to 10ms precision
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    padding: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 40,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});