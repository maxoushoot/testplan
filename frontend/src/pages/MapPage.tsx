import { useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { getSaturation } from '../api/client';
import { SaturationResponse } from '../api/types';

const colorByLevel: Record<string, string> = {
  LOW: '#4CAF50',
  MEDIUM: '#FF9800',
  HIGH: '#F44336'
};

export default function MapPage() {
  const [zones, setZones] = useState<SaturationResponse[]>([]);

  useEffect(() => {
    getSaturation(new Date().toISOString().slice(0, 10)).then(setZones).catch(console.error);
  }, []);

  const zoneColors = useMemo(() => {
    return zones.reduce<Record<string, string>>((acc, zone) => {
      acc[zone.zoneCode] = colorByLevel[zone.status];
      return acc;
    }, {});
  }, [zones]);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Plan interactif des zones</Typography>
      <svg width="600" height="300" viewBox="0 0 600 300">
        <g id="Z-01"><rect x="20" y="20" width="150" height="100" fill={zoneColors['Z-01'] ?? '#CCC'} stroke="#222" /></g>
        <g id="Z-02"><rect x="220" y="20" width="150" height="100" fill={zoneColors['Z-02'] ?? '#CCC'} stroke="#222" /></g>
        <g id="Z-03"><rect x="420" y="20" width="150" height="100" fill={zoneColors['Z-03'] ?? '#CCC'} stroke="#222" /></g>
      </svg>
    </Box>
  );
}
