import React from 'react'

import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { BottomNavigation } from './BottomNavigation'
import { Loader } from '../screens/Loader/Loader'
import { PromotionDetail } from '../screens/PromotionDetail/PromotionDetail'
import { colors } from '../utils/colors'

const Stack = createNativeStackNavigator()

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.WHITE
  }
}

const gestureStyle = {
  flex: 1
}

const screenOptions = { headerShown: false }

export const Navigation = () => (
  <GestureHandlerRootView style={gestureStyle}>
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="Loader" screenOptions={screenOptions}>
        <Stack.Screen name="Loader" component={Loader} />
        <Stack.Screen name="HomeTab" component={BottomNavigation} />
        <Stack.Screen name="PromotionDetail" component={PromotionDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  </GestureHandlerRootView>
)
