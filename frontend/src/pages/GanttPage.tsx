import { useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ViewMode, Task, Gantt } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { getWorks, updateWork } from '../api/client';
import { Work } from '../api/types';

export default function GanttPage() {
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => { getWorks().then(setWorks).catch(console.error); }, []);

  const tasks = useMemo<Task[]>(() => {
    return works.map((w) => ({
      id: w.id,
      name: `${w.zone?.code ?? w.zone_id} - ${w.title}`,
      start: w.planned_start_date ? new Date(w.planned_start_date) : new Date(),
      end: w.planned_end_date ? new Date(w.planned_end_date) : new Date(Date.now() + 86400000),
      type: 'task',
      progress: w.planning_status === 'DONE' ? 100 : 40,
      project: w.zone_id
    }));
  }, [works]);

  const onDateChange = async (task: Task) => {
    const work = works.find((w) => w.id === task.id);
    if (!work) return;

    try {
      const updated = await updateWork(work.id, {
        planned_start_date: task.start.toISOString(),
        planned_end_date: task.end.toISOString(),
        version: work.version
      });
      setWorks((prev) => prev.map((w) => (w.id === work.id ? updated : w)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Gantt groupé par zone</Typography>
      <Gantt tasks={tasks} viewMode={ViewMode.Week} onDateChange={onDateChange} />
    </Box>
  );
}
