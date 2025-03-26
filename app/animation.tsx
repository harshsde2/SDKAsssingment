import { View, StyleSheet, TouchableOpacity, Dimensions, LayoutChangeEvent, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'
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

const AnimationScreen = () => {
  const { colors } = useTheme()
  const { width: screenWidth } = Dimensions.get('window')

  const [text, setText] = useState('Hello')
  // Track text visibility for animation
  const [textVisible, setTextVisible] = useState(true)
  
  // Initial dimensions
  const CARD_INITIAL_WIDTH = 50
  const CARD_INITIAL_HEIGHT = 100
  const CONTAINER_HEIGHT = 120
  
  // Reference to track actual layout measurements
  const [containerWidth, setContainerWidth] = useState(screenWidth * 0.8) // Based on styles.animationContainer
  
  // For measuring container width
  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setContainerWidth(width)
  }
  
  // Track expanded state
  const [expanded, setExpanded] = useState(false)
  
  // Track visibility state for fade effect
  const [visible, setVisible] = useState(true)
  
  // Create animated progress value
  const progress = useSharedValue(0)
  
  // Create scale animation for pop-up effect
  const scale = useSharedValue(1)
  
  // Calculate the distances
  const distanceToLeft = containerWidth - 70 // 50px card width + 20px right padding
  
  // Create derived animated values
  const animatedWidth = useDerivedValue(() => {
    return interpolate(
      progress.value,
      [0, 1],
      [CARD_INITIAL_WIDTH, containerWidth]
    )
  })
  
  const animatedHeight = useDerivedValue(() => {
    return interpolate(
      progress.value,
      [0, 1],
      [CARD_INITIAL_HEIGHT, CONTAINER_HEIGHT]
    )
  })
  
  const animatedTranslateX = useDerivedValue(() => {
    return interpolate(
      progress.value,
      [0, 1],
      [0, 30]
    )
  })
  
  const animatedTranslateY = useDerivedValue(() => {
    return interpolate(
      progress.value,
      [0, 1],
      [0, -(CONTAINER_HEIGHT - CARD_INITIAL_HEIGHT) / 2]
    )
  })
  
  // Create animated styles
  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: 0,
      right: 10,
      width: animatedWidth.value,
      height: animatedHeight.value,
      transform: [
        { translateX: animatedTranslateX.value },
        { translateY: animatedTranslateY.value },
        { scale: scale.value }
      ]
    }
  })
  
  // Handle text change with animation
  const handleTextChange = () => {
    // First hide the current text with slide up animation
    setTextVisible(false);
    
    // After the slide up finishes, change the text and show with slide down
    setTimeout(() => {
      setText(text === 'Hello' ? 'World' : 'Hello');
      setTextVisible(true);
    }, 200); // Less than the exit animation time
  }
  
  // Handler function to reset component
  const handleAnimationComplete = () => {
    setVisible(false)
    
   
    
    // Reset the component after fade out animation
    setTimeout(() => {
      setExpanded(false)
      progress.value = 0
      
      // Set scale to 0 before showing the element
      scale.value = 0
      
      // Make the component visible again
      setVisible(true)
      
      // Animate scale from 0 to 1 with a spring effect for pop-up
      scale.value = withSpring(1, {
        damping: 8,
        stiffness: 100,
        mass: 0.5
      })
    }, 500) // Matches the fade out duration

     // Trigger text animation
     handleTextChange()
  }
  
  // Animation function
  const toggleCardSize = () => {
    // Toggle expanded state
    const newExpanded = !expanded
    setExpanded(newExpanded)
    
    if (newExpanded) {
      // Animate to expanded state
      progress.value = withTiming(1, {
        duration: 1000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1)
      }, (finished) => {
        if (finished) {
          // Use runOnJS to call our function from the UI thread
          runOnJS(handleAnimationComplete)()
        }
      })
    } else {
      // Animate to collapsed state (should not typically be called directly now)
      progress.value = withTiming(0, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1)
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View 
        style={styles.animationContainer}
        onLayout={onLayout}
      >
        <View style={styles.cardContainer}>
          <TouchableOpacity 
            activeOpacity={1}
            onPress={toggleCardSize}
            style={styles.cardWrapper}
          >
            {visible && (
              <Animated.View
                style={[
                  styles.animatedCard,
                  animatedCardStyle
                ]}
                exiting={FadeOut.duration(500)}
              />
            )}
          </TouchableOpacity>

          <View style={styles.textContainer}>
            {textVisible ? (
              <Animated.View 
                style={styles.textAnimatedContainer}
                entering={SlideInDown.duration(700)}
                exiting={SlideOutUp.duration(700)}
              >
                <Text style={styles.text}>
                  {text}
                </Text>
              </Animated.View>
            ) : null}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AnimationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    left: -15,
    bottom: 10,
    width: 60,
    height: 20,
    overflow: 'hidden',
  },
  textAnimatedContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  animationContainer: {
    backgroundColor: 'green',
    width: '80%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    borderRadius: 10,
  },
  cardContainer: {
    position: 'relative',
    height: 100,
    width: 50,
  },
  cardWrapper: {
    position: 'absolute',
    height: 100,
    width: 50,
  },
  animatedCard: {
    backgroundColor: 'red',
    borderRadius: 8,
  }
});