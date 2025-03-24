import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image   } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface CryptoCardProps {
  tokenName: string;
  balance: string;
  walletAddress: string;
}

const CryptoCard = ({ tokenName, balance, walletAddress }: CryptoCardProps) => {
  const { colors, theme } = useTheme();
  
  const [wholePart, decimalPart] = balance.split('.');

  const shadowStyle = {
    shadowColor: theme === 'dark' ? '#b1ff84' : '#000',
    shadowOffset: { width: 0, height: theme === 'dark' ? 7 : 3 },
    shadowOpacity: theme === 'dark' ? 0.6 : 0.3,
    shadowRadius: 4.84,
    elevation: 5,
  }
  
  return (
    <View style={[styles.cryptoAccountCard, {backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F5F5F5'}]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.cryptoAccountTitle, {color: colors.text}]}>CRYPTO ACCOUNT</Text>
        <View style={[styles.cryptoTypeRow, {backgroundColor: theme === 'dark' ? '#333' : '#E5E5E5'}]}>
          <Text style={{color: colors.text}}>USDT</Text>
          <Ionicons name="chevron-down" size={16} color={colors.text} />
        </View>
      </View>
      
      
      <View style={[styles.balanceCard, {backgroundColor: '#fff'}, shadowStyle]}>
        <View style={styles.balanceSection}>
          <Text style={styles.tokenLabel}>{tokenName} Tokens</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceAmount}>{wholePart}</Text>
            <Text style={styles.balanceDecimals}>.{decimalPart}</Text>
            <TouchableOpacity style={styles.withdrawButton}>
              <Text style={styles.withdrawText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.walletAddressContainer}>
            <Text style={styles.walletAddressLabel}>Wallet Address:</Text>
            <View style={styles.walletAddressRow}>
              <Text style={styles.walletAddress}>{walletAddress}</Text>
              <TouchableOpacity>
                <Ionicons name={'copy'} size={16} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.logoSection}>
          <View style={[styles.logoContainer, {backgroundColor: colors.primary}]}>
            {/* <Text style={styles.logoText}>P</Text> */}
            <Image source={require('../assets/images/logo.png')} style={styles.logoImage} />
            <Text style={styles.accountText}>{tokenName.toUpperCase()}</Text>
            <Text style={styles.accountLabel}>Account</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cryptoAccountCard: {
    borderRadius: 16,
    // padding: 16,
    marginBottom: 20
  },
  cryptoAccountTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  logoImage: {
    width: 50,
    height: 55,
  },
  cryptoTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    width: 80,
    marginBottom: 16,
  },
  balanceCard: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
  },
  balanceSection: {
    flex: 1,
  },
  tokenLabel: {
    fontSize: 14,
    color: '#000',
    marginBottom: 6,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  balanceDecimals: {
    fontSize: 20,
    color: '#000',
    marginRight: 8,
  },
  withdrawButton: {
    backgroundColor: '#333',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  withdrawText: {
    color: '#fff',
    fontSize: 12,
  },
  walletAddressContainer: {
    marginTop: 10,
  },
  walletAddressLabel: {
    fontSize: 12,
    color: '#000',
  },
  walletAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  walletAddress: {
    fontSize: 12,
    color: '#000',
    marginRight: 4,
    marginTop: 4,
  },
  logoSection: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 130,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 40,
    color: '#000',
    fontWeight: 'bold',
  },
  accountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  accountLabel: {
    fontSize: 10,
    color: '#000',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
});

export default CryptoCard; 