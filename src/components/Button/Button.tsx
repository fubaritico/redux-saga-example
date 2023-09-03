import React, { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'
import clsx from 'clsx'
import Spinner from '@Components/Spinner/Spinner'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  inverted?: boolean
  onClick: () => void
  loading?: boolean
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  inverted,
  loading,
  onClick,
  ...rest
}) => (
  <button
    className={clsx(
      'flex items-center bg-orange-300 dark:bg-sky-900 focus:outline-none focus:shadow-outline hover:shadow-outline text-white font-medium text-[14px] md:text-[14px] h-[32px] md:h-[48px] rounded-[6px] md:rounded-[8px] px-[20px]',
      {
        '!bg-orange-300 !text-orange-200 dark:!text-sky-900 dark:!bg-white':
          inverted,
        'opacity-50': rest.disabled,
      },
      className
    )}
    onClick={onClick}
    type="button"
    {...rest}
  >
    <span
      className={clsx('truncate', {
        'mr-2': loading,
      })}
    >
      {children}
    </span>
    {loading && <Spinner className="fill-white" />}
  </button>
)

export default Button
