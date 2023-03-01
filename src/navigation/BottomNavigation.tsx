import React from 'react'

import {
  BottomTabBarButtonProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import { ParamListBase, RouteProp } from '@react-navigation/native'
import { Image, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Touchable } from '../components/common'
import { Explore } from '../screens/Explore/Explore'
import { fp, hp, wp } from '../utils'
import { colors } from '../utils/colors'
import { shadow } from '../utils/styles'

const Tab = createBottomTabNavigator()

const RedeemButton = ({ children, onPress }: BottomTabBarButtonProps) => (
  <Touchable onPress={onPress} style={styles.redeemButton}>
    {children}
  </Touchable>
)

const screenOptions = ({
  route
}: {
  route: RouteProp<ParamListBase>
  navigation: any
}): BottomTabNavigationOptions => ({
  lazy: false,
  headerShown: false,
  tabBarActiveTintColor: '#000000',
  tabBarInactiveTintColor: '#1D1E1C4D',
  tabBarStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: hp(10),
    ...shadow
  },
  tabBarIcon: ({ color }) => {
    if (route.name === 'Explore') {
      return <Ionicons name="compass" size={wp(8)} color={color} />
    }
    if (route.name === 'Wallet') {
      return <Ionicons name="star" size={wp(8)} color={color} />
    }
    if (route.name === 'Redeem') {
      return (
        <Image
          source={require('../images/Plus_Vector.png')}
          resizeMode="contain"
          style={styles.redeemImage}
        />
      )
    }
  }
})

const exploreOptions: BottomTabNavigationOptions = {
  tabBarLabel: 'KEŞFET',
  tabBarLabelStyle: {
    fontWeight: 'bold',
    letterSpacing: 0.5,
    fontSize: fp(1.4)
  }
}

const redeemOptions: BottomTabNavigationOptions = {
  tabBarLabel: () => null,
  tabBarButton: RedeemButton
}

const walletOptions: BottomTabNavigationOptions = {
  tabBarLabel: 'DAHA CÜZDAN',
  tabBarLabelStyle: {
    fontWeight: 'bold',
    letterSpacing: 0.5,
    fontSize: fp(1.4)
  }
}

export const BottomNavigation = () => (
  <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen name="Explore" component={Explore} options={exploreOptions} />
    <Tab.Screen name="Redeem" component={Explore} options={redeemOptions} />
    <Tab.Screen name="Wallet" component={Explore} options={walletOptions} />
  </Tab.Navigator>
)

const styles = StyleSheet.create({
  redeemButton: {
    borderRadius: 24,
    borderLeftColor: '#F40000',
    borderRightColor: '#FFCF08',
    borderTopColor: '#009639',
    borderBottomColor: '#FF8300',
    borderWidth: 2,
    bottom: hp(1.5),
    width: wp(18),
    height: wp(18),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    ...shadow
  },
  redeemImage: {
    width: wp(10),
    height: wp(10)
  }
})
