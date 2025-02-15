import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState({
    notifications: true,
    dailyReminder: true,
    soundEffects: true,
    darkMode: false,
    autoPlay: true,
  });

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          icon: 'account',
          label: 'Edit Profile',
          type: 'button',
          onPress: () => {
            // Navigate to edit profile
          },
        },
        {
          icon: 'email',
          label: 'Change Email',
          type: 'button',
          onPress: () => {
            // Navigate to email change
          },
        },
        {
          icon: 'lock',
          label: 'Change Password',
          type: 'button',
          onPress: () => {
            // Navigate to password change
          },
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: 'bell',
          label: 'Push Notifications',
          type: 'toggle',
          key: 'notifications',
        },
        {
          icon: 'clock',
          label: 'Daily Reminder',
          type: 'toggle',
          key: 'dailyReminder',
        },
      ],
    },
    {
      title: 'App Settings',
      items: [
        {
          icon: 'volume-high',
          label: 'Sound Effects',
          type: 'toggle',
          key: 'soundEffects',
        },
        {
          icon: 'theme-light-dark',
          label: 'Dark Mode',
          type: 'toggle',
          key: 'darkMode',
        },
        {
          icon: 'play-circle',
          label: 'Auto-play Lessons',
          type: 'toggle',
          key: 'autoPlay',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: 'help-circle',
          label: 'Help Center',
          type: 'button',
          onPress: () => {
            // Navigate to help center
          },
        },
        {
          icon: 'message',
          label: 'Contact Support',
          type: 'button',
          onPress: () => {
            // Navigate to support contact
          },
        },
        {
          icon: 'information',
          label: 'About',
          type: 'button',
          onPress: () => {
            // Show about info
          },
        },
      ],
    },
  ];

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Handle logout
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {settingsSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={styles.settingItem}
                onPress={item.type === 'button' ? item.onPress : undefined}
              >
                <View style={styles.settingLeft}>
                  <Icon name={item.icon} size={24} color="#666" />
                  <Text style={styles.settingLabel}>{item.label}</Text>
                </View>
                {item.type === 'toggle' && (
                  <Switch
                    value={settings[item.key as keyof typeof settings]}
                    onValueChange={(value) => handleSettingChange(item.key, value)}
                    trackColor={{ false: '#ddd', true: '#4CAF50' }}
                    thumbColor={settings[item.key as keyof typeof settings] ? '#fff' : '#f4f3f4'}
                  />
                )}
                {item.type === 'button' && (
                  <Icon name="chevron-right" size={24} color="#666" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={24} color="#FF4B4B" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Version Info */}
      <Text style={styles.version}>Version 1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  sectionContent: {
    backgroundColor: '#fff',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginVertical: 16,
    paddingVertical: 16,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#FF4B4B',
    fontWeight: '600',
  },
  version: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 32,
  },
});

export default SettingsScreen;
