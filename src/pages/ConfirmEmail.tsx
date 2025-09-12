import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useConfirmEmailQuery } from "@/app/services/UserApi";
import LoadingOverlay from "@/components/loading";
import { toaster } from "@/config/toaster";
import type { IError } from "@/interfaces/Error";

const ConfirmEmailPage = () => {
	const navigate = useNavigate();
	const { confirmationCode } = useParams<{ confirmationCode: string }>();

	const { isLoading, isError, error, isSuccess } = useConfirmEmailQuery(
		{ token: confirmationCode || "" },
		{ skip: !confirmationCode },
	);

	useEffect(() => {
		if (isSuccess) {
			toaster.success({
				title: "Success",
				description: "Your email has been confirmed successfully.",
			});
			navigate("/login");
		}
		if (isError && error) {
			const errorObj = error as IError;
			toaster.error({
				title: `${errorObj.data.error?.status || 500} Error`,
				description:
					errorObj.data.error?.message ||
					"Failed to confirm email. Please try again.",
			});
			navigate("/signup");
		}
	}, [isSuccess, isError, error, navigate]);

	if (isLoading) {
		return (
			<LoadingOverlay
				isOpen={isLoading}
				description='Please wait while we confirm your email address.'
			/>
		);
	}

	return null;
};

export default ConfirmEmailPage;
