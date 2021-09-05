import { fetchRecords } from '../../../kintone-api/fetchRecords';
import {
  normDuration, normStatus, normType, toKintoneRecords, getYasumiWeight, getKintoneType,
} from '../helpers/converters';
import { getEmployeeNumber } from './user';
import deleteRecords from '../../../kintone-api/deleteRecords';
import addRecords from '../../../kintone-api/addRecords';
import updateRecords from '../../../kintone-api/updateRecords';

const ownRecordFilter = `employeeNumber = "${getEmployeeNumber()}"`;

export const fetchYasumiRecords = async (luxonDate) => {
  const startDay = luxonDate.startOf('month').toISODate();
  const endDay = luxonDate.endOf('month').toISODate();

  return fetchRecords({
    condition: [
      ownRecordFilter,
      `yasumiDate >= "${startDay}"`,
      `yasumiDate <= "${endDay}"`,
    ].join(' and '),
  });
};

/**
 * Delete record by dates.
 * @param {String[]} dates - dates to be deleted.
 * @param {string} employees[].name - The name of an employee.
 * @param {string} employees[].department - The employee's department.
 */
export const deleteRecordByDates = async (dates) => {
  if (!dates.length) return 'No Items to delete.';

  const datesToQuery = dates.map((item) => `yasumiDate = "${item}"`).join(' or ');
  const typeToQuery = `type in ("${getKintoneType('day-ordinary')}")`;

  const recordIds = (await fetchRecords({
    condition: [
      ownRecordFilter,
      typeToQuery,
      `(${datesToQuery})`,
    ].join(' and '),
    fields: ['$id'],
  })).records.map(({ $id }) => $id.value);

  if (recordIds) {
    return deleteRecords({ ids: recordIds });
  }
  return 'No items to delete';
};

export const addYasumiRecords = async (unsavedRecords) => {
  if (!unsavedRecords.length) return 'No records to add';
  const kintoneRecords = toKintoneRecords(unsavedRecords);
  return addRecords({ records: kintoneRecords });
};

export const updateYasumiRecords = async (unsavedRecords, savedRecords) => {
  if (!unsavedRecords.length) return 'No records to update';
  const kintoneRecords = toKintoneRecords(unsavedRecords, savedRecords);
  console.log(kintoneRecords, 'updt');
  return updateRecords({ records: kintoneRecords });
};

/*
yasumiRecToObj(luxonDate)
Example Output
{
 2021-09-01: [
   {
     type: day-ordinary
     duration: day-whole
     status: unprocessed
   }
 ],
}
*/
export const yasumiRecToObj = async (luxonDate) => (
  await fetchYasumiRecords(luxonDate)).records.reduce((accu, curr) => {
  const {
    $id: { value: recordId },
    yasumiDate: { value: yasumiDate },
    type: { value: yasumiType },
    duration: { value: duration },
    ステータス: { value: status },
  } = curr;

  accu[yasumiDate] = [].concat({
    id: recordId,
    type: normType[yasumiType],
    duration: normDuration[duration],
    status: normStatus[status],
  });

  return accu;
}, {});

export const yasumiUsed = (yasumiRecords) => {
  let result = 0;
  Object.values(yasumiRecords).forEach((val) => {
    const { duration = null } = val.find(({ type }) => type === 'day-ordinary') || [];
    result += duration ? getYasumiWeight(duration) : 0;
  });

  return result;
};

export const defaultRecord = {
  type: 'day-ordinary',
  duration: null,
};