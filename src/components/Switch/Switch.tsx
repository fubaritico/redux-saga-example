import { FC, useState } from 'react'
import clsx from 'clsx'

export type SwitchProps = {
  iconOff?: FC
  iconOn?: FC
  label?: {
    off: string
    on: string
  }
  onClick?: () => void
  on?: boolean
  thumbColorOff?: string
  thumbColorOn?: string
}
// className="!fill-white dark:!fill-slate-100"
const Switch: FC<SwitchProps> = ({
  iconOff: IconOff,
  iconOn: IconOn,
  label,
  on = false,
  onClick,
  thumbColorOff,
  thumbColorOn,
}) => {
  const [toggle, setToggle] = useState(() => on)

  const onSwitchClick = () => {
    if (!onClick) {
      setToggle(!toggle)
      return
    }
    onClick()
  }

  return (
    <section className="flex items-center" data-state={on}>
      {label && (
        <h4 className="font-bold text-[12px] md:text-[14px] text-slate-400 dark:text-slate-500 mr-2">
          <>{on ? label.on : label.off}</>
        </h4>
      )}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/interactive-supports-focus */}
      <div
        className="relative rounded-full p-[2px] cursor-pointer border-2 border-slate-300 dark:border-slate-600 h-[20px] w-[40px] md:h-[28px] md:w-[56px]"
        onClick={onSwitchClick}
        role="button"
      >
        <div
          className={clsx(
            'absolute flex items-center justify-center rounded-full p-[2px] h-[12px] w-[12px] md:h-[20px] md:w-[20px] transition-[left] duration-300 ease-in-out',
            {
              'left-[2px]': onClick ? on : !toggle,
              '!left-[22px] md:!left-[30px]': onClick ? on : toggle,
            },
            thumbColorOff,
            thumbColorOn
          )}
        >
          {!on && IconOff && <IconOff />}
          {on && IconOn && <IconOn />}
        </div>
      </div>
    </section>
  )
}

export default Switch
