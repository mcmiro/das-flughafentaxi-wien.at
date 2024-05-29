import { UI } from '@/components';
import { FieldValues } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import useTown from '@/hooks/use-town';
import useDistrict from '@/hooks/use-district';
import useStreet from '@/hooks/use-street';
import { StreetModel } from '@/types/street';
import { useTranslation } from 'react-i18next';

export interface AddressFormProps {
  form: FieldValues;
  section: string;
}

const AddressForm = ({ form, section }: AddressFormProps) => {
  const { t } = useTranslation();
  const { getTownsAndDistricts, towns, selectedTown, setSelectedTown } =
    useTown();

  const {
    handleDistricts,
    districts,
    selectedDistrict,
    setSelectedDistrict,
    filterDistricts,
  } = useDistrict();

  const {
    getStreets,
    streets,
    selectedStreet,
    setSelectedStreet,
    autoCompleteStreets,
  } = useStreet();

  const [streetInputFocus, setStreetInputFocus] = useState<boolean>(false);
  const addressListRef = useRef<HTMLDivElement>(null);

  const townField = `${section}.town`;
  const districtField = `${section}.postal_code`;
  const addressField = `${section}.address`;
  const numberField = `${section}.number`;

  const getTown = form.getValues(townField);
  const getDistrict = form.getValues(districtField);
  const getAddress = form.getValues(addressField);

  // handle get data from backend and set defaul values
  useEffect(() => {
    getTownsAndDistricts();
  }, []);

  useEffect(() => {
    if (selectedTown) {
      const districts = handleDistricts(selectedTown);
      setSelectedDistrict(districts[0]);
      form.setValue(townField, selectedTown);
    }
  }, [selectedTown]);

  useEffect(() => {
    if (selectedDistrict) {
      getStreets(selectedDistrict.postal_code);
      form.setValue(districtField, selectedDistrict.postal_code);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    setSelectedTown(getTown);
  }, [getTown]);

  useEffect(() => {
    if (selectedTown) {
      filterDistricts(selectedTown, getDistrict);
      form.setValue(addressField, '');
    }
  }, [getDistrict]);

  // handle get streets
  useEffect(() => {
    const street = getAddress;
    autoCompleteStreets(street);
  }, [getAddress]);

  // handle select street
  useEffect(() => {
    selectedStreet && form.setValue(addressField, selectedStreet.name);
  }, [selectedStreet]);

  const handleSelectAddress = (value: StreetModel) => {
    setSelectedStreet(value);
    setStreetInputFocus(false);
  };

  const handleFocusAddress = () => {
    setStreetInputFocus(true);
  };

  const handleBlurAddress = () => {
    if (addressListRef.current) {
      setTimeout(() => {
        setStreetInputFocus(false);
        form.trigger(addressField);
      }, 350);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 mt-4 md:h-12" key={section}>
      <div className="col-span-5 md:col-span-2">
        <UI.FormField
          control={form.control}
          name={townField}
          render={({ field }) => (
            <UI.FormItem className="flex flex-col">
              <UI.FormControl>
                <UI.Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <UI.FormControl>
                    <UI.SelectTrigger>
                      <UI.SelectValue
                        defaultValue={field.value}
                        placeholder={t('labelAndPlaceholder.town')}
                      />
                    </UI.SelectTrigger>
                  </UI.FormControl>
                  <UI.SelectContent>
                    {towns?.length &&
                      towns.map((town) => (
                        <UI.SelectItem key={town} value={town}>
                          {town}
                        </UI.SelectItem>
                      ))}
                  </UI.SelectContent>
                </UI.Select>
              </UI.FormControl>
              <UI.FormMessage />
            </UI.FormItem>
          )}
        />
      </div>
      <div className="col-span-7 md:col-span-3">
        <UI.FormField
          control={form.control}
          name={districtField}
          render={({ field }) => (
            <UI.FormItem className="flex flex-col">
              <UI.FormControl>
                <UI.Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <UI.FormControl>
                    <UI.SelectTrigger>
                      <UI.SelectValue
                        defaultValue={field.value}
                        placeholder={t('labelAndPlaceholder.district')}
                      />
                    </UI.SelectTrigger>
                  </UI.FormControl>
                  <UI.SelectContent>
                    {districts?.length &&
                      districts.map((el) => (
                        <UI.SelectItem key={el.district} value={el.postal_code}>
                          {el.postal_code} - {el.district}
                        </UI.SelectItem>
                      ))}
                  </UI.SelectContent>
                </UI.Select>
              </UI.FormControl>
              <UI.FormMessage />
            </UI.FormItem>
          )}
        />
      </div>
      <div className="col-span-9 md:col-span-5">
        <UI.FormField
          defaultValue={selectedStreet?.name}
          control={form.control}
          name={addressField}
          render={({ field }) => (
            <UI.FormItem className="flex flex-col relative">
              <UI.FormControl>
                <UI.Input
                  {...field}
                  placeholder={t('labelAndPlaceholder.address')}
                  onFocus={handleFocusAddress}
                  onBlur={handleBlurAddress}
                />
              </UI.FormControl>
              {streetInputFocus && streets?.length && streets?.length > 0 ? (
                <div ref={addressListRef} className="relative">
                  <UI.InputList
                    onSelect={handleSelectAddress}
                    items={streets}
                    selectedItem={selectedStreet}
                  />
                </div>
              ) : (
                <div className="!m-0"></div>
              )}
              <UI.FormMessage />
            </UI.FormItem>
          )}
        />
      </div>
      <div className="col-span-3 md:col-span-2">
        <UI.FormField
          control={form.control}
          name={numberField}
          render={({ field }) => (
            <UI.FormItem className="flex flex-col">
              <UI.FormControl>
                <UI.Input
                  {...field}
                  placeholder={t('labelAndPlaceholder.number')}
                />
              </UI.FormControl>
              <UI.FormMessage />
            </UI.FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AddressForm;
