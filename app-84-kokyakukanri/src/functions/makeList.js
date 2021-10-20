/**
   * リストのプルダウンを作成する
   * @param {array} lists : (inputの例) 店舗リスト[ 店舗名 ,・・・]
   */
export function makeList(lists, targetID) {
  // 「【選択してください】」と「全レコードを表示」を追加
  $(`#${targetID}`).append($('<option>').html('【選択してください】').val('init'));
  $(`#${targetID}`).append($('<option>').html('全レコードを表示').val('listall'));

  // 配列の各要素を、セレクトボックスの選択肢(option)に追加する
  lists.forEach((item) => {
    $(`#${targetID}`).append($('<option>').html(item).val(item));
  });
}

/**
   * 社員リストから、対象の役職のみを取り出す処理
   * @param {Array} lists : 社員リストapp86EmployeesD({name: 氏名, shop: 店舗})
   * @param {string} targetID : optionを追加するselectのID名
   * @param {string} targetShop : 社員名のリスト化したい対象店舗名
   */
export function makeEmpList(lists, targetID, targetShop) {
  let newlists;
  // 【選択してください】と'全レコードを表示'の時には、社員リストには全員追加する
  if (['init', 'listall'].includes(targetShop)) {
    newlists = lists; // listsはそのまま
  } else {
    newlists = lists.filter((item) => targetShop === item.shop);
  }
  // 社員リストの配列を、社員名だけのシンプルな配列に変換する
  newlists = newlists.map((item) => (item.name));

  makeList(newlists, targetID); // セレクトボックスに、該当の社員名を追加する
}
