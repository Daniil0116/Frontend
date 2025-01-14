import React from "react";
import styles from './PDFmodule.module.css';

interface PDFModalProps {
    isModalOpen: boolean;
    pdfURL: string | null;
    handleDownloadPDF: () => void;
    handleClosePreview: () => void;
}

const PDFmodule: React.FC<PDFModalProps> = ({ isModalOpen, pdfURL, handleDownloadPDF, handleClosePreview }) => {
    if (!isModalOpen) return null;

    return (
        <div className={styles.module}>
            <div className={styles.moduleBorder}>
                {pdfURL && (
                    <>
                        <iframe
                            src={pdfURL}
                            title="PDF Preview"
                            className={styles.iframePreview}
                            style={{ width: '100%', height: '80vh' }}
                        ></iframe>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button className={`${styles.buttonBlock} ${styles.buttonDownload}`} onClick={handleDownloadPDF}>
                                Скачать файл
                            </button>
                            <button className={`${styles.buttonBlock} ${styles.buttonReturn}`} onClick={handleClosePreview}>
                                Назад
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PDFmodule;
