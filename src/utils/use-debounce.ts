import React from 'react'

export default function useDebounce<T>(value: T, delay: number): T {
  const [internalValue, setInternalValue] = React.useState(value)

  React.useEffect(() => {
    const handler = setTimeout(() => setInternalValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return internalValue
}
