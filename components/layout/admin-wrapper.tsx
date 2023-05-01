import Navbar from '@/components/navigation/nav-bar';

function AdminWrapper(props: any) {
	return (
		<div className='p-4 md:p-10 mx-auto max-w-7xl bg-white dark:bg-[#2F2050] rounded-lg'>
			<Navbar user={'Jimmy'} />
			{props.children}
		</div>
	);
}

export default AdminWrapper;
