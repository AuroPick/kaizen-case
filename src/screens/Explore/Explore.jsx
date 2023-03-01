import React, { memo } from 'react'

import { Image, StyleSheet, View } from 'react-native'

import { RowView } from '../../components/common'
import { MeOrAuth } from '../../components/mixed/MeOrAuth'
import { Promotions } from '../../components/promotion/Promotions'
import { Tags } from '../../components/tag/Tags'
import { Page } from '../../layouts/Page'
import { hp, wp } from '../../utils'

const ExploreComponent = () => (
  <Page scroll>
    <View style={styles.top}>
      <RowView spaceBetween>
        <Image
          source={require('../../images/Daha_Daha.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <MeOrAuth />
      </RowView>
    </View>
    <View style={styles.tagContainer}>
      <Tags contentContainerStyle={styles.tagsContentContainer} />
    </View>
    <View>
      <Promotions />
    </View>
  </Page>
)

export const Explore = memo(ExploreComponent)

const styles = StyleSheet.create({
  top: {
    paddingTop: hp(3),
    paddingHorizontal: wp(3)
  },
  logo: {
    height: hp(5)
  },
  tagsContentContainer: {
    paddingLeft: wp(3)
  },
  tagContainer: {
    marginTop: hp(3)
  }
})
