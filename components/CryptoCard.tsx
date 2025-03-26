import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, LayoutChangeEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  useDerivedValue,
  FadeOut,
  runOnJS,
  withSpring,
  FadeIn,
  SlideInDown,
  SlideOutUp
} from 'react-native-reanimated'

interface CryptoCardProps {
  tokenName: string;
  balance: string;
  walletAddress: string;
}

// Account data constants
const ACCOUNTS = {
  CRYPTO: {
    id: 1,
    balanceName: 'Payairo Balance',
    name: 'Crypto Wallet.',
    balance: '$25,076.08',
    tabBackgroundColor: '#fff',
    // cardBackgroundColor is set dynamically with colors.primary
    addressName: 'Payairo ID',
    walletAddress: 'Frances_swann568@payairo.com',
    logo: require('../assets/images/logo2.png'),
  },
  PAYAIRO: {
    id: 2,
    balanceName: 'Payairo Tokens',
    name: 'Payairo Account.',
    balance: '75,182.10',
    tabBackgroundColor: null, // Set dynamically with colors.primary
    cardBackgroundColor: '#fff',
    addressName: 'Wallet Address',
    walletAddress: '0x36572a65f3c8.........b15E5',
    logo: require('../assets/images/logo.png'),
  }
};

// Animation constants
const ANIMATION_CONFIG = {
  TIMING_DURATION: 1100,
  FADE_DURATION: 800,
  TEXT_DURATION: 1000,
  EASING: Easing.bezier(0.25, 0.1, 0.25, 1),
  COLLAPSE_DURATION: 500,
};

// Component dimensions
const DIMENSIONS = {
  LOGO_WIDTH: 85,
  LOGO_HEIGHT: 120,
  CARD_HEIGHT: 140,
};

