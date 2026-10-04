import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons-react'

export default function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme()
  const computed = useComputedColorScheme('light')

  return (
    <ActionIcon
      onClick={() => setColorScheme(computed === 'light' ? 'dark' : 'light')}
      variant="default"
      size="lg"
      aria-label="Переключить тему"
    >
      {computed === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />}
    </ActionIcon>
  )
}
