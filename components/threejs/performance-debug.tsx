import React, { useState } from 'react';
import { Perf } from 'r3f-perf';
import { PerformanceMonitor } from '@react-three/drei';

type Props = {
	enabled: boolean;
};

function Performance({ enabled = false }: Props) {
	const [bad, set] = useState(false);

	return (
		<>
			{enabled && <Perf position='top-left' />}
			<PerformanceMonitor onDecline={() => set(true)} />
		</>
	);
}

export default Performance;
