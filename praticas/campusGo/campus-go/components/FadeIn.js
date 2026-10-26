import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export default function FadeIn({ children, duration = 400, style }) {
  const opacidade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacidade, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, [opacidade, duration]);

  return <Animated.View style={[style, { opacity: opacidade }]}>{children}</Animated.View>;
}