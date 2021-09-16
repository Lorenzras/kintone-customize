import { format } from 'date-fns';

const updateDatesTable = (generatedDates, setSnackIsOpen) => {
  if (!generatedDates.length) return;

  const { record } = kintone.app.record.get();
  const { notifTable } = record;
  const tableRows = generatedDates.map((dt) => ({
    id: null,
    value: {
      notifDate: {
        type: 'DATE',
        value: format(dt, 'yyyy-MM-dd'),
      },
    },
  }));
  notifTable.value = tableRows;
  kintone.app.record.set({ record });
  setSnackIsOpen(true);
};

export default updateDatesTable;
