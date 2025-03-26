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

const CryptoCard = ({ tokenName, balance, walletAddress }: CryptoCardProps) => {
  const { colors, theme } = useTheme();

  const cryptoWallet = {
    id: 1,
    balanceName: 'Payairo Balance',
    name: 'Crypto Wallet.',
    balance: '$25,076.08',
    tabBackgroundColor: '#fff',
    cardBackgroundColor: colors.primary,
    addressName: 'Payairo ID',
    walletAddress: 'Frances_swann568@payairo.com',
    logo: require('../assets/images/logo2.png'),
  }

  const payairoAccount = {
    id: 2,
    balanceName: 'Payairo Tokens',
    name: 'Payairo Account.',
    balance: '75,182.10',
    tabBackgroundColor: colors.primary,
    cardBackgroundColor: '#fff',
    addressName: 'Wallet Address',
    walletAddress: '0x36572a65f3c8.........b15E5',
    logo: require('../assets/images/logo.png'),
  }

  const [userData, setUserData] = useState({ ...cryptoWallet });
  const [isLogoPressed, setIsLogoPressed] = useState(false);

  const [wholePart, decimalPart] = userData?.balance.split('.');
  const [namePart, accountPart] = userData?.name.split(' ');

  const shadowStyle = {
    shadowColor: theme === 'dark' ? '#b1ff84' : '#000',
    shadowOffset: { width: 0, height: theme === 'dark' ? 7 : 3 },
    shadowOpacity: theme === 'dark' ? 0.6 : 0.3,
    shadowRadius: 4.84,
    elevation: 5,
  }

  // Animation
  const { width: screenWidth } = Dimensions.get('window')

  // Initial dimensions
  const LOGO_INITIAL_WIDTH = 85
  const LOGO_INITIAL_HEIGHT = 120
  const CARD_HEIGHT = 140

  // Card dimensions
  const [cardWidth, setCardWidth] = useState(screenWidth - 40)

  // For measuring the actual card width
  const onCardLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setCardWidth(width)
  }

  // Track expanded state
  const [expanded, setExpanded] = useState(false)

  // Track visibility state for fade effect
  const [visible, setVisible] = useState(true)

  // Track text visibility for animation
  const [textVisible, setTextVisible] = useState(true);

  const [cryptoAccountTitleVisible, setCryptoAccountTitleVisible] = useState(true);
  const [cryptoAccountTitle, setCryptoAccountTitle] = useState('CRYPTO ACCOUNT');

  // Create animated progress value
  const progress = useSharedValue(0)

  // Create scale animation for pop-up effect
  const scale = useSharedValue(1)

  // Add new state to track animation visibility
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [addressVisible, setAddressVisible] = useState(true);

  // Add new state for logo visibility
  const [logoVisible, setLogoVisible] = useState(true);

  // Add these with other shared values at the component level
  const cardTranslateX = useSharedValue(0);
  const cardTranslateY = useSharedValue(0);
  const cardOpacity = useSharedValue(1);

  // Create derived animated values
  const animatedWidth = useDerivedValue(() => {
    return interpolate(
      progress.value,
      [0, 1],
      [LOGO_INITIAL_WIDTH, cardWidth]
    )
  })

  const animatedHeight = useDerivedValue(() => {
    return interpolate(
      progress.value,
      [0, 1],
      [LOGO_INITIAL_HEIGHT, CARD_HEIGHT]
    )
  })

  // Content opacity animation
  const contentOpacity = useDerivedValue(() => {
    return interpolate(
      progress.value,
      [0, 0.2, 0.6, 0.8, 1],
      [1, 0.8, 0.6, 0.6, 0.6]
    )
  })

  // animated logo opacity animation
  const logoOpacity = useDerivedValue(() => {
    return interpolate(
      progress.value,
      [0, 0.2, 0.6, 0.8, 1],
      [1, 0.95, 0.9, 0.85, 1]
    )
  })

  const animatedTranslateX = useDerivedValue(() => {
    return interpolate(
      progress.value,
      [0, 1],
      [0, 10]
    )
  })

  const animatedTranslateY = useDerivedValue(() => {
    return interpolate(
      progress.value,
      [0, 1],
      [0, -(CARD_HEIGHT - LOGO_INITIAL_HEIGHT) / 2]
    )
  })

  // Animated styles
  const animatedLogoStyle = useAnimatedStyle(() => {
    return {
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
    }
  })

  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
      position: 'absolute',
      left: 16,
      top: 16,
      right: LOGO_INITIAL_WIDTH + 16,
      bottom: 16,
      zIndex: 5,
    }
  })

  // Handle text change with animation
  const handleTextChange = () => {
    // First hide the current text with slide up animation (just toggle visibility)
    setCryptoAccountTitleVisible(false);
    setTextVisible(false);

    // Wait for the full exit animation to complete
    setTimeout(() => {
      // Update the text content
      setCryptoAccountTitle(cryptoAccountTitle === 'CRYPTO ACCOUNT' ? 'PAYAIRO ACCOUNT' : 'CRYPTO ACCOUNT');

      // Show the new text with entrance animation
      setCryptoAccountTitleVisible(true);
      setTextVisible(true);
    }, 10); // Set to about 60% of your exit animation duration
  }

  const onPayairoAccountAnimation = () => {
    scale.value = 1;

    scale.value = withTiming(0, {
      duration: 1100,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    // Hide the current values
    setVisible(false);
    setBalanceVisible(false);
    setAddressVisible(false);
    setLogoVisible(false); // Hide logo



    setTimeout(() => {
      scale.value = 0;
      setUserData({ ...cryptoWallet });
      // Show the new values with animation
      setTimeout(() => {
        setLogoVisible(true); // Show new logo first
        setBalanceVisible(true);
        setAddressVisible(true);
      }, 100);

      scale.value = withTiming(1, {
        duration: 1100,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });


    }, 500);

    setTimeout(() => {
      // Animate the card translation and opacity
      cardTranslateX.value = withTiming(20, {
        duration: 800,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });

      cardTranslateY.value = withTiming(20, {
        duration: 800,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });

      cardOpacity.value = withTiming(0, {
        duration: 800,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }, (finished) => {
        if (finished) {
          // Reset the card position and opacity after fade out
          cardTranslateX.value = withTiming(0, {
            duration: 0,
          });
          cardTranslateY.value = withTiming(0, {
            duration: 0,
          });

        }
      });
    }, 850);

    // Trigger text animation
    setTimeout(() => {
      handleTextChange();
    }, 500);
  }

  // Add new animated style for the card
  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: cardTranslateX.value },
        { translateY: cardTranslateY.value }
      ],
      opacity: cardOpacity.value,
    };
  });

  // Handler function to reset component
  const handleAnimationComplete = () => {
    setVisible(false);
    setBalanceVisible(false);
    setAddressVisible(false);
    setLogoVisible(false); // Hide logo

    setTimeout(() => {
      setExpanded(false);
      progress.value = 0;
      scale.value = 0;
      setVisible(true);

      // Update the data
      setUserData(userData.balanceName === cryptoWallet.balanceName ? payairoAccount : cryptoWallet);

      // Show the new values with animation
      setTimeout(() => {
        setLogoVisible(true); // Show new logo first
        setBalanceVisible(true);
        setAddressVisible(true);
      }, 100);

      scale.value = withTiming(1, {
        duration: 1100,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    }, 500);

    // Trigger text animation
    setTimeout(() => {
      handleTextChange();
    }, 500);
  };

  // Animation function
  const toggleCardSize = (isCrypto: boolean) => {
    if (isCrypto) {
      const newExpanded = progress.value === 0
      if (newExpanded) {
        // Expanding
        progress.value = withTiming(1, {
          duration: 1100,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }, (finished) => {
          if (finished) {
            // When animation completes, update the data
            runOnJS(handleAnimationComplete)()
          }
        })
      } else {
        // Collapsing
        progress.value = withTiming(0, {
          duration: 500,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        })
      }
    } else {
      onPayairoAccountAnimation();
    }
  }

  return (
    <View style={[styles.cryptoAccountCard, { backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F5F5F5' }]}>
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
          {cryptoAccountTitleVisible ? (
            <Animated.View
              style={styles.titleAnimatedContainer}
              entering={SlideInDown.duration(1000).springify().damping(80).stiffness(50)}
              exiting={SlideOutUp.duration(1000)}
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

      <View
        style={[
          styles.balanceCard,
          {
            backgroundColor: userData.cardBackgroundColor,
            position: 'absolute',
            top: 60,
            left: 0,
            right: 0,
            bottom: 0,
          },
          shadowStyle,
          animatedCardStyle
        ]}
        onLayout={onCardLayout}
      >
        {/* Content section - fades out on animation */}
        {/* {visible && ( */}
        <Animated.View style={animatedContentStyle} exiting={FadeOut.duration(500)}>
          <Text style={styles.tokenLabel}>{userData.balanceName}</Text>

          {balanceVisible && (
            <Animated.View
              style={styles.balanceRow}
              entering={FadeIn.duration(800)}
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
              entering={FadeIn.duration(800).delay(100)}
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
        {/* )} */}

        <TouchableOpacity onPress={() => { toggleCardSize(userData.id == 1) }} activeOpacity={1} style={styles.logoContentContainer}>
          {logoVisible && (
            <Animated.View
              entering={FadeIn.duration(800)}
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
                entering={SlideInDown.duration(1000).springify().damping(80).stiffness(50)}
                exiting={SlideOutUp.duration(1000)}
              >
                <Text style={styles.accountText}>{namePart.toUpperCase()}</Text>
                <Text style={styles.accountLabel}>{accountPart}</Text>
              </Animated.View>
            ) : null}
          </View>
        </TouchableOpacity>
        {/* Logo section - expands on animation */}
        <Animated.View style={animatedLogoStyle} />
      </View>
      <Animated.View
        style={[
          styles.balanceCard,
          { backgroundColor: userData.cardBackgroundColor },
          shadowStyle,
          animatedCardStyle
        ]}
        onLayout={onCardLayout}
      >
        {/* Content section - fades out on animation */}
        {/* {visible && ( */}
        <Animated.View style={animatedContentStyle} exiting={FadeOut.duration(500)}>
          <Text style={styles.tokenLabel}>{userData.balanceName}</Text>

          {balanceVisible && (
            <Animated.View
              style={styles.balanceRow}
              entering={FadeIn.duration(800)}
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
              entering={FadeIn.duration(800).delay(100)}
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
        {/* )} */}

        <TouchableOpacity onPress={() => { toggleCardSize(userData.id == 1) }} activeOpacity={1} style={styles.logoContentContainer}>
          {logoVisible && (
            <Animated.View
              entering={FadeIn.duration(800)}
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
                entering={SlideInDown.duration(1000).springify().damping(80).stiffness(50)}
                exiting={SlideOutUp.duration(1000)}
              >
                <Text style={styles.accountText}>{namePart.toUpperCase()}</Text>
                <Text style={styles.accountLabel}>{accountPart}</Text>
              </Animated.View>
            ) : null}
          </View>
        </TouchableOpacity>
        {/* Logo section - expands on animation */}
        <Animated.View style={animatedLogoStyle} />
      </Animated.View>
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