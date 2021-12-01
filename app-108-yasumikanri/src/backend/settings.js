import {fetchSettings} from '../../../kintone-api/fetchRecords';
import {envAppId} from '../helpers/env';

/* Plus 1 yasumi for support roles. */
const yasumiDaysReference = {
  31: 8,
  30: 7,
  29: 6,
  28: 5,
};

const calcYasumiDays = (luxonDate) => {
  const monthDays = luxonDate.endOf('month').day;
  return yasumiDaysReference[monthDays];
};

const getYasumiCount = async (luxonDate) => {
  const {year, month} = luxonDate;

  const employeeRole = localStorage.getItem('employeeRole');

  const {
    設定: {value: settingsTable},
  } = (await fetchSettings(envAppId())).records[0];

  const yasumiDaysSetting = settingsTable.find(({value}) => {
    const {設定名: {value: settingsName}} = value;
    return settingsName === `休み数_${year}`;
  });

  const yasumiDays = yasumiDaysSetting
    ? JSON.parse(yasumiDaysSetting?.value.設定値.value)[month]
    : 0;

  return (yasumiDays || calcYasumiDays(luxonDate)) + (employeeRole === 'サポート' ? 1 : 0);
};

export default getYasumiCount;
