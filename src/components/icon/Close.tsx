import React, { memo } from 'react'

import { useNavigation } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { wp } from '../../utils'
import { colors } from '../../utils/colors'
import { Touchable } from '../common'

const CloseComponent = () => {
  const navigation = useNavigation()

  return (
    <Touchable style={styles.container} onPress={navigation.goBack}>
      <Ionicons name="arrow-back" color={colors.WHITE} size={wp(6)} />
    </Touchable>
  )
}

export const Close = memo(CloseComponent)

const styles = StyleSheet.create({
  container: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(11) / 2,
    backgroundColor: colors.DARK_GRAY,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
