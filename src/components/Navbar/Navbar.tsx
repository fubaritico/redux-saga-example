import { FC, PropsWithChildren } from 'react'
import clsx from 'clsx'

type NavBarProps = {
  className?: string
}

const Navbar: FC<PropsWithChildren<NavBarProps>> = ({
  children,
  className,
}) => (
  <nav
    className={clsx(
      'flex w-full flex-col space-y-2 md:flex-row md:space-y-0 items-center mb-6 md:mb-12',
      className
    )}
  >
    {children}
  </nav>
)

export default Navbar
