import React, { memo, useCallback, useMemo } from 'react'

import { Image, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { wp } from '../../utils'
import { colors } from '../../utils/colors'
import { RowView, Touchable } from '../common'

interface Props {
  id: number
  name: string
  iconUrl?: string
  isSelected: boolean
  onPress: (id: number) => void
}

const SearchIcon = () => (
  <View style={styles.searchIconContainer}>
    <Ionicons name="search" color={colors.WHITE} size={wp(4)} />
  </View>
)

const TagComponent: React.FC<Props> = ({
  id,
  name,
  iconUrl,
  isSelected = false,
  onPress = () => {}
}) => {
  const handlePress = useCallback(() => {
    onPress(id)
  }, [id, onPress])

  const containerStyle: any = useMemo(
    () => [styles.container, isSelected && styles.selectedContainer],
    [isSelected]
  )

  return (
    <Touchable onPress={handlePress}>
      <RowView style={containerStyle}>
        {id === 0 ? (
          <SearchIcon />
        ) : (
          <Image source={{ uri: iconUrl }} resizeMode="contain" style={styles.image} />
        )}
        <Text>{name}</Text>
      </RowView>
    </Touchable>
  )
}

export const Tag = memo(TagComponent)

const styles = StyleSheet.create({
  container: {
    padding: wp(1.5),
    paddingRight: wp(4),
    backgroundColor: colors.WHITE,
    borderWidth: 1.5,
    borderRadius: 8,
    borderColor: colors.GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(1)
  },
  searchIconContainer: {
    width: wp(6),
    height: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.RED,
    borderRadius: 7,
    marginRight: wp(2.5)
  },
  image: {
    width: wp(6),
    height: wp(6),
    borderRadius: 7,
    marginRight: wp(2.5)
  },
  selectedContainer: {
    borderColor: colors.RED
  }
})
