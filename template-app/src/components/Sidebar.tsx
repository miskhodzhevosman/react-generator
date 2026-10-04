import { NavLink as RouterNavLink, useLocation } from 'react-router-dom'
import { NavLink, Stack, Text, ScrollArea, Box, Group } from '@mantine/core'
import ColorSchemeToggle from './ColorSchemeToggle'

type MenuItem = {
  path: string
  label: string
}

const menuItems: MenuItem[] = [
  { path: '/counterparty', label: 'Counterparty' },
  { path: '/historicalcounterparty', label: 'Historical Counterparty' },
  { path: '/historicalproject', label: 'Historical Project' },
  { path: '/historicalprojectitem', label: 'Historical Project Item' },
  { path: '/historicalprojectstatus', label: 'Historical Project Status' },
  { path: '/project', label: 'Project' },
  { path: '/projectfile', label: 'Project File' },
  { path: '/projectitem', label: 'Project Item' },
  { path: '/projectstatus', label: 'Project Status' },
  { path: '/financeoperationtype', label: 'Finance Operation Type' },
  { path: '/financialtransaction', label: 'Financial Transaction' },
  { path: '/factoryfile', label: 'Factory File' },
  { path: '/location', label: 'Location' },
  { path: '/nomenclature', label: 'Nomenclature' },
  { path: '/nomenclaturefile', label: 'Nomenclature File' },
  { path: '/nomenclatureimage', label: 'Nomenclature Image' },
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
