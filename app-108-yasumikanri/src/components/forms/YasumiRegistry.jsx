import {
  useState, useRef,
} from 'react';
import { Container } from '@mui/material';
import MonthCalendar from '../UI/MonthCalendar';
import { JSDToLux } from '../../helpers/time';
import getYasumiCount from '../../backend/settings';

import yasumiChangeHandler from '../../handlers/yasumiChangeHandler';
import refetchData from '../../handlers/refetchData';

import deleteExcessYasumi from '../../handlers/deleteExcessYasumi';
import ActivitySnack from '../UI/ActivitySnack';
import SimpleSnackbar from '../UI/snackbars/SimpleSnackBar';

const YasumiRegistry = () => {
  const [yasumiRecords, setYasumiRecords] = useState();

  const [snackType, setSnackType] = useState();
  const [snackOpen, setSnackOpen] = useState(false);

  const [remainingYasumi, setRemainingYasumi] = useState();
  const currentMonth = useRef();
  const maxYasumi = useRef(0);
  // const remainingYasumi = useRef(0);
  const savedRecords = useRef();

  const clickDayHandler = (info) => {
    yasumiChangeHandler({
      info,
      yasumiRecords,
      savedRecords,
      currentMonth,
      maxYasumi,
      remainingYasumi,
      setRemainingYasumi,
      setYasumiRecords,
      setSnackType,
      setSnackOpen,
      // setErrorSnackOpen,
      // setSavedSnackOpen,
      // setWarningSnackOpen,
    });
  };

  const datesSetHandler = async ({ view }) => {
    const { currentStart } = view;
    currentMonth.current = JSDToLux(currentStart);
    maxYasumi.current = await getYasumiCount(currentMonth.current);

    refetchData({
      currentMonth,
      maxYasumi,
      savedRecords,
      setYasumiRecords,
      setRemainingYasumi,
    });
  };

  console.log('rerendered');

  /*   useEffect(async () => {
    if (yasumiRecords) {
      remainingYasumi.current = maxYasumi.current - yasumiUsed(yasumiRecords);
    }
  }, [yasumiRecords]); */

  deleteExcessYasumi({
    remainingYasumi,
    yasumiRecords,
    currentMonth,
    savedRecords,
    setYasumiRecords,
    setRemainingYasumi,
    maxYasumi,
  });

  return (
    <Container maxWidth="md">
      <MonthCalendar {...{
        remainingYasumi,
        datesSetHandler,
        clickDayHandler,
        yasumiRecords,
      }}
      />
      {/* <ActivitySnack open={Boolean(snackType)} onClose={setSnackType} snackType={snackType} /> */}

      <SimpleSnackbar open={snackOpen} setSnackOpen={setSnackOpen} />
    </Container>
  );
};

export default YasumiRegistry;
