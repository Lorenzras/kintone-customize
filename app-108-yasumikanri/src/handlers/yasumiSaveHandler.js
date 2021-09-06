import { debounce } from 'lodash';
import { addYasumiRecords, deleteRecordByDates, updateYasumiRecords } from '../backend/yasumiKanri';
import { getOrdinaryYasumi } from '../helpers/converters';
import refetchData from './refetchData';

const deleteRecords = async ({
  /* Fix this */
  newYasumiRecords,
  savedRecords,
}) => {
  const datesToBeDeleted = [];
  Object.keys(savedRecords).forEach((key) => {
    if (!newYasumiRecords[key] || savedRecords[key].length > newYasumiRecords[key].length) {
      datesToBeDeleted.push(key);
    }
  });

  return deleteRecordByDates(datesToBeDeleted);
};

const pushToRecordsToSave = (recordsToSaveArray, unsavedRecord, key) => {
  const dayOrdinary = getOrdinaryYasumi(unsavedRecord);
  if (dayOrdinary.length) {
    recordsToSaveArray.push({ ...{ date: key }, ...dayOrdinary[0] });
  }
};

const compareAndSaveRecords = async ({
  newYasumiRecords,
  savedRecords,
}) => {
  const recordsToAdd = [];
  const recordsToUpdate = [];

  Object.keys(newYasumiRecords).forEach(
    (key) => {
      if (!savedRecords[key]
        || newYasumiRecords[key].length > savedRecords[key].length) {
        pushToRecordsToSave(recordsToAdd, newYasumiRecords[key], key);
      } else if (
        JSON.stringify(newYasumiRecords[key]) !== JSON.stringify(savedRecords[key])) {
        pushToRecordsToSave(recordsToUpdate, newYasumiRecords[key], key);
      }
    },
  );

  const promises = [
    addYasumiRecords(recordsToAdd),
    updateYasumiRecords(recordsToUpdate, savedRecords),
  ];
  return Promise.allSettled(promises);
};

const yasumiSaveHandler = debounce(async ({
  newYasumiRecords,
  savedRecords,
  maxYasumi,
  currentMonth,
  setSavedRecords,
  setRemainingYasumi,
  setYasumiRecords,
  setSnackType,
  setSnackOpen,
}) => {
  const promises = [
    deleteRecords({ savedRecords, newYasumiRecords }),
    compareAndSaveRecords({ savedRecords, newYasumiRecords }),
  ];

  const result = await Promise.allSettled(promises);

  const isSuccess = !JSON.stringify(result).includes('rejected');

  setSnackType(isSuccess ? 'saveSuccess' : 'saveErrors');
  setSnackOpen(true);

  await refetchData({
    currentMonth,
    setYasumiRecords,
    setSavedRecords,
    setRemainingYasumi,
    maxYasumi,
  });
}, 1000);

export default yasumiSaveHandler;
