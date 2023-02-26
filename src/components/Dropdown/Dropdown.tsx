import { ReactNode, useEffect, useRef, Children, isValidElement } from 'react'
import cn from 'classnames'
import styles from './Dropdown.module.scss'

interface DropdownProps {
  children: ReactNode
  isOpen: boolean
  onHide: () => void
  className?: string
}

const Dropdown = ({ children, isOpen, onHide, className }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!dropdownRef.current) return

      const path = e.composedPath()
      const isClickOutside = !path.includes(dropdownRef.current)

      if (isClickOutside) {
        onHide()
      }
    }

    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  return (
    //* Из-за такой реализации возникают проблемы с hmr + css (приходится перезапускать проект при разработке, чтобы применились стили внутри Children)

    <div className={cn(className, styles.dropdown)} ref={dropdownRef}>
      <div className={styles.dropdown__head}>
        {Children.map(children, (child) => {
          if (isValidElement(child) && child.type === Head) {
            return child
          }
        })}
      </div>

      {isOpen && (
        <div className={styles.dropdown__list}>
          {Children.map(children, (child) => {
            if (isValidElement(child) && child.type === List) {
              return child
            }
          })}
        </div>
      )}
    </div>
  )
}

interface HeadProps {
  children: ReactNode
}

interface ListProps {
  children: ReactNode
}

const Head = ({ children }: HeadProps) => {
  return <>{children}</>
}
const List = ({ children }: ListProps) => {
  return <>{children}</>
}

Dropdown.Head = Head
Dropdown.List = List

export { Dropdown }
