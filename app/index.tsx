import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import CryptoCard from '../components/CryptoCard';
import ActionButtons from '../components/ActionButtons';
import AssetsList from '../components/AssetsList';
import PieChartPlaceholder from '../components/PieChartPlaceholder';

export default function HomeScreen() {
  const router = useRouter();
  const { colors, theme } = useTheme();

  // Mock data
  const chartData = [
    { label: 'Solana', value: 62.5, color: 'white' },
    { label: 'Ethereum', value: 25.46, color: '#b1ff84' },
    { label: 'Bitcoin', value: 11.82, color: '#888' },
  ];

  const assets = [
    { symbol: 'SOL', name: 'Solana', quantity: '258,58', value: '258,58 USDT', image: require('../assets/images/solana.png') },
    { symbol: 'ETH', name: 'Ethereum', quantity: '485,25', value: '588,78 USDT', image: require('../assets/images/ethereum.png') },
    { symbol: 'BTC', name: 'Bitcoin', quantity: '18.21', value: '32556,58 USDT', image: require('../assets/images/bitcoin.png') },
  ];

  const shadowStyle = {
    shadowColor: theme === 'dark' ? '#b1ff84' : '#000',
    shadowOffset: { width: 0, height: theme === 'dark' ? 7 : 3 },
    shadowOpacity: theme === 'dark' ? 0.6 : 0.3,
    shadowRadius: 4.84,
    elevation: 5,
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Header with welcome and profile */}
          <View style={styles.header}>
            <View style={styles.profileSection}>
              <View style={[styles.profileIcon, { backgroundColor: colors.primary }]}>
                <Image source={require('../assets/images/logo.png')} style={{width: 24, height: 26}} />
              </View>
              <View style={styles.welcomeText}>
                <Text style={[styles.welcomeBack, { color: colors.text }]}>Welcome Back,</Text>
                <Text style={[styles.userName, { color: colors.text }]}>Daniel Hamilton</Text>
              </View>
            </View>
            <TouchableOpacity style={[styles.notificationButton, { backgroundColor: theme === 'dark' ? '#333' : '#f0f0f0' }]}>
              <Ionicons name="notifications-outline" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Crypto Account Card */}
          <CryptoCard
            tokenName="Payairo"
            balance="75182.10"
            walletAddress="0x36572a65f3c8.........b15E5"
          />

          {/* Action Buttons */}
          <ActionButtons
            onSend={() => console.log('Send pressed')}
            onReceive={() => console.log('Receive pressed')}
            onAddBalance={() => console.log('Add Balance pressed')}
          />
        </View>
        <View style={[styles.contentContainer2, { backgroundColor: '#fff' }]}>
          <Text style={[styles.assetsTitle, { color: '#000' }]}>PnL & Assets Allocation</Text>
          {/* PnL & Assets Allocation */}
          <View style={[styles.assetsContainer, { backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F5F5F5' , ...shadowStyle}]}>

            {/* Tab selector */}
            <View style={styles.tabContainer}>
              <TouchableOpacity style={[styles.tabButton, { backgroundColor: theme === 'dark' ? '#333' : '#E5E5E5' }]}>
                <Text style={{ color: colors.text }}>PnL(%)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.tabButton, { backgroundColor: colors.primary }]}>
                <Text style={{ color: '#000' }}>Assets</Text>
              </TouchableOpacity>
              <View style={styles.tabSpacer} />
              <TouchableOpacity style={[styles.periodButton, { backgroundColor: theme === 'dark' ? '#333' : '#E5E5E5' }]}>
                <Text style={{ color: colors.text }}>Yearly</Text>
                <Ionicons name="chevron-down" size={16} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Pie Chart */}
            <PieChartPlaceholder data={chartData} />

            {/* Assets List */}
            <AssetsList assets={assets} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => router.push('/form')} style={[styles.button, { backgroundColor: colors.primary }]}>
                <Text style={styles.buttonText}>Go to form</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/sdk-integration')} style={[styles.button, { backgroundColor: colors.primary }]}>
                <Text style={styles.buttonText}>Try SDK</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  button: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  contentContainer: {
    padding: 16,
  },
  contentContainer2: {
    padding: 16,
    borderRadius: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    marginLeft: 12,
  },
  welcomeBack: {
    fontSize: 14,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  assetsContainer: {
    borderRadius: 16,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  assetsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  tabSpacer: {
    flex: 1,
  },
  periodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
});
