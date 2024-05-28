//Atoms
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandInput,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from './ui/command';
import { Card, CardContent, CardTitle } from './ui/card';
import { DatePicker } from './ui/date-picker';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from './ui/switch';
import { TimePicker } from './ui/time-picker';
import { Textarea } from './ui/textarea';

//Molecules
import AddressForm from './molecules/address-fields';
import CheckConditionsField from './molecules/check-conditions-fields';
import DifferentAddressSwitch from './molecules/different-address-switch';
import InputList from './molecules/input-list';
import MeetAndgGreetForm from './molecules/meet-and-greet-fields';
import ReturnJourneySwitch from './molecules/return-journey-switch';
import { VehicleCard } from './molecules/vehicle-card';

//Organisms
import CustomerFormSection from './organisms/customer-form-section';
import DateTimeFormSection from './organisms/date-time-form-section';
import DirectionFormSection from './organisms/direction-form-section';
import ExtrasFormSection from './organisms/extras-form-section';
import FlightInformationSection from './organisms/flight-information-form-section';
import PriceSection from './organisms/price-section';
import ReturnJourneySection from './organisms/return-journey-section';
import ResponseMessage from './organisms/response-message';
import VehicleFormSection from './organisms/vehicle-form-section';

export const UI = {
  //Atoms
  Button,
  Calendar,
  Checkbox,
  Card,
  CardContent,
  CardTitle,
  Command,
  CommandItem,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DatePicker,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  TimePicker,
  Textarea,

  // Molecules
  AddressForm,
  CheckConditionsField,
  DifferentAddressSwitch,
  InputList,
  MeetAndgGreetForm,
  ReturnJourneySwitch,
  VehicleCard,

  // Organisms
  CustomerFormSection,
  DateTimeFormSection,
  DirectionFormSection,
  ExtrasFormSection,
  FlightInformationSection,
  PriceSection,
  ReturnJourneySection,
  ResponseMessage,
  VehicleFormSection,
};
