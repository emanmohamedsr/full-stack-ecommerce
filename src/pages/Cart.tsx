import EmptyProductsState from "@/components/EmptyProductsState";
import { AiOutlineShoppingCart } from "react-icons/ai";
const CartPage = () => {
	return (
		<EmptyProductsState
			title='Your Cart is Empty'
			description='Add items to your cart to see them here.'>
			<AiOutlineShoppingCart />
		</EmptyProductsState>
	);
};

export default CartPage;
