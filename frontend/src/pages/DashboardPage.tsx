import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getSaturation, getWorks } from '../api/client';
import { Work } from '../api/types';

export default function DashboardPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [saturationCount, setSaturationCount] = useState(0);

  useEffect(() => {
    getWorks().then(setWorks).catch(console.error);
    getSaturation(new Date().toISOString().slice(0, 10))
      .then((rows) => setSaturationCount(rows.filter((row) => row.status === 'HIGH').length))
      .catch(console.error);
  }, []);

  const chartData = useMemo(() => {
    const byDay: Record<string, number> = {};
    works.forEach((work) => {
      const day = work.planned_start_date?.slice(0, 10) ?? 'Unplanned';
      byDay[day] = (byDay[day] ?? 0) + work.workers_count;
    });
    return Object.entries(byDay)
      .slice(0, 7)
      .map(([day, workers]) => ({ day, workers, capacity: 40 }));
  }, [works]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}><KpiCard title="Travaux sur 7j" value={works.length} /></Grid>
      <Grid item xs={12} md={4}><KpiCard title="Zones saturées" value={saturationCount} /></Grid>
      <Grid item xs={12} md={4}><KpiCard title="Total intervenants" value={works.reduce((sum, w) => sum + w.workers_count, 0)} /></Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Charge par jour vs Capacité</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="workers" fill="#7A00E6" name="Charge" />
                <Bar dataKey="capacity" fill="#23004C" name="Capacité" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

function KpiCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
}
