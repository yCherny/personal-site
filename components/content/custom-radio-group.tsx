import { RadioGroup } from '@headlessui/react';

export type CustomRadioGroupOption<TValue> = {
	label: string;
	value: TValue;
};
export type CustomRadioGroupProps<TValue> = {
	value: TValue;
	onChange(newVal: TValue): void;
	options: CustomRadioGroupOption<TValue>[];
	label: string;
};

const CustomRadioGroup = <TValue,>(props: CustomRadioGroupProps<TValue>) => {
	return (
		<RadioGroup name='type' value={props.value} onChange={props.onChange}>
			<RadioGroup.Label className='sr-only'>
				{props.label}
			</RadioGroup.Label>
			<div className='flex flex-row gap-4'>
				{props.options.map((option) => (
					<RadioGroup.Option
						key={option.label}
						value={option.value}
						className={({ active, checked }) =>
							`${
								checked
									? 'bg-black dark:bg-gray-600'
									: 'bg-white dark:bg-gray-800'
							}
                    relative flex w-1/2 cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
						}
					>
						{({ active, checked }) => (
							<>
								<div className='flex w-full items-center justify-between'>
									<div className='flex items-center'>
										<div className='text-sm'>
											<RadioGroup.Label
												as='p'
												className={`font-medium  ${
													checked
														? 'text-white'
														: 'text-gray-900 dark:text-gray-400'
												}`}
											>
												{option.label}
											</RadioGroup.Label>
										</div>
									</div>
									{checked && (
										<div className='shrink-0 text-white'>
											<CheckIcon className='h-6 w-6' />
										</div>
									)}
								</div>
							</>
						)}
					</RadioGroup.Option>
				))}
			</div>
		</RadioGroup>
	);
};

function CheckIcon(props) {
	return (
		<svg viewBox='0 0 24 24' fill='none' {...props}>
			<circle cx={12} cy={12} r={12} fill='#fff' opacity='0.2' />
			<path
				d='M7 13l3 3 7-7'
				stroke='#fff'
				strokeWidth={1.5}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

export default CustomRadioGroup;
