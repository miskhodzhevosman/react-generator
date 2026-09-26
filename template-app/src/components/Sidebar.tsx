import { NavLink } from 'react-router-dom'

type MenuItem = {
  path: string
  label: string
  icon: string
}

const menuItems: MenuItem[] = [
  { path: '/nomenclature', label: 'nomenclature', icon: '🏠' },
  { path: '/project', label: 'project', icon: '🏠' },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">MyApp</div>
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
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
