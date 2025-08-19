import Cookies, { type CookieSetOptions } from "universal-cookie";

type Key = string;
type JsonVal =
	| string
	| number
	| boolean
	| JsonVal[]
	| { [key: string]: JsonVal };

const cookies = new Cookies();

class CookieService {
	has(key: Key): boolean {
		return this.get(key) !== undefined;
	}
	get(key: Key): JsonVal | undefined {
		const value = cookies.get(key);
		return value !== undefined ? value : undefined;
	}
	set(key: Key, value: JsonVal, options?: CookieSetOptions) {
		return cookies.set(key, value, options);
	}
	remove(key: Key) {
		return cookies.remove(key);
	}
}

export default new CookieService();
