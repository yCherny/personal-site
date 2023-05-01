import { TrashIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { Button, Text } from '@tremor/react';

import React, { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

// Firebase Image Upload
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { storage } from '../../config';

function ImageUpload() {
	const [loading, setLoading] = useState(false);
	const [urls, setUrls] = useState<{ filename: string; url: string }[]>([]);
	const [images, setImages] = React.useState([]);
	const maxNumber = 69;

	const onChange = (
		imageList: ImageListType,
		addUpdateIndex: number[] | undefined
	) => {
		console.log(imageList, addUpdateIndex);
		setImages(imageList as never[]);
	};

	function upload(imageList: ImageListType, removeAllImages: any) {
		setLoading(true);
		imageList.forEach((image) => {
			if (image.file) {
				const storageRef = ref(storage, `uploads/${image.file?.name}`);
				const uploadTask = uploadBytesResumable(storageRef, image.file);
				uploadTask.then((onFulfilled) => {
					getDownloadURL(uploadTask.snapshot.ref).then(
						(downloadURL) => {
							console.log(`Image Download URL: ${downloadURL}`);

							// Update Array
							const urlInfo = {
								filename: image.file!.name,
								url: downloadURL,
							};

							setUrls([...urls, urlInfo]);
						}
					);
				});
			}
		});

		removeAllImages();
		setLoading(false);
	}

	return (
		<div>
			<ImageUploading
				multiple
				value={images}
				onChange={onChange}
				maxNumber={maxNumber}
				dataURLKey='data_url'
			>
				{({
					imageList,
					onImageUpload,
					onImageRemoveAll,
					onImageUpdate,
					onImageRemove,
					isDragging,
					dragProps,
				}) => (
					// write your building UI
					<div className='upload__image-wrapper'>
						<div className='flex flex-col w-full gap-2'>
							<button
								type='button'
								style={
									isDragging ? { color: 'red' } : undefined
								}
								onClick={onImageUpload}
								className='border-2 border-gray-300 p-20 rounded-md'
								disabled={loading}
								{...dragProps}
							>
								Click or Drop here
							</button>

							{imageList.length > 0 && (
								<>
									<Button
										type='button'
										className='bg-pink-600'
										onClick={onImageRemoveAll}
										disabled={loading}
									>
										Remove All Images
									</Button>
									<Button
										type='button'
										onClick={() =>
											upload(imageList, onImageRemoveAll)
										}
										disabled={loading}
										loading={loading}
									>
										Upload Images
									</Button>
								</>
							)}
						</div>

						<div className='flex flex-row gap-4 overflow-x-scroll py-4'>
							{imageList.map((image, index) => (
								<div
									key={index}
									className='image-item flex flex-col gap-2 flex-shrink-0'
								>
									<img
										src={image['data_url']}
										alt=''
										className='rounded-md h-48'
									/>
									<div className='image-item__btn-wrapper flex flex-row gap-2'>
										<button
											type='button'
											onClick={() => onImageUpdate(index)}
											className='bg-blue-400 rounded-full p-2 text-white'
											disabled={loading}
										>
											<PhotoIcon height={20} width={20} />
										</button>
										<button
											type='button'
											onClick={() => onImageRemove(index)}
											className='bg-pink-600 rounded-full p-2 text-white'
											disabled={loading}
										>
											<TrashIcon height={20} width={20} />
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</ImageUploading>
			<div>
				<Text className='font-bold text-lg'>Download URLs</Text>
				{urls.map((info) => (
					<div
						key={info.filename}
						className='flex flex-row items-center gap-2'
					>
						<Text className='font-bold text-md line-clamp-1'>
							{info.filename}
						</Text>
						<Text className='overflow-hidden line-clamp-1'>
							{info.url}
						</Text>
					</div>
				))}
			</div>
		</div>
	);
}

export default ImageUpload;
