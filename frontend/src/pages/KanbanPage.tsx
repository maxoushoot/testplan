import { DndContext, DragEndEvent, closestCenter, useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { getWorks, updateWork } from '../api/client';
import { Work } from '../api/types';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export default function KanbanPage() {
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => { getWorks().then(setWorks).catch(console.error); }, []);

  const columns = useMemo(() => {
    return weekdays.reduce<Record<string, Work[]>>((acc, day) => {
      acc[day] = works.filter((w) => (w.planned_start_date ? new Date(w.planned_start_date).toLocaleDateString('en-US', { weekday: 'short' }) : 'Mon') === day);
      return acc;
    }, {});
  }, [works]);

  const onDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over) return;
    const work = works.find((w) => w.id === active.id);
    if (!work) return;

    const targetDay = weekdays.includes(String(over.id))
      ? String(over.id)
      : weekdays.find((day) => columns[day].some((w) => w.id === over.id));
    if (!targetDay) return;

    const nextDate = nextWeekdayDate(targetDay);
    const updated = await updateWork(work.id, { planned_start_date: nextDate.toISOString(), version: work.version });
    setWorks((prev) => prev.map((w) => (w.id === work.id ? updated : w)));
  };

  return (
    <Box sx={{ bgcolor: '#F4F2F6', p: 2, borderRadius: 2 }}>
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <Grid container spacing={2} wrap="nowrap" sx={{ overflowX: 'auto' }}>
          {weekdays.map((day) => (
            <Grid item xs={12} md={3} lg={2} key={day}>
              <Typography variant="h6" gutterBottom>{day}</Typography>
              <SortableContext items={columns[day]?.map((w) => w.id) ?? []} strategy={rectSortingStrategy}>
                <Column day={day}>{(columns[day] ?? []).map((work) => <WorkCard key={work.id} work={work} />)}</Column>
              </SortableContext>
            </Grid>
          ))}
        </Grid>
      </DndContext>
    </Box>
  );
}

function Column({ day, children }: { day: string; children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id: day });
  return <Box ref={setNodeRef} sx={{ minHeight: 300, p: 1, bgcolor: 'background.paper', borderRadius: 2 }}>{children}</Box>;
}

function WorkCard({ work }: { work: Work }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: work.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners} sx={{ mb: 1, cursor: 'grab' }}>
      <CardContent>
        <Typography variant="subtitle2">{work.title}</Typography>
        <Chip label={`Workers: ${work.workers_count}`} size="small" />
      </CardContent>
    </Card>
  );
}

function nextWeekdayDate(day: string) {
  const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const target = dayMap[day];
  const date = new Date();
  while (date.getDay() !== target) date.setDate(date.getDate() + 1);
  return date;
}
