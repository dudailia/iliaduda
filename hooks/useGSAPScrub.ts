'use client'
import { useRef } from 'react'

export function useGSAPScrub() {
  const ref = useRef<HTMLDivElement>(null)
  return ref
}
