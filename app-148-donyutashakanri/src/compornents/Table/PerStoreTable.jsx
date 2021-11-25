
import PropTypes from 'prop-types';
import Header from '../Header';
import {CellHeader} from '@yumetetsu/ui';

const PerStoreTable = ({area, data, componentRef}) => {
  const newTable = data.map(({エリア店舗名, 媒体サイト名, 導入他社数, 課金額, レコード番号})=>{
    return (
      <tr key={レコード番号.value}>
        <td key={[レコード番号.value, '01'].join()}>{エリア店舗名.value}</td>
        <td key={[レコード番号.value, '02'].join()}>{媒体サイト名.value}</td>
        <td key={[レコード番号.value, '03'].join()}>{導入他社数.value}</td>
        <td key={[レコード番号.value, '04'].join()}>{課金額.value}</td>
      </tr>
    );
  });

  return (
    <div ref={componentRef}>
      <article className="print-area">
        <Header area={area} /><br />
        <span className="subTitle"> 課金一覧 </span>
        <section className="print_pages">
          <table className="print-table">
            <thead>
              <tr>
                <CellHeader> 店舗名 </CellHeader>
                <CellHeader> 媒体サイト名 </CellHeader>
                <CellHeader> 導入他社数 </CellHeader>
                <CellHeader> 課金額 </CellHeader>
              </tr>
            </thead>
            <tbody>
              {newTable}
            </tbody>
          </table>
        </section>
      </article>
    </div>
  );
};


PerStoreTable.propTypes = {
  area: PropTypes.string,
  data: PropTypes.array,
  componentRef: PropTypes.object
};

export default PerStoreTable;