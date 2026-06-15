'use client'

import { ButtonHTMLAttributes } from 'react'

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'ghost' | 'success'
  size?: 'sm' | 'md' | 'lg'
}

const VARIANT_STYLES = {
  primary: 'bg-green-900 border-green-500 text-green-400 hover:bg-green-800 active:translate-y-0.5',
  danger:  'bg-red-900 border-red-500 text-red-400 hover:bg-red-800 active:translate-y-0.5',
  ghost:   'bg-transparent border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-200',
  success: 'bg-blue-900 border-blue-500 text-blue-400 hover:bg-blue-800 active:translate-y-0.5',
}

const SIZE_STYLES = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-xs',
  lg: 'px-6 py-3 text-sm',
}

export default function PixelButton({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled,
  ...props
}: PixelButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`
        font-pixel border-2 transition-all duration-100 cursor-pointer
        ${VARIANT_STYLES[variant]}
        ${SIZE_STYLES[size]}
        ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  )
}
