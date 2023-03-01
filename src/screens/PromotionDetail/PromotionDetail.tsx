import React, { useCallback, useMemo, useState } from 'react'

import { useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { Image, StyleSheet, Text, View } from 'react-native'
import { easeGradient } from 'react-native-easing-gradient'
import LinearGradient from 'react-native-linear-gradient'
import RenderHTML from 'react-native-render-html'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import * as Requests from '../../api/requests'
import { Touchable } from '../../components/common'
import { Close } from '../../components/icon/Close'
import { Page } from '../../layouts/Page'
import { fp, hp, wp } from '../../utils'
import { colors } from '../../utils/colors'
import { shadow } from '../../utils/styles'

const { colors: gradientColorsEased, locations } = easeGradient({
  colorStops: {
    0: {
      color: '#FFFFFF00'
    },
    1: {
      color: '#FFFFFF'
    }
  }
})

export const PromotionDetail = () => {
  const {
    params: { id }
  } = useRoute()

  const { bottom, top } = useSafeAreaInsets()

  const [data, setData] = useState<any>()

  useQuery({
    queryKey: ['promotion', id],
    queryFn: () => Requests.getPromotion({ id }),
    onSuccess: (fetchedData) => {
      setData(fetchedData)
    },
    onError: (err) => {
      console.log(err)
    },
    cacheTime: 0
  })

  const brandIconContainerStyle = useMemo(
    () => [
      styles.brandIconContainer,
      { borderColor: data?.BrandIconColor, backgroundColor: data?.BrandIconColor }
    ],
    [data?.BrandIconColor]
  )

  const titleString = useMemo(
    () =>
      data?.Title.replace(/(<([^>]+)>)/gi, '') !== '-' &&
      data?.Title.replace(/(<([^>]+)>)/gi, '') !== '.' &&
      data?.Title.replace(/(<([^>]+)>)/gi, ''),
    [data?.Title]
  )

  const buttonStyle = useMemo(
    () => [styles.buttonContainer, { paddingBottom: bottom + hp(2) }],
    [bottom]
  )

  const closeContainerStyle = useMemo(() => [styles.closeContainer, { paddingTop: top }], [top])

  const handlePress = useCallback(() => {
    // implement
  }, [])

  if (!data) return null

  return (
    <>
      <Page style={styles.pageStyle} scroll>
        <View style={styles.imageBackgroundContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: data.ImageUrl }}
              style={styles.imageBackground}
              resizeMode="cover"
            />
          </View>
          <View style={styles.remainingTextContainer}>
            <Text style={styles.remainingText}>{data.RemainingText}</Text>
          </View>
          <View style={brandIconContainerStyle}>
            <Image
              source={{ uri: data.BrandIconUrl }}
              style={styles.brandIcon}
              resizeMode="cover"
            />
          </View>
        </View>
        {titleString && (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{titleString}</Text>
          </View>
        )}
        <View style={styles.descriptionContainer}>
          <RenderHTML
            source={{ html: `<span style="color: #1D1E1CBF;">${data?.Description}</span>` }}
            contentWidth={wp(90)}
          />
        </View>
      </Page>
      <View style={closeContainerStyle}>
        <Close />
      </View>
      <View style={styles.gradientStyle} pointerEvents="none">
        <LinearGradient
          colors={gradientColorsEased}
          locations={locations}
          style={StyleSheet.absoluteFill}
        />
      </View>
      <View style={buttonStyle}>
        <Touchable style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>{data?.DetailButtonText}</Text>
        </Touchable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  pageStyle: {
    paddingTop: 0
  },
  imageBackgroundContainer: {
    width: wp(100),
    height: hp(50),
    marginBottom: hp(1)
  },
  imageContainer: {
    width: wp(100),
    height: hp(50),
    borderBottomLeftRadius: 100,
    backgroundColor: colors.WHITE,
    ...shadow
  },
  imageBackground: {
    borderBottomLeftRadius: 100,
    ...StyleSheet.absoluteFillObject
  },
  remainingTextContainer: {
    position: 'absolute',
    right: 10,
    bottom: 5,
    backgroundColor: colors.DARK_GRAY,
    borderRadius: wp(100),
    paddingHorizontal: wp(5),
    paddingVertical: hp(0.8)
  },
  brandIconContainer: {
    borderWidth: 3,
    position: 'absolute',
    left: 2,
    bottom: -10,
    borderRadius: wp(100),
    marginLeft: wp(2),
    justifyContent: 'center',
    alignItems: 'center'
  },
  remainingText: {
    color: colors.WHITE,
    letterSpacing: -0.5,
    fontSize: fp(1.7)
  },
  brandIcon: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(15) / 2
  },
  title: {
    fontSize: fp(3),
    fontWeight: 'bold'
  },
  titleContainer: {
    paddingHorizontal: wp(3),
    marginTop: hp(2)
  },
  descriptionContainer: {
    paddingHorizontal: wp(3),
    marginTop: hp(2),
    marginBottom: hp(20)
  },
  closeContainer: {
    position: 'absolute',
    left: wp(3),
    top: hp(3)
  },
  button: {
    width: wp(94),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.RED,
    alignSelf: 'center',
    paddingVertical: hp(2.2),
    borderRadius: wp(100)
  },
  buttonContainer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
    alignSelf: 'center'
  },
  buttonText: {
    color: colors.WHITE,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  gradientStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: hp(25)
  }
})
