'use client';

import * as React from 'react';
import { UI } from '..';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export type DatePickerProps = {
  section: string;
  onSelect: (payload: { date: Date; section: string }) => void;
};

export function DatePicker({ section, onSelect }: DatePickerProps) {
  const { t } = useTranslation();
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [date, setDate] = useState<Date | undefined>();

  const handleSelect = (date: Date) => {
    setDate(date);
    onSelect({ date: date, section: section });
    setIsCalendarOpen(false);
  };

  return (
    <UI.Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <UI.PopoverTrigger asChild>
        <UI.Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, 'dd.MM.yyyy')
          ) : (
            <span>{t('labelAndPlaceholder.pickDate')}</span>
          )}
        </UI.Button>
      </UI.PopoverTrigger>
      <UI.PopoverContent className="w-auto p-0" align="start">
        <UI.Calendar
          mode="single"
          selected={date}
          onDayClick={handleSelect}
          initialFocus
          locale={de}
        />
      </UI.PopoverContent>
    </UI.Popover>
  );
}
