import React from 'react'

type ButtonProps = {
  label: string
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export const Button = ({
  label,
  onClick,
  disabled,
  className,
}: ButtonProps) => {
  return (
    <button
      className={`button focus:ring-4 focus:outline-none focus:ring-blue-300 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