const CryptoCard = ({ tokenName, balance, walletAddress }: CryptoCardProps) => {
  const { colors, theme } = useTheme();
  
  // Initialize account data with theme-specific colors
  const cryptoWallet = {
    ...ACCOUNTS.CRYPTO,
    cardBackgroundColor: colors.primary,
  };
  
  const payairoAccount = {
    ...ACCOUNTS.PAYAIRO,
    tabBackgroundColor: colors.primary,
  };

  // ========== STATE MANAGEMENT ==========
  // Card data
  const [userData, setUserData] = useState({ ...cryptoWallet });
  const [wholePart, decimalPart] = userData?.balance.split('.');
  const [namePart, accountPart] = userData?.name.split(' ');
  
  // Animation states
  const [expanded, setExpanded] = useState(false);
  const [isLogoPressed, setIsLogoPressed] = useState(false);
  
  // Card layout
  const { width: screenWidth } = Dimensions.get('window');
  const [cardWidth, setCardWidth] = useState(screenWidth - 40);
  
  // Visibility states - grouped together for clarity
  const [visible, setVisible] = useState(true);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [addressVisible, setAddressVisible] = useState(true);
  const [logoVisible, setLogoVisible] = useState(true);
  const [textVisible, setTextVisible] = useState(true);
  const [cryptoAccountTitleVisible, setCryptoAccountTitleVisible] = useState(true);
  const [cryptoAccountTitle, setCryptoAccountTitle] = useState('CRYPTO ACCOUNT');

  // ========== ANIMATION VALUES ==========
  // Core animation values
  const progress = useSharedValue(0);
  const scale = useSharedValue(1);
  const cardTranslateX = useSharedValue(0);
  const cardTranslateY = useSharedValue(0);
  const cardOpacity = useSharedValue(1);
  
  // Derived animation values
  const animatedWidth = useDerivedValue(() => 
    interpolate(progress.value, [0, 1], [DIMENSIONS.LOGO_WIDTH, cardWidth])
  );
  
  const animatedHeight = useDerivedValue(() => 
    interpolate(progress.value, [0, 1], [DIMENSIONS.LOGO_HEIGHT, DIMENSIONS.CARD_HEIGHT])
  );
  
  const contentOpacity = useDerivedValue(() => 
    interpolate(progress.value, [0, 0.2, 0.6, 0.8, 1], [1, 0.8, 0.6, 0.6, 0.6])
  );
  
  const logoOpacity = useDerivedValue(() => 
    interpolate(progress.value, [0, 0.2, 0.6, 0.8, 1], [1, 0.95, 0.9, 0.85, 1])
  );
  
  const animatedTranslateX = useDerivedValue(() => 
    interpolate(progress.value, [0, 1], [0, 10])
  );
  
  const animatedTranslateY = useDerivedValue(() => 
    interpolate(progress.value, [0, 1], [0, -(DIMENSIONS.CARD_HEIGHT - DIMENSIONS.LOGO_HEIGHT) / 2])
  );

  // ========== ANIMATED STYLES ==========
  const shadowStyle = {
    shadowColor: theme === 'dark' ? '#b1ff84' : '#000',
    shadowOffset: { width: 0, height: theme === 'dark' ? 7 : 3 },
    shadowOpacity: theme === 'dark' ? 0.6 : 0.3,
    shadowRadius: 4.84,
    elevation: 5,
  };
  
  const animatedLogoStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: 10,
    right: 10,
    opacity: logoOpacity.value,
    width: animatedWidth.value,
    height: animatedHeight.value,
    transform: [
      { translateX: animatedTranslateX.value },
      { translateY: animatedTranslateY.value },
      { scale: scale.value }
    ],
    borderRadius: 12,
    overflow: 'hidden',
    zIndex: progress.value > 0 ? 10 : 1,
    backgroundColor: userData.tabBackgroundColor,
  }));
  
  const animatedContentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    position: 'absolute',
    left: 16,
    top: 16,
    right: DIMENSIONS.LOGO_WIDTH + 16,
    bottom: 16,
    zIndex: 5,
  }));
  
  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: cardTranslateX.value },
      { translateY: cardTranslateY.value }
    ],
    opacity: cardOpacity.value,
  }));

  // ========== EVENT HANDLERS ==========
  const onCardLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setCardWidth(width);
  };
  
  // ========== ANIMATION FUNCTIONS ==========
  const handleTextChange = () => {
    setCryptoAccountTitleVisible(false);
    setTextVisible(false);

    setTimeout(() => {
      setCryptoAccountTitle(cryptoAccountTitle === 'CRYPTO ACCOUNT' ? 'PAYAIRO ACCOUNT' : 'CRYPTO ACCOUNT');
      setCryptoAccountTitleVisible(true);
      setTextVisible(true);
    }, 10);
  };
  
  const hideElements = () => {
    setVisible(false);
    setBalanceVisible(false);
    setAddressVisible(false);
    setLogoVisible(false);
  };
  
  const showElements = () => {
    setLogoVisible(true);
    setBalanceVisible(true);
    setAddressVisible(true);
  };
  
  const handleAnimationComplete = () => {
    hideElements();

    setTimeout(() => {
      setExpanded(false);
      progress.value = 0;
      scale.value = 0;
      setVisible(true);

      // Switch account data
      setUserData(userData.balanceName === cryptoWallet.balanceName ? payairoAccount : cryptoWallet);

      // Show elements with delay
      setTimeout(() => {
        showElements();
      }, 100);

      // Scale animation
      scale.value = withTiming(1, {
        duration: ANIMATION_CONFIG.TIMING_DURATION,
        easing: ANIMATION_CONFIG.EASING,
      });
    }, 500);

    // Update header text
    setTimeout(() => {
      handleTextChange();
    }, 500);
  };

  const onPayairoAccountAnimation = () => {
    scale.value = withTiming(0, {
      duration: ANIMATION_CONFIG.TIMING_DURATION,
      easing: ANIMATION_CONFIG.EASING,
    });

    hideElements();

    setTimeout(() => {
      scale.value = 0;
      setUserData({ ...cryptoWallet });
      
      setTimeout(() => {
        showElements();
      }, 100);

      scale.value = withTiming(1, {
        duration: ANIMATION_CONFIG.TIMING_DURATION,
        easing: ANIMATION_CONFIG.EASING,
      });
    }, 500);

    setTimeout(() => {
      // Card translation animations
      const translateConfig = {
        duration: 800,
        easing: ANIMATION_CONFIG.EASING,
      };
      
      cardTranslateX.value = withTiming(20, translateConfig);
      cardTranslateY.value = withTiming(20, translateConfig);
      
      cardOpacity.value = withTiming(0, translateConfig, (finished) => {
        if (finished) {
          cardTranslateX.value = withTiming(0, { duration: 0 });
          cardTranslateY.value = withTiming(0, { duration: 0 });
        }
      });
    }, 850);

    setTimeout(() => {
      handleTextChange();
    }, 500);
  };

  const toggleCardSize = (isCrypto: boolean) => {
    if (isCrypto) {
      const newExpanded = progress.value === 0;
      if (newExpanded) {
        // Expanding
        progress.value = withTiming(1, {
          duration: ANIMATION_CONFIG.TIMING_DURATION,
          easing: ANIMATION_CONFIG.EASING,
        }, (finished) => {
          if (finished) {
            runOnJS(handleAnimationComplete)();
          }
        });
      } else {
        // Collapsing
        progress.value = withTiming(0, {
          duration: ANIMATION_CONFIG.COLLAPSE_DURATION,
          easing: ANIMATION_CONFIG.EASING,
        });
      }
    } else {
      onPayairoAccountAnimation();
    }
  };

  // ========== COMPONENT RENDERING ==========
  const renderCardContent = () => (
    <Animated.View style={animatedContentStyle} exiting={FadeOut.duration(500)}>
      <Text style={styles.tokenLabel}>{userData.balanceName}</Text>

      {balanceVisible && (
        <Animated.View
          style={styles.balanceRow}
          entering={FadeIn.duration(ANIMATION_CONFIG.FADE_DURATION)}
          exiting={FadeOut.duration(400)}
        >
          <Text style={styles.balanceAmount}>{wholePart}</Text>
          <Text style={styles.balanceDecimals}>.{decimalPart}</Text>
          <TouchableOpacity style={styles.withdrawButton}>
            <Text style={styles.withdrawText}>Withdraw</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {addressVisible && (
        <Animated.View
          style={styles.walletAddressContainer}
          entering={FadeIn.duration(ANIMATION_CONFIG.FADE_DURATION).delay(100)}
          exiting={FadeOut.duration(400)}
        >
          <Text style={styles.walletAddressLabel}>{userData.addressName}:</Text>
          <View style={styles.walletAddressRow}>
            <Text style={styles.walletAddress}>{userData.walletAddress}</Text>
            <TouchableOpacity>
              <Ionicons name={'copy'} size={16} color="#000" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </Animated.View>
  );

  const renderLogoContent = () => (
    <TouchableOpacity 
      onPress={() => toggleCardSize(userData.id === 1)} 
      activeOpacity={1} 
      style={styles.logoContentContainer}
    >
      {logoVisible && (
        <Animated.View
          entering={FadeIn.duration(ANIMATION_CONFIG.FADE_DURATION)}
          exiting={FadeOut.duration(400)}
        >
          <Image source={userData.logo} style={styles.logoImage} />
        </Animated.View>
      )}
      <View style={{ width: 70, height: 20 }} />
      <View style={styles.logoTextContainer}>
        {textVisible ? (
          <Animated.View
            style={styles.textAnimatedContainer}
            entering={SlideInDown.duration(ANIMATION_CONFIG.TEXT_DURATION).springify().damping(80).stiffness(50)}
            exiting={SlideOutUp.duration(ANIMATION_CONFIG.TEXT_DURATION)}
          >
            <Text style={styles.accountText}>{namePart.toUpperCase()}</Text>
            <Text style={styles.accountLabel}>{accountPart}</Text>
          </Animated.View>
        ) : null}
      </View>
    </TouchableOpacity>
  );

  const renderCard = (isAbsolute = false) => (
    <View
      style={[
        styles.balanceCard,
        {
          backgroundColor: userData.cardBackgroundColor,
          ...(isAbsolute ? {
            position: 'absolute',
            top: 60,
            left: 0,
            right: 0,
            bottom: 0,
          } : {})
        },
        shadowStyle,
        animatedCardStyle
      ]}
      onLayout={onCardLayout}
    >
      {renderCardContent()}
      {renderLogoContent()}
      <Animated.View style={animatedLogoStyle} />
    </View>
  );

  return (
    <View style={[styles.cryptoAccountCard, { backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F5F5F5' }]}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
          {cryptoAccountTitleVisible ? (
            <Animated.View
              style={styles.titleAnimatedContainer}
              entering={SlideInDown.duration(ANIMATION_CONFIG.TEXT_DURATION).springify().damping(80).stiffness(50)}
              exiting={SlideOutUp.duration(ANIMATION_CONFIG.TEXT_DURATION)}
            >
              <Text style={[styles.cryptoAccountTitle, { color: colors.text }]}>
                {cryptoAccountTitle}
              </Text>
            </Animated.View>
          ) : null}
        </View>
        <View style={[styles.cryptoTypeRow, { backgroundColor: theme === 'dark' ? '#333' : '#E5E5E5' }]}>
          <Text style={{ color: colors.text }}>USDT</Text>
          <Ionicons name="chevron-down" size={16} color={colors.text} />
        </View>
      </View>

      {/* First card - absolute positioned */}
      {renderCard(true)}
      
      {/* Second card - for animation effect */}
      {renderCard(false)}
    </View>
  );
};

const styles = StyleSheet.create({
  cryptoAccountCard: {
    borderRadius: 16,
    marginBottom: 20
  },
  cryptoAccountTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  logoTextContainer: {
    position: 'absolute',
    right: 0,
    bottom: 10,
    width: 70,
    height: 40, // Increased height to give room for both text elements
    overflow: 'hidden', // Crucial for containing the animation
  },
  textAnimatedContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 50,
    height: 55,
    marginBottom: 10,
  },
  cryptoTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    width: 80,
    // marginBottom: 16,
  },
  balanceCard: {
    borderRadius: 16,
    padding: 0,
    position: 'relative',
    height: 140,
    overflow: 'hidden',
  },
  balanceSection: {
    paddingLeft: 16,
    paddingTop: 16,
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
    fontWeight: "bold",
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

  logoContentContainer: {
    position: 'absolute',
    // width: '100%',
    right: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    zIndex: 15,
    top: 10,

  },
  accountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  accountLabel: {
    width: "100%",
    fontSize: 10,
    color: '#000',
    textAlign: "right",
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitleContainer: {
    flex: 1,
    height: 30, // Increased from 24 to 30
    overflow: 'hidden',
    justifyContent: 'center',
  },
  titleAnimatedContainer: {
    width: '100%',
    alignItems: 'flex-start', // To align text left
    justifyContent: 'center',
  },
});

export default CryptoCard; 