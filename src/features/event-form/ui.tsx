import { Field } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { defaultValues, schema } from "./model";
import { FC } from "react";
import { EVENT_TYPE_MNEMOCODE_LIST_KEY_VALUE } from "@/shared/config/constants";
import { jsonRpcApi } from "@/shared/jsonrpc";
import {
  Textarea,
  Button,
  FormError,
  Input,
  Label,
  Select,
  SelectLabel,
  SelectOption,
  getSelectSingleValue,
} from "@reindevu/shared-ui";
type Props = {
  latLng: [number, number];
};

export const EventForm: FC<Props> = ({ latLng }) => {
  const [eventCreateDefaultQuery] = jsonRpcApi.useLazyEventCreateDefaultQuery();

  const { control, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await eventCreateDefaultQuery({
        name: values.name,
        typeMnemocode: values.typeMnemocode,
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
        description: values.description,
        lngLat: [latLng[1], latLng[0]],
      });
    } catch (e) {}
  });

  return (
    <form className="h-full flex flex-col gap-2" onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="dateFrom"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Field>
              <Label>Дата начала</Label>

              <Input type="date" value={value} onChange={onChange} />

              <FormError error={error} />
            </Field>
          )}
        />

        <Controller
          control={control}
          name="dateTo"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Field>
              <Label>Дата окончания</Label>

              <Input type="date" value={value} onChange={onChange} />

              <FormError error={error} />
            </Field>
          )}
        />
      </div>

      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Field>
            <Label>Наименование</Label>

            <Input type="text" value={value} onChange={onChange} />

            <FormError error={error} />
          </Field>
        )}
      />

      <Controller
        control={control}
        name="typeMnemocode"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Field>
            <Label>Тип</Label>

            <Select
              value={getSelectSingleValue(
                value,
                EVENT_TYPE_MNEMOCODE_LIST_KEY_VALUE
              )}
              hideSearch={true}
              onChange={(value) => {
                if (value && !Array.isArray(value)) {
                  onChange(value.id);
                }
              }}
            >
              {EVENT_TYPE_MNEMOCODE_LIST_KEY_VALUE.map((key) => (
                <SelectOption id={key.id} value={key}>
                  <SelectLabel>{key.name}</SelectLabel>
                </SelectOption>
              ))}
            </Select>

            <FormError error={error} />
          </Field>
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Field>
            <Label>Описание</Label>

            <Textarea value={value} onChange={onChange} />

            <FormError error={error} />
          </Field>
        )}
      />

      <div className="flex-1" />

      <div className="flex justify-end gap-2">
        <Button variant="secondary">Отменить</Button>

        <Button type="submit">Сохранить</Button>
      </div>
    </form>
  );
};
