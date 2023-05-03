import Image from "next/image"

export default function Loading() {
  return (
    <div className='fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 w-auto h-auto bg-white rounded-full p-3'>
			<Image
				src={'/assets/tail-spin-dark.svg'}
				alt='loading indicator'
				height={20}
				width={20}
			/>
		</div>
  )
}