import React, { FC } from 'react'
import clsx from 'clsx'
import { format } from 'date-fns'

import { removeIdentity } from '@Redux/identities/actions'

import DeleteButton from '@Components/DeleteButton'
import { useAppDispatch } from '@Redux/hooks'

export type CardProps = {
  className?: string
  identity: Identity
  listMode?: boolean
}

const IdentityCard: FC<CardProps> = ({ className, identity, listMode }) => {
  const dispatch = useAppDispatch()

  const handleDeleteClick = (id: string) => dispatch(removeIdentity(id))

  const pad = (
    value: string | number,
    width: number,
    paddedString?: string
  ) => {
    const string = paddedString || '0'
    const stringToDisplay = value.toString()
    return stringToDisplay.length >= width
      ? value
      : new Array(width - stringToDisplay.length + 1).join(string) + value
  }

  const cardStyle = (() => ({
    backgroundColor: `#${pad(identity.color, 6)}`,
  }))()

  return (
    <article
      className={clsx(
        'rounded-lg p-4 flex flex-row items-center md:items-baseline md:flex-col',
        { '!flex-row !items-center': listMode },
        className
      )}
      style={cardStyle}
    >
      <section
        className={clsx(
          'flex flex-row items-center md:items-baseline md:flex-col w-10/12 md:w-full',
          {
            '!flex-row !items-center !w-10/12': listMode,
          }
        )}
      >
        <h3
          className={clsx(
            'font-medium text-md text-gray-400 mix-blend-plus-lighter truncate w-1/3 md:w-full',
            {
              '!w-1/3': listMode,
            }
          )}
        >
          {identity.username}
        </h3>
        <span
          className={clsx(
            'text-sm text-gray-400 mix-blend-plus-lighter truncate mb-0 w-1/3 md:mb-2 md:w-full',
            {
              '!mb-0 !w-1/3': listMode,
            }
          )}
        >
          {identity.email}
        </span>
        <span
          className={clsx(
            'text-right w-1/3 pr-4 md:text-left md:w-auto md:pr-0 text-sm text-gray-400 mix-blend-plus-lighter truncate md:w-full',
            {
              '!text-right !w-1/3 !pr-4': listMode,
            }
          )}
        >
          {format(new Date(identity.birthdate), 'yyyy/MM/dd')}
        </span>
      </section>
      <footer
        className={clsx('flex justify-end w-2/12 md:w-full', {
          '!w-2/12': listMode,
        })}
      >
        <DeleteButton
          className="justify-center !p-0 !rounded-[4px] !md:h-auto !bg-white mix-blend-hard-light !h-[24px] md:!h-[32px] !w-[24px] md:!w-[32px]"
          handleDeleteClick={handleDeleteClick}
          id={identity.id}
        />
      </footer>
    </article>
  )
}

export default IdentityCard
