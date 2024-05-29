import { UI } from '..';
import { FieldValues } from 'react-hook-form';
import { useAtom } from 'jotai';
import { orderAdditionalsAtom } from '@/hooks/use-town';
import { useTranslation } from 'react-i18next';

export interface MeetAndgGreetFormProps {
  form: FieldValues;
}

function MeetAndgGreetForm({ form }: MeetAndgGreetFormProps) {
  const { t } = useTranslation();
  const [additionalsAndTowns] = useAtom<any>(orderAdditionalsAtom);

  return (
    <div className="mt-8">
      <UI.FormField
        control={form.control}
        name="extras.meetAndGreet"
        render={({ field }) => (
          <UI.FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <UI.FormLabel className="cursor-pointer font-semibold">
                Meet and Greet
              </UI.FormLabel>
              <UI.FormDescription>
                {t('labelAndPlaceholder.meetAndGreet')} €
                {additionalsAndTowns.additionals?.meet_and_greet},-
              </UI.FormDescription>
            </div>
            <UI.FormControl>
              <UI.Switch
                className="!mt-0"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </UI.FormControl>
          </UI.FormItem>
        )}
      />
    </div>
  );
}

export default MeetAndgGreetForm;
