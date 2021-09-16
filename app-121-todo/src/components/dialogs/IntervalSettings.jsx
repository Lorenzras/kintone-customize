import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useState } from 'react';
import addDays from 'date-fns/addDays';
import EveryWeek from '../forms/EveryWeek';
import CustomDatePicker from '../UI/CustomDatePicker';
import { eachMonthDayOfInterval, eachWeekDayOfInterval } from '../../helpers/time';
import EveryMonth from '../forms/EveryMonth';

const getRepeatDates = (intervalType, interval, intervalSettings) => {
  const { weekDays, monthDays } = intervalSettings;
  switch (intervalType) {
    case 'everyWeek':
      return eachWeekDayOfInterval(interval, weekDays);
    case 'everyMonth':
      return eachMonthDayOfInterval(interval, monthDays);
    default:
      break;
  }

  return null;
};

const FormContent = ({ intervalType, intervalSettings, setIntervalSettings }) => {
  switch (intervalType) {
    case 'everyWeek':
      return <EveryWeek {...{ intervalSettings, setIntervalSettings }} />;
    case 'everyMonth':
      return <EveryMonth {...{ intervalSettings, setIntervalSettings }} />;
    default:
      return null;
  }
};

const IntervalSettings = ({ items, intervalForm, closeFormHandler }) => {
  const [intervalSettings, setIntervalSettings] = useState({
    weekDays: [],
    monthDays: [],
  });
  const [untilDate, setUntilDate] = useState(addDays(new Date(), 30));
  const intervalType = intervalForm.selectValue;

  const generateHandler = () => {
    const interval = {
      start: new Date(),
      end: untilDate,
    };
    const repeatDates = getRepeatDates(
      intervalType,
      interval,
      intervalSettings,
    );

    closeFormHandler(repeatDates);
  };

  return (
    <Dialog onClose={closeFormHandler} open={intervalForm.isOpen}>
      <DialogTitle>
        {items[intervalForm.selectValue]}
        の繰り返し設定
      </DialogTitle>

      <FormContent {...{ intervalSettings, setIntervalSettings, intervalType }} />
      <CustomDatePicker {...{ untilDate, setUntilDate }} />

      <DialogActions>
        <Button onClick={closeFormHandler}>キャンセル</Button>
        <Button onClick={generateHandler} autoFocus>
          生成する
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IntervalSettings;
