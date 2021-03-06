import {getAppId} from './api';

const settingsAppId = 82;
const employeeListAppId = 34;

export const fetchRecordById = ({appId, recordId}) => {
  const body = {
    app: appId,
    id: recordId,
  };
  return kintone.api(
    kintone.api.url('/k/v1/record.json', true),
    'GET', body,
  );
};

/**
 * 制約まで取得
 *
 * @param {object} root0 リクエストオブジェクト
 * @param {string} root0.appId アプリ番号
 * @param {string[]} root0.fields フィールド
 * @param {string} root0.condition クエリ
 * @returns {object[]} kintone records
 */
export const fetchRecords = ({
  condition = '',
  appId = getAppId(),
  fields = [],
}) => {
  const body = {
    app: appId,
    query: condition,
    fields,
  };
  return kintone.api(
    kintone.api.url('/k/v1/records', true),
    'GET',
    body,
  );
};

/**
 * 再起で取得 １万件まで
 *
 * @param {object} _params リクエストオブジェクト
 * @returns {object[]} kintone records
 */
export const fetchAllRecords = (_params) => {
  const MAX_READ_LIMIT = 500;

  const params = _params || {};
  const {
    filterCond,
    sortConds,
    fields,
  } = params;


  const app = params.appId || getAppId();
  const limit = params.limit || -1;
  const offset = params.offset || 0;
  let mydata = params.data;

  if (!mydata) {
    mydata = {
      records: [],
    };
  }

  let willBeDone = false;
  let thisLimit = MAX_READ_LIMIT;
  // getRecords 関数の呼び出し側で、レコードの取得件数を指定された場合は
  // 取得件数を満たせば終了するように willBeDone を true にする
  if (limit > 0) {
    if (thisLimit > limit) {
      thisLimit = limit;
      willBeDone = true;
    }
  }

  const conditions = [];
  if (filterCond) {
    conditions.push(filterCond);
  }

  const sortCondsAndLimit = `${sortConds && sortConds.length > 0 ? ` order by ${sortConds.join(', ')}` : ''
  } limit ${thisLimit}`;
  const query = `${conditions.join(' and ') + sortCondsAndLimit} offset ${offset}`;
  const body = {
    app,
    query,
  };
  if (fields && fields.length > 0) {
    body.fields = fields;
  }
  return kintone.api(kintone.api.url('/k/v1/records', true), 'GET', body).then((resp) => {
    mydata.records = mydata.records.concat(resp.records);
    const myoffset = resp.records.length;
    if (limit > 0 && limit < myoffset) {
      willBeDone = true;
    }
    // 取得すべきレコードを取得したら終了する
    if (myoffset < thisLimit || willBeDone) {
      return mydata;
    }
    // 取得すべきレコードが残っている場合は、再帰呼び出しで残りのレコードを取得する
    return fetchAllRecords({
      app,
      filterCond,
      sortConds,
      limit: limit - myoffset,
      offset: offset + myoffset,
      fields,
      mydata,
    });
  });
};

export const fetchSettings = (
  appId = getAppId(),
) => fetchRecords({
  condition: `コード = "${appId}"`,
  appId: settingsAppId,
});

export const fetchEmployeeById = (
  employeeNumber,
) => fetchRecordById({
  appId: employeeListAppId,
  recordId: employeeNumber,
});
