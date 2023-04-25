import { useField, useFormikContext } from 'formik';
import React from 'react';
import CustomRadioGroup, { CustomRadioGroupOption } from './custom-radio-group';

type FormikRadioGroupProps<TValue> = {
	name: string;
	options: CustomRadioGroupOption<TValue>[];
	label: string;
};

const FormikRadioGroup = <TValue,>(props: FormikRadioGroupProps<TValue>) => {
	const [field] = useField<TValue>(props.name);
	const { setFieldValue } = useFormikContext();
	return (
		<CustomRadioGroup
			options={props.options}
			value={field.value}
			label={props.label}
			onChange={(val) => {
				setFieldValue(props.name, val);
			}}
		/>
	);
};
export default FormikRadioGroup;
