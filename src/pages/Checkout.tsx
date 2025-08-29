// "use client";

import { useEffect, useState } from "react";
import { CiBookmarkCheck } from "react-icons/ci";
import { Box, Heading, HStack, Progress, Text } from "@chakra-ui/react";
import type { ICheckoutData } from "@/interfaces/FormInputs";
import LocationForm from "@/components/LocationForm";
import PaymentForm from "@/components/PaymentForm";
import { useDispatch } from "react-redux";
import { clearCart } from "@/app/features/cartSlice";

const CheckoutPage = () => {
	const [, setData] = useState<ICheckoutData>({});
	const [step, setStep] = useState(1);
	const [progress, setProgress] = useState(50);
	const [completed, setCompleted] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		if (completed) {
			dispatch(clearCart());
		}
	}, [dispatch, completed]);
	return (
		<HStack
			minH='calc(100vh - 64px)'
			justifyContent='center'
			alignItems='center'
			p={4}>
			{completed ? (
				<Box textAlign='center' py={10} px={6}>
					<CiBookmarkCheck size={"50px"} color='teal.700' />
					<Heading as='h2' size='xl' mt={6} mb={2}>
						Thank you for your order!
					</Heading>
					<Text color={"gray.500"}>
						Your order has been successfully placed and will be processed
						shortly.
					</Text>
				</Box>
			) : (
				<Box
					borderWidth='1px'
					rounded='lg'
					shadow='sm'
					maxWidth={800}
					p={6}
					m='10px auto'>
					<Progress.Root
						value={progress}
						max={100}
						mb={6}
						striped
						animated
						colorPalette={"teal"}
						colorScheme='teal'>
						<Progress.Track>
							<Progress.Range />
						</Progress.Track>
					</Progress.Root>

					{step === 1 ? (
						<LocationForm
							setStep={setStep}
							setProgress={setProgress}
							setData={setData}
						/>
					) : (
						<PaymentForm setCompleted={setCompleted} setData={setData} />
					)}
				</Box>
			)}
		</HStack>
	);
};

export default CheckoutPage;
