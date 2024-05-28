import { useTranslation as translation } from 'react-i18next';

const useI18n = () => {
  const { i18n } = translation();

  //Get parameters
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const lang = urlParams.get('lang');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return { changeLanguage, lang };
};

export default useI18n;
