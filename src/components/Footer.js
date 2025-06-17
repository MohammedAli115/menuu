import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <div className='position-relative container'>
      <div style={{boxShadow: "0 0 3px #ccc"}}>
            <div className='row mb-2 text-center py-2 fs-6 text-warning rounded-3'>
                <p className='col-lg-3 col-md-4 col-sm-12'>{t('footer.name')}</p>
                <p className='col-lg-3 col-md-4 col-sm-12'>{t('footer.owner')}</p>
                <p className='col-lg-6 col-md-4 col-sm-12'>{t('footer.address')}</p>
                <p className='col-12 fs-6'>{t('footer.rights')}</p>
            </div>
      </div>
    </div>
  );
}

export default Footer;
