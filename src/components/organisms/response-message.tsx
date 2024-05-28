import { UI } from '..';
import { CheckCircle, CircleX } from 'lucide-react';
import { ResponseModel } from '@/types/response';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

export type ResponseMessageProps = {
  content: ResponseModel[];
  isModalOpen: boolean;
  closeModal: (e?: any) => void;
};

function ResponseMessage({
  content,
  isModalOpen,
  closeModal,
}: ResponseMessageProps) {
  const { t } = useTranslation();
  return (
    <div>
      <UI.Dialog open={isModalOpen} onOpenChange={closeModal}>
        <UI.DialogContent className="sm:w-9/12 max-w-[1200px]">
          <UI.DialogHeader className="space-y-12">
            {content.map((booking, index) => (
              <div key={index}>
                {booking.status ? (
                  <div>
                    <UI.DialogTitle className="flex flex-row gap-2 items-center pb-2">
                      <CheckCircle className="text-green-500" />{' '}
                      {t('messages.success.title')}{' '}
                      {format(booking.date, 'dd.MM.yyyy')} {' - '}{' '}
                      {booking.time}
                    </UI.DialogTitle>
                    <UI.DialogDescription>
                      {t('messages.success.copy')}
                    </UI.DialogDescription>
                  </div>
                ) : (
                  <div>
                    <UI.DialogTitle className="flex flex-row gap-2 items-center pb-2">
                      <CircleX className="text-red-500 " />{' '}
                      {t('messages.error.title')}{' '}
                      {format(booking.date, 'dd.MM.yyyy')} {' - '}{' '}
                      {booking.time}
                    </UI.DialogTitle>
                    <UI.DialogDescription>
                      {t('messages.error.copy')}
                    </UI.DialogDescription>
                  </div>
                )}
              </div>
            ))}
          </UI.DialogHeader>
        </UI.DialogContent>
      </UI.Dialog>
    </div>
  );
}

export default ResponseMessage;
