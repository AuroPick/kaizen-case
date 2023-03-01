import React, { memo, PropsWithChildren } from 'react'

import { GestureResponderEvent, TouchableOpacity, ViewStyle } from 'react-native'

interface Props {
  style?: ViewStyle
  onPress?: (event: GestureResponderEvent) => void
  disabled?: boolean
}

const TouchableComponent: React.FC<PropsWithChildren<Props>> = ({
  children,
  style = undefined,
  onPress = () => {},
  disabled = false
}) => (
  <TouchableOpacity activeOpacity={0.9} style={style} onPress={onPress} disabled={disabled}>
    {children}
  </TouchableOpacity>
)

export const Touchable = memo(TouchableComponent)
