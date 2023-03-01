import React, { memo, PropsWithChildren, useMemo } from 'react'

import { StyleSheet, View, ViewStyle } from 'react-native'

interface Props {
  spaceBetween?: boolean
  style?: ViewStyle
}

const RowViewComponent: React.FC<PropsWithChildren<Props>> = ({
  children,
  spaceBetween = false,
  style = undefined
}) => {
  const containerStyle = useMemo(
    () => [styles.container, spaceBetween && styles.spaceBetween, style],
    [spaceBetween, style]
  )

  return <View style={containerStyle}>{children}</View>
}

export const RowView = memo(RowViewComponent)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  spaceBetween: {
    justifyContent: 'space-between'
  }
})
