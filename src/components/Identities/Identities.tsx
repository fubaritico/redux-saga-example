import React, { FC } from 'react'

import IdentityCard from '@Components/IdentityCard'
import { getIdentities, getListMode } from '@Redux/identities/selectors'
import clsx from 'clsx'
import { useAppSelector } from '@Redux/hooks'

const Identities: FC = () => {
  const identities = useAppSelector(getIdentities)
  const listMode = useAppSelector(getListMode)

  return (
    <div
      className={clsx(
        'flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[16px] w-full',
        { '!flex !flex-col': listMode }
      )}
    >
      {identities.map((identity) => (
        <IdentityCard
          key={identity.id}
          identity={identity}
          listMode={listMode}
        />
      ))}
    </div>
  )
}

export default Identities
