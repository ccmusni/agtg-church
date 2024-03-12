import { ChangeEvent } from "react";
import { Label, Select } from "flowbite-react";

type TSelectInputOptionProps = {
  label: string;
  value: string | number;
};

type TSelectInputProps = {
  id?: string;
  label?: string;
  value: string | number;
  options: TSelectInputOptionProps[];
  onChange: (value: string | number) => void;
};

export default function SelectInput({
  id = "select-input",
  label = "Select",
  options,
  value,
  onChange,
}: TSelectInputProps) {
  const handleChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    onChange(target?.value);
  };

  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor={id} value={label} />
      </div>
      <Select id={id} value={value} onChange={handleChange}>
        {!!options?.length &&
          options.map(({ label, value }, key) => (
            <option key={key} value={value}>
              {label}
            </option>
          ))}
      </Select>
    </div>
  );
}
