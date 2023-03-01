import { useCallback, useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'

export const Loader = () => {
  const navigation = useNavigation()

  const init = useCallback(() => {
    // some logic in here app needs to work
    navigation.navigate('HomeTab')
  }, [])

  useEffect(() => {
    init()
  }, [])

  return null
}
