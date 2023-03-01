import React, { memo, useCallback, useMemo } from 'react'

import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Path, Svg } from 'react-native-svg'

import { RootStackParamList } from '../../navigation/types'
import { fp, hp, wp } from '../../utils'
import { colors } from '../../utils/colors'

interface Props {
  id: number
  brandIconColor: string
  brandIconUrl: string
  imageUrl: string
  promotionCardColor: string
  remainingText: string
  title: string
  listButtonText: string
}

const PromotionCardComponent: React.FC<Props> = ({
  imageUrl,
  remainingText,
  brandIconUrl,
  brandIconColor,
  title,
  listButtonText,
  promotionCardColor,
  id
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const brandIconContainerStyle = useMemo(
    () => [
      styles.brandIconContainer,
      { borderColor: brandIconColor, backgroundColor: brandIconColor }
    ],
    [brandIconColor]
  )

  const titleString = useMemo(
    () =>
      title.replace(/(<([^>]+)>)/gi, '') !== '-' &&
      title.replace(/(<([^>]+)>)/gi, '') !== '.' &&
      title.replace(/(<([^>]+)>)/gi, ''),
    [title]
  )
  const listButtonString = useMemo(
    () =>
      listButtonText.replace(/(<([^>]+)>)/gi, '') !== '.' &&
      listButtonText.replace(/(<([^>]+)>)/gi, '') !== '-' &&
      listButtonText.replace(/(<([^>]+)>)/gi, ''),
    [listButtonText]
  )

  const handlePress = useCallback(() => {
    navigation.navigate('PromotionDetail', { id })
  }, [id, navigation])

  return (
    <TouchableOpacity activeOpacity={1} onPress={handlePress}>
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.imageBackgroundContainer}
          imageStyle={styles.imageBackground}
          resizeMode="cover"
        >
          <View style={styles.remainingTextContainer}>
            <Text style={styles.remainingText}>{remainingText}</Text>
          </View>
          <View style={brandIconContainerStyle}>
            <Image source={{ uri: brandIconUrl }} style={styles.brandIcon} resizeMode="cover" />
          </View>
        </ImageBackground>
        {titleString && (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{titleString}</Text>
          </View>
        )}
        {listButtonString && (
          <View style={styles.titleContainer}>
            <Text style={styles.button}>{listButtonString}</Text>
          </View>
        )}
      </View>
      <View style={styles.svgContainer}>
        <Svg height={wp(15)} width={wp(100)} viewBox={`0 0 ${wp(100)} ${wp(15)}`}>
          <Path
            fill={promotionCardColor}
            d={`M 0 0 L 0 ${wp(5)} C 0 ${wp(9)} ${wp(5)} ${wp(10)} ${wp(10)} ${wp(10)} L ${wp(
              90
            )} ${wp(15)} C ${wp(100)} ${wp(15)} ${wp(100)} ${wp(10)} ${wp(100)} ${wp(10)} L ${wp(
              100
            )} 0 L 0 0`}
          />
        </Svg>
      </View>
    </TouchableOpacity>
  )
}

export const PromotionCard = memo(PromotionCardComponent)

const styles = StyleSheet.create({
  container: {
    padding: wp(2),
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.GRAY,
    width: wp(100),
    height: hp(60)
  },
  imageBackgroundContainer: {
    flex: 1,
    marginBottom: hp(1)
  },
  imageBackground: {
    borderRadius: 16,
    borderBottomLeftRadius: 100
  },
  remainingTextContainer: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: colors.DARK_GRAY,
    borderRadius: wp(100),
    paddingHorizontal: wp(5),
    paddingVertical: hp(1)
  },
  brandIconContainer: {
    borderWidth: 3,
    position: 'absolute',
    left: 0,
    bottom: 0,
    borderRadius: wp(100)
  },
  brandIcon: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(18) / 2
  },
  remainingText: {
    color: colors.WHITE,
    letterSpacing: -0.5,
    fontSize: fp(2.5)
  },
  title: {
    fontWeight: 'bold',
    fontSize: fp(2.5),
    color: colors.DARK_GRAY,
    textAlign: 'center',
    lineHeight: 25
  },
  titleContainer: {
    alignItems: 'center',
    width: wp(80),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp(2)
  },
  button: {
    fontWeight: 'bold',
    fontSize: fp(2.5),
    color: colors.RED,
    marginBottom: hp(2),
    textAlign: 'center'
  },
  svgContainer: {
    zIndex: -2,
    top: -30
  }
})
