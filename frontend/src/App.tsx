import { AppBar, Box, Drawer, List, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import KanbanPage from './pages/KanbanPage';
import GanttPage from './pages/GanttPage';
import MapPage from './pages/MapPage';

const nav = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Kanban', path: '/kanban' },
  { label: 'Gantt', path: '/gantt' },
  { label: 'Plan Interactif', path: '/map' }
];

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="fixed" color="primary" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6">App de Planification des Travaux</Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" sx={{ width: 220, [`& .MuiDrawer-paper`]: { width: 220, mt: 8 } }}>
        <List>
          {nav.map((item) => (
            <ListItemButton key={item.path} selected={location.pathname === item.path} onClick={() => navigate(item.path)}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, ml: '220px' }}>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/kanban" element={<KanbanPage />} />
          <Route path="/gantt" element={<GanttPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}
