import React, { memo, useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { StyleSheet, View } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'

import { PromotionCard } from './PromotionCard'
import * as Requests from '../../api/requests'
import { useTagStore } from '../../stores'
import { hp, wp } from '../../utils'
import { colors } from '../../utils/colors'

const PromotionsComponent = () => {
  const tagId = useTagStore((state) => state.tagId)
  const [data, setData] = useState([])

  const progressValue = useSharedValue<number>(0)

  useQuery({
    queryKey: ['promotions'],
    queryFn: Requests.getPromotions,
    onSuccess: (fetchedData) => {
      setData(fetchedData)
    },
    cacheTime: 0
  })

  useEffect(() => {
    // couldn't handle filter system, there is no relationship between tags and promotions and didn't documented well
  }, [tagId])

  return (
    <>
      <Carousel
        loop
        pagingEnabled
        mode="parallax"
        width={wp(100)}
        height={hp(60)}
        data={data}
        modeConfig={{
          parallaxScrollingScale: 0.8,
          parallaxScrollingOffset: 100
        }}
        scrollAnimationDuration={500}
        renderItem={({ item }: { item: any }) => (
          <PromotionCard
            id={item.Id}
            brandIconColor={item.BrandIconColor}
            brandIconUrl={item.BrandIconUrl}
            imageUrl={item.ImageUrl}
            remainingText={item.RemainingText}
            title={item.Title}
            listButtonText={item.ListButtonText}
            promotionCardColor={item.PromotionCardColor}
          />
        )}
        onProgressChange={(_, absoluteProgress) => {
          progressValue.value = absoluteProgress
        }}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10]
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'center'
        }}
      >
        {data.map((promotion: any, index) => (
          <PaginationItem
            backgroundColor={promotion.PromotionCardColor}
            animValue={progressValue}
            index={index}
            key={index}
            length={data.length}
          />
        ))}
      </View>
    </>
  )
}

const PaginationItem: React.FC<{
  index: number
  backgroundColor: string
  length: number
  animValue: Animated.SharedValue<number>
}> = (props) => {
  const { animValue, index, length, backgroundColor } = props
  const width = 10

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1]
    let outputRange = [-width, 0, width]

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1]
      outputRange = [-width, 0, width]
    }

    return {
      transform: [
        {
          translateX: interpolate(animValue?.value, inputRange, outputRange, Extrapolate.CLAMP)
        }
      ]
    }
  }, [animValue, index, length])

  return (
    <View
      style={{
        backgroundColor: colors.GRAY,
        width,
        height: width,
        borderRadius: 50,
        overflow: 'hidden',
        marginRight: wp(1)
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor,
            flex: 1
          },
          animStyle
        ]}
      />
    </View>
  )
}

export const Promotions = memo(PromotionsComponent)

const styles = StyleSheet.create({})
