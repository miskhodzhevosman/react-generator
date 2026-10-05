import { NavLink as RouterNavLink, useLocation } from 'react-router-dom'
import { NavLink, Stack, Text, ScrollArea, Box, Group } from '@mantine/core'
import ColorSchemeToggle from './ColorSchemeToggle'

type MenuItem = {
  path: string
  label: string
}

const menuItems: MenuItem[] = [
  { path: '/counterparty', label: 'Counterparty' },
  { path: '/historicalcounterparty', label: 'Historicalcounterparty' },
  { path: '/historicalproject', label: 'Historicalproject' },
  { path: '/historicalprojectitem', label: 'Historicalprojectitem' },
  { path: '/historicalprojectstatus', label: 'Historicalprojectstatus' },
  { path: '/project', label: 'Project' },
  { path: '/projectfile', label: 'Projectfile' },
  { path: '/projectitem', label: 'Projectitem' },
  { path: '/projectstatus', label: 'Projectstatus' },
  { path: '/financeoperationtype', label: 'Financeoperationtype' },
  { path: '/financialtransaction', label: 'Financialtransaction' },
  { path: '/factoryfile', label: 'Factoryfile' },
  { path: '/location', label: 'Location' },
  { path: '/nomenclature', label: 'Nomenclature' },
  { path: '/nomenclaturefile', label: 'Nomenclaturefile' },
  { path: '/nomenclatureimage', label: 'Nomenclatureimage' },
]

function Sidebar() {
  const { pathname } = useLocation()

  return (
    <Box p="md" h="100%">
      <Group justify="space-between" align="center" mb="lg">
        <Text size="xl" fw={700}>
          ERP APP
        </Text>
        <ColorSchemeToggle />
      </Group>

      <ScrollArea h="calc(100% - 60px)">
        <Stack gap={4}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              component={RouterNavLink}
              to={item.path}
              label={item.label}
              active={pathname === item.path}
              variant="light"
            />
          ))}
        </Stack>
      </ScrollArea>
    </Box>
  )
}

export default Sidebar
