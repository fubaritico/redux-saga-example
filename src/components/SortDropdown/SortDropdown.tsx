import { FC, useState, MouseEventHandler } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { ReactComponent as SunIcon } from '@Svg/arrow.svg'
import clsx from 'clsx'

export type SortDropdownProps = {
  onChange: (id: string) => void
  selected?: string
}

const SortDropdown: FC<SortDropdownProps> = ({ onChange, selected }) => {
  const [open, setOpen] = useState(false)

  const onLabelClick = () => {
    setOpen(!open)
  }

  const onMenuItemClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setOpen(false)
    onChange?.(e.currentTarget.id)
  }
  const handleClickAway = () => {
    setOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="relative min-w-[150px]">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div
          className="flex bg-orange-300 dark:bg-sky-900 text-white font-medium text-[14px] h-[32px] md:h-[48px] rounded-md px-[16px] items-center space-x-1 cursor-pointer"
          onClick={onLabelClick}
        >
          <span className="block flex-1 truncate">
            Sort by{selected && <span> {selected}</span>}
          </span>
          <SunIcon className="w-5" />
        </div>
        <div
          className={clsx(
            'absolute hidden mt-1 right-1 top-full min-w-max shadow rounded-md bg-slate-200 dark:bg-slate-700 transition delay-75 ease-in-out z-10 w-full',
            { '!block': open }
          )}
        >
          <ul className="block text-slate-400">
            <li className="block px-[16px] h-[32px] md:h-[48px] hover:text-slate-500 hover:dark:text-slate-200 border border-b-slate-100 dark:border-b-slate-600 border-r-0 border-t-0 border-l-0">
              <button
                id="name"
                onClick={onMenuItemClick}
                type="button"
                className="block text-right text-[13px] h-full w-full"
              >
                Name
              </button>
            </li>
            <li className="block px-[16px] h-[32px] md:h-[48px] hover:text-slate-500 hover:dark:text-slate-200">
              <button
                id="birthday"
                onClick={onMenuItemClick}
                type="button"
                className="block text-right text-[13px] h-full w-full"
              >
                Birthday
              </button>
            </li>
          </ul>
        </div>
      </div>
    </ClickAwayListener>
  )
}

export default SortDropdown
