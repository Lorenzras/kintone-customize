/* Typescript */

interface AppRecord {
  recordId: string,
  appId?: string,
  domain?: string | null
}

export const isMobile : boolean = (window.location.href).includes('k/m');

export const getAppId = () : number | null => {
  const url = window.location.href;
  return url.includes('k/m')
    ? kintone.mobile.app.getId()
    : kintone.app.getId();
};

export const getRecordPath = (
  {
    recordId,
    appId,
    domain
  }: AppRecord) : string => {
  const _domain = domain ? domain : window.location.href;
  const _device = isMobile ? 'k/m' : 'k';
  const _record = recordId
    ? `show${isMobile ? '?' : '#'}record=${recordId}`
    : '';

  return `https://${_domain}/${_device}/${appId}/${_record}`;

};

export const goToRecordPath = (recordDetails : AppRecord) => {
  window?.open(getRecordPath(recordDetails), '_blank')?.focus();
};

export const onEdit : string[] = [
  'app.record.edit.show',
  'mobile.app.record.edit.show',
];

export const onCreate : string[] = [
  'app.record.create.show',
  'mobile.app.record.create.show',
];

export const onEditSubmit = [
  'app.record.edit.submit',
  'mobile.app.record.edit.submit',
];

export const onEditSubmitSuccess : string[] = [
  'app.record.edit.submit.success',
  'mobile.app.record.edit.submit.success',
];

export const onCreateSubmit : string[] = [
  'app.record.create.submit',
  'mobile.app.record.create.submit',
];

export const onCreateSubmitSuccess : string[] = [
  'app.record.create.submit.success',
  'mobile.app.record.create.submit.success',
];


export const onEditOrCreate : string[] = onEdit.concat(onCreate);
export const onSubmit : string[] = onEditSubmit.concat(onCreateSubmit);
export const onSubmitSuccess : string[] = onEditSubmitSuccess.concat(onCreateSubmitSuccess);



export const onFieldChange = (fields : string | string[]) : string[] =>
  ([] as string[]).concat(fields).reduce(
    (acc : string[], curr) : string[] => {
      return acc.concat(
        `app.record.edit.change.${curr}`,
        `mobile.app.record.edit.change.${curr}`,
        `app.record.create.change.${curr}`,
        `mobile.app.record.create.change.${curr}`
      );
    }, [],
  );

export const getPortalSpaceElement = () => (
  isMobile
    ? kintone.mobile.portal.getContentSpaceElement()
    : kintone.portal.getContentSpaceElement()

);
