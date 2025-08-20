import { Flex } from '../Flex';
import Label from '../Label';
import RadioBox from '../RadioBox';

interface RadioGroupOption<T> {
  label?: string;
  value: T;
}

interface RadioGroupProps<T> {
  name: string;
  value: T;
  options: RadioGroupOption<T>[];
  onChange: (value: string) => void;
  direction?: 'row' | 'column';
}

export default function RadioGroup<T extends string>({
  name,
  value,
  options,
  onChange,
  direction = 'column',
}: RadioGroupProps<T>) {
  return (
    <Flex direction={direction} gap="0.625rem">
      {options.map((opt) => (
        <Label key={opt.value}>
          <RadioBox
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
          {opt.label}
        </Label>
      ))}
    </Flex>
  );
}
