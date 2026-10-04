import { NavLink } from 'react-router-dom'

type MenuItem = {
  path: string
  label: string
}

const menuItems: MenuItem[] = [
  { path: '/counterparty', label: 'counterparty' },
  { path: '/historicalcounterparty', label: 'historicalcounterparty' },
  { path: '/historicalproject', label: 'historicalproject' },
  { path: '/historicalprojectitem', label: 'historicalprojectitem' },
  { path: '/historicalprojectstatus', label: 'historicalprojectstatus' },
  { path: '/project', label: 'project' },
  { path: '/projectfile', label: 'projectfile' },
  { path: '/projectitem', label: 'projectitem' },
  { path: '/projectstatus', label: 'projectstatus' },
  { path: '/financeoperationtype', label: 'financeoperationtype' },
  { path: '/financialtransaction', label: 'financialtransaction' },
  { path: '/factoryfile', label: 'factoryfile' },
  { path: '/location', label: 'location' },
  { path: '/nomenclature', label: 'nomenclature' },
  { path: '/nomenclaturefile', label: 'nomenclaturefile' },
  { path: '/nomenclatureimage', label: 'nomenclatureimage' },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">ERP APP</div>
      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
