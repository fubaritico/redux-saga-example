import React, { FC } from 'react'

import { ReactComponent as BinIcon } from '@Svg/bin.svg'
import Button from '@Components/Button'

export type DeleteButtonProps = {
  className?: string
  handleDeleteClick: (id: string) => void
  id: string
}

const DeleteButton: FC<DeleteButtonProps> = ({
  className,
  handleDeleteClick,
  id,
}) => (
  <Button
    aria-label="Remove identity"
    className={className}
    onClick={() => handleDeleteClick(id)}
  >
    <BinIcon className="w-[16px] md:w-[20px] fill-slate-700" />
  </Button>
)

export default DeleteButton
