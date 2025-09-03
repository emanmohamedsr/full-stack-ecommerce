import { useColorMode } from "@/hooks/useColorMode";
import type { IFormInputs } from "@/interfaces/FormInputs";
import { Field, Image, Input, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import type { UseFormSetValue } from "react-hook-form";

interface FileInputProps {
	isLoading: boolean;
	setValue?: UseFormSetValue<IFormInputs>;
	setThumbnail?: (file: File) => void;
	error?: string;
}

const ThumbnailInputFile = ({
	isLoading,
	setThumbnail,
	setValue,
	error,
}: FileInputProps) => {
	const [preview, setPreview] = useState<string | null>(null);
	const { colorMode } = useColorMode();

	return (
		<Field.Root>
			<Field.Label
				htmlFor='thumbnail-upload'
				cursor={isLoading ? "not-allowed" : "pointer"}
				border='2px dashed'
				borderColor='gray.300'
				_hover={!isLoading ? { borderColor: "teal.500", bg: "gray.50" } : {}}
				borderRadius='lg'
				p={6}
				textAlign='center'
				color='gray.500'
				fontSize='sm'
				fontWeight='medium'
				transition='all 0.2s ease'>
				{isLoading ? (
					<Spinner size='sm' />
				) : preview ? (
					<Image
						src={preview}
						alt='Preview'
						maxH='120px'
						mx='auto'
						borderRadius='md'
						objectFit='cover'
					/>
				) : (
					"Click to upload or drag & drop"
				)}
			</Field.Label>

			<Input
				id='thumbnail-upload'
				type='file'
				accept='image/*'
				display='none'
				disabled={isLoading}
				onChange={(e) => {
					const file = e.target.files?.[0];
					if (file) {
						if (setThumbnail) {
							setThumbnail(file || undefined);
						}
						if (setValue) {
							setValue("thumbnail", file || undefined);
						}
						const reader = new FileReader();
						reader.onloadend = () => setPreview(reader.result as string);
						reader.readAsDataURL(file);
					}
				}}
			/>

			{error && (
				<Text
					mt={2}
					color={colorMode === "light" ? "red.600" : "red.300"}
					fontSize='sm'>
					{error}
				</Text>
			)}
		</Field.Root>
	);
};

export default ThumbnailInputFile;
