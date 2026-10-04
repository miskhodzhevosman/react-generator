import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider, createTheme } from '@mantine/core'
import { DatesProvider } from '@mantine/dates'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import 'dayjs/locale/ru'
import './index.css'
import App from './App.tsx'

const theme = createTheme({
  primaryColor: 'violet',
  fontFamily: 'system-ui, "Segoe UI", Roboto, sans-serif',
  headings: {
    fontFamily: 'system-ui, "Segoe UI", Roboto, sans-serif',
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <DatesProvider settings={{ locale: 'ru' }}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DatesProvider>
    </MantineProvider>
  </StrictMode>,
)
