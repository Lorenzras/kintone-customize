import {Document, Page, pdfjs} from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import {Typography} from '@mui/material';
import './PDFViewer.css';


const PleaseWait = () => {
  return <div>PLEASE WAIT</div>;
};

const PDFViewerAndroid = ({
  url,
  numberOfPages,
  pdfWrapperWidth,
  onDocumentLoadSuccess
} : PDFViewerAndroid) => {
  return (
    <Document
      file={url}
      onLoadSuccess={onDocumentLoadSuccess}

    >
      {[...Array(numberOfPages)].map((_, i) => {
        return (
          <div key={i}>
            <Page
              loading={<PleaseWait />}
              scale={1}
              width={pdfWrapperWidth}
              pageNumber={i + 1}
              renderTextLayer={false}

            />
            <Typography textAlign="center">ページ {numberOfPages} の {i + 1}</Typography>
          </div>
        );
      }
      )}
    </Document>);
};

export default PDFViewerAndroid;