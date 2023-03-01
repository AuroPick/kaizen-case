import React, { memo, PropsWithChildren, useMemo } from 'react'

import { ScrollView, View, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props {
  scroll?: boolean
  style?: ViewStyle
}

const PageComponent: React.FC<PropsWithChildren<Props>> = ({ children, scroll, style }) => {
  const { top } = useSafeAreaInsets()

  const Wrapper = useMemo(() => (scroll ? ScrollView : View), [scroll])

  const memoContainerStyle = useMemo(() => [{ paddingTop: top }, style], [top, style])

  const wrapperProps = useMemo(
    () => (scroll ? { contentContainerStyle: memoContainerStyle } : { style: memoContainerStyle }),
    [memoContainerStyle, scroll]
  )

  return <Wrapper {...wrapperProps}>{children}</Wrapper>
}

export const Page = memo(PageComponent)
