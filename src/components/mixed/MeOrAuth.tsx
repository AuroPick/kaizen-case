import React, { memo, useCallback } from 'react'

import { StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { useUserStore } from '../../stores'
import { hp, wp } from '../../utils'
import { colors } from '../../utils/colors'
import Storage from '../../utils/storage'
import { RowView, Touchable } from '../common'

const MeOrAuthComponent: React.FC = () => {
  const user = useUserStore((state) => state.user)
  const addUser = useUserStore((state) => state.add)
  const clearUser = useUserStore((state) => state.clear)

  const handleLoginPress = useCallback(() => {
    // random data
    addUser({ _id: 1 })
    Storage.setItem('accessToken', 'JWT_TOKEN_HERE')
  }, [addUser])

  const handleLogoutPress = useCallback(() => {
    clearUser()
    Storage.clear()
  }, [clearUser])

  if (!user)
    return (
      <RowView>
        <Touchable style={styles.loginContainer} onPress={handleLoginPress}>
          <Text style={styles.login}>Giriş Yap</Text>
        </Touchable>
        <View style={styles.placeholderContainer}>
          <Ionicons name="person" color={colors.WHITE} size={wp(5)} />
        </View>
      </RowView>
    )

  return (
    <>
      <Touchable onPress={handleLogoutPress} style={styles.loggedContainer}>
        <Ionicons name="person" color={colors.WHITE} size={wp(5)} />
      </Touchable>
      <View style={styles.onlineStatus} />
    </>
  )
}

export const MeOrAuth = memo(MeOrAuthComponent)

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: colors.RED,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(6),
    borderRadius: 20,
    marginRight: wp(3),
    height: hp(5)
  },
  login: {
    fontWeight: 'bold',
    color: colors.WHITE,
    letterSpacing: -0.17
  },
  placeholderContainer: {
    borderRadius: wp(100),
    backgroundColor: colors.BLACK,
    height: hp(5),
    width: hp(5),
    justifyContent: 'center',
    alignItems: 'center'
  },
  loggedContainer: {
    borderRadius: wp(100),
    backgroundColor: colors.RED,
    height: hp(5),
    width: hp(5),
    justifyContent: 'center',
    alignItems: 'center'
  },
  onlineStatus: {
    backgroundColor: colors.GREEN,
    borderWidth: 2.18,
    borderColor: colors.WHITE,
    borderRadius: wp(100),
    position: 'absolute',
    right: 0,
    top: 0,
    width: wp(3.6),
    height: wp(3.6)
  }
})
