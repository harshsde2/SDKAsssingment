import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import Entypo from '@expo/vector-icons/Entypo';

interface ActionButtonsProps {
  onSend?: () => void;
  onReceive?: () => void;
  onAddBalance?: () => void;
}

const ActionButtons = ({ onSend, onReceive, onAddBalance }: ActionButtonsProps) => {
  const { colors, theme } = useTheme();

  return (
    <View style={styles.actionButtonsContainer}>
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: theme === 'dark' ? '#333' : '#E5E5E5' }]}
        onPress={onSend}
      >
        <View style={[styles.actionIconContainer, { borderColor: colors.text }]}>
          <Ionicons name="arrow-up-outline" size={20} color={theme === 'dark' ? colors.primary : colors.text} />
        </View>
        <Text style={[styles.actionText, { color: colors.text }]}>Send</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: theme === 'dark' ? '#333' : '#E5E5E5' }]}
        onPress={onReceive}
      >
        <View style={[styles.actionIconContainer, { borderColor: colors.text }]}>
          <Ionicons name="arrow-down-outline" size={20} color={theme === 'dark' ? colors.primary : colors.text} />
        </View>
        <Text style={[styles.actionText, { color: colors.text }]}>Receive</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.addBalanceButton, { backgroundColor: colors.primary }]}
        onPress={onAddBalance}
      >
        <View style={[styles.addBalanceIconContainer, { backgroundColor: theme === 'dark' ? '#333' : '#E5E5E5' }]}>
          <Ionicons name="wallet-outline" size={24} color={colors.text} />
        </View>
        <Text style={styles.addBalanceText}>Add Balance</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  addBalanceIconContainer: {
    width: 60,
    height: '100%',
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  actionButton: {
    width: '22%',
    height: 70,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIconContainer: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    padding: 5
  },
  actionText: {
    fontSize: 12,
  },
  addBalanceButton: {
    flexDirection: 'row',
    width: '48%',
    height: 70,
    borderRadius: 40,
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  addBalanceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginLeft: 4,
  },
});

export default ActionButtons; 