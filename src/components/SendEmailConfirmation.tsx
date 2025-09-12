import { useSendEmailConfirmationMutation } from "@/app/services/UserApi";
import { toaster } from "@/config/toaster";
import type { IError } from "@/interfaces/Error";
import { Button, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Iprops {
	email: string;
}

const SendEmailConfirmation = ({ email }: Iprops) => {
	const [sendEmailQuery, { isLoading }] = useSendEmailConfirmationMutation();
	const [coolDown, setCoolDown] = useState<number>(0);
	useEffect(() => {
		if (coolDown > 0) {
			const timer = setTimeout(() => setCoolDown((prev) => prev - 1), 1000);
			return () => clearTimeout(timer);
		}
	}, [coolDown]);
	const handleSendEmailConfirmation = async () => {
		try {
			await sendEmailQuery({ email }).unwrap();
			setCoolDown(30);
			toaster.success({
				title: "Check your inbox",
				description: `Confirmation email sent to ${email}`,
			});
		} catch (error) {
			const errorObj = error as IError;
			toaster.error({
				title: `${errorObj.data.error?.status || 500} - Error`,
				description: errorObj.data.error?.message || "Unknown error",
			});
		}
	};
	return (
		<Button
			onClick={handleSendEmailConfirmation}
			variant={"subtle"}
			colorPalette={"gray"}
			disabled={isLoading || coolDown > 0}
			_disabled={{ opacity: 0.6, cursor: "not-allowed" }}>
			{isLoading && <Spinner size='sm' mr={2} />}
			{isLoading
				? "Sending..."
				: coolDown > 0
				? `Resend in ${coolDown}s`
				: `Resend confirmation to ${email}`}
		</Button>
	);
};

export default SendEmailConfirmation;
