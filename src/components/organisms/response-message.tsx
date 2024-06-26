import { CheckCircle, CircleX } from 'lucide-react';
import { ResponseModel } from '@/types/response';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

export type ResponseMessageProps = {
  content: ResponseModel[];
  isModalOpen?: boolean;
  closeModal: (e?: any) => void;
};

function ResponseMessage({ content, closeModal }: ResponseMessageProps) {
  const { t } = useTranslation();
  return (
    <div className="pb-24">
      <div
        onClick={closeModal}
        className="sm:w-9/12 max-w-[1200px] space-y-12 mx-auto shadow-lg rounded-lg p-6"
      >
        {content.map((booking, index) => (
          <div key={index}>
            {booking.status ? (
              <div>
                <div className="flex flex-row gap-2 items-center pb-2">
                  <CheckCircle className="text-green-500" />{' '}
                  <span className="font-bold">
                    {t('messages.success.title')}
                    {': '}
                    {format(booking.date, 'dd.MM.yyyy')} {' - '} {booking.time}
                  </span>
                </div>
                <div>{t('messages.success.copy')}</div>
              </div>
            ) : (
              <div>
                <div className="flex flex-row gap-2 items-center pb-2">
                  <CircleX className="text-red-500 " />{' '}
                  {t('messages.error.title')}{' '}
                  {format(booking.date, 'dd.MM.yyyy')} {' - '} {booking.time}
                </div>
                <div>{t('messages.error.copy')}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResponseMessage;
