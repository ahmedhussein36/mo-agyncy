"use client"

import { useState, useEffect, useCallback } from "react"

export function useInfiniteScroll<T>(initialItems: T[], itemsPerPage = 18, loadMoreThreshold = 200) {
  const [items, setItems] = useState<T[]>(initialItems.slice(0, itemsPerPage))
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(initialItems.length > itemsPerPage)
  const [isLoading, setIsLoading] = useState(false)

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return

    setIsLoading(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      const nextPage = page + 1
      const startIndex = page * itemsPerPage
      const endIndex = startIndex + itemsPerPage
      const newItems = initialItems.slice(0, endIndex)

      setItems(newItems)
      setPage(nextPage)
      setHasMore(endIndex < initialItems.length)
      setIsLoading(false)
    }, 800) // Simulate network delay
  }, [initialItems, isLoading, hasMore, page, itemsPerPage])

  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) return

    const scrollHeight = document.documentElement.scrollHeight
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const clientHeight = document.documentElement.clientHeight

    if (scrollHeight - scrollTop - clientHeight < loadMoreThreshold) {
      loadMore()
    }
  }, [loadMore, isLoading, hasMore, loadMoreThreshold])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return { items, isLoading, hasMore, loadMore }
}
