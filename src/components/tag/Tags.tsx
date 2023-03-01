import React, { memo, useCallback, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { FlatList, ListRenderItem, StyleSheet, ViewStyle } from 'react-native'

import { Tag } from './Tag'
import * as Requests from '../../api/requests'
import { useTagStore } from '../../stores'

interface Props {
  contentContainerStyle: ViewStyle
}

const TagsComponent: React.FC<Props> = ({ contentContainerStyle }) => {
  const tagId = useTagStore((state) => state.tagId)
  const selectTag = useTagStore((state) => state.selectTag)

  const [data, setData] = useState<any[]>([])

  useQuery({
    queryKey: ['tags'],
    queryFn: Requests.getTags,
    onSuccess: (fetchedData) => {
      setData([{ Name: 'Fırsat Bul', Id: 0 }, ...fetchedData])
    },
    cacheTime: 0
  })

  const handleTagPress = useCallback(
    (id: number) => {
      if (id === undefined || id === null) return

      const foundTag = data.filter((tag) => tag.Id === id)

      if (!foundTag) return

      selectTag(id, foundTag)
    },
    [data]
  )

  const renderItem: ListRenderItem<any> = useCallback(
    ({ item }) => (
      <Tag
        id={item.Id}
        name={item.Name}
        iconUrl={item.IconUrl}
        key={item.Id}
        isSelected={item.Id === tagId}
        onPress={handleTagPress}
      />
    ),
    [handleTagPress, tagId]
  )

  const keyExtractor = useCallback((item: any) => `tag_${item.Id}`, [])

  if (!data || !Array.isArray(data)) return null

  return (
    <FlatList
      data={data}
      horizontal
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={contentContainerStyle}
    />
  )
}

export const Tags = memo(TagsComponent)

const styles = StyleSheet.create({})
