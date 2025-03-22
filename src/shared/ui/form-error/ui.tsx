import { FC } from "react";
import { FieldError } from "react-hook-form";

type Props = {
  error?: FieldError;
};

export const FormError: FC<Props> = props => {
  if (!props.error) {
    return <></>;
  }

  return <p className="text-xs text-red-600">{props.error.message}</p>;
};
