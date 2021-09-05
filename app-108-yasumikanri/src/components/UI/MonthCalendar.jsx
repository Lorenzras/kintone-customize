import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import { Box } from '@mui/material';
import './MonthCalendar.css';
import DayCell from './DayCell';

const MonthCalendar = ({
  remainingYasumi,
  clickDayHandler,
  datesSetHandler,
  yasumiRecords,
}) => {
  const dayCellContentRender = (args) => <DayCell {...{ args, yasumiRecords }} />;

  return (
    <Box height="100vh">
      <FullCalendar
        dayCellContent={dayCellContentRender}
        datesSet={datesSetHandler}
        dayCellClassNames={['day-cell']}
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={clickDayHandler}
        locale={jaLocale}
        fixedWeekCount={false}
        height="auto"
        customButtons={{
          remainingYasumi: {
            text: `残りの休み: ${remainingYasumi || 0}`,
          },
        }}
        headerToolbar={{
          start: 'title',
          center: 'remainingYasumi',
          end: 'today prev,next',
        }}
        events={[
          {
            start: '2021-09-10T10:00:00',
            allDay: true,
            display: 'background',
            classNames: ['day-all'],
          },
        ]}
      />
    </Box>
  );
};

export default MonthCalendar;