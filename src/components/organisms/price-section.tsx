import usePrice from '@/hooks/use-price';
import { CheckCircle } from 'lucide-react';
import { useAtom } from 'jotai';
import { orderFormAtom } from '@/hooks/use-order-form';
import { PlaneLanding, PlaneTakeoff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function PriceSection() {
  const { t } = useTranslation();
  const { getTotal, priceToAirport, priceFromAirport } = usePrice();
  const [orderForm] = useAtom(orderFormAtom);

  return (
    <div className="mt-4 top-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {priceToAirport > 0 && (
          <div className="flex flex-col justify-between text-gray-900 rounded-2xl bg-gray-50 py-3 px-5 transition-all duration-500 hover:bg-gray-100">
            <div>
              <h3 className="text-lg mb-2">
                {t('labelAndPlaceholder.toAirport')}
              </h3>
              <ul className="space-y-1 text-left text-sm text-gray-500">
                {orderForm?.extras?.stopoverValue > 0 && (
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4" />
                    <span>
                      {t('labelAndPlaceholder.stopover')} x{' '}
                      {orderForm.extras.stopoverValue}
                    </span>
                  </li>
                )}
              </ul>
            </div>
            <div className="flex justify-between mt-2">
              <PlaneTakeoff className="w-5 mt-1" />
              <span className="text-2xl font-semibold">
                {getTotal().priceToAirport}
              </span>
            </div>
          </div>
        )}
        {priceFromAirport > 0 && (
          <div className="flex flex-col justify-between text-gray-900 rounded-2xl bg-gray-50 py-3 px-5 transition-all duration-500 hover:bg-gray-100">
            <div>
              <h3 className="text-lg mb-2">
                {t('labelAndPlaceholder.fromAirport')}
              </h3>
              <ul className="space-y-1 text-left text-sm text-gray-500">
                {((orderForm?.product?.direction === 'to-airport' &&
                  orderForm.isReturnJourney) ||
                  orderForm?.product?.direction === 'from-airport') &&
                  orderForm?.extras?.meetAndGreet && (
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4" />
                      <span>Meet and Greet</span>
                    </li>
                  )}
                {orderForm?.extras?.stopoverValue > 0 && (
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4" />
                    <span>
                      {t('labelAndPlaceholder.stopover')} x{' '}
                      {orderForm.extras.stopoverValue}
                    </span>
                  </li>
                )}
              </ul>
            </div>
            <div className="flex justify-between mt-2">
              <PlaneLanding className="w-5 mt-1" />
              <span className="text-2xl font-semibold">
                {getTotal().priceFromAirport}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PriceSection;
