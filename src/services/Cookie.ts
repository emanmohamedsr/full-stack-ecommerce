import Cookies, { type CookieSetOptions } from "universal-cookie";

type Key = string;

const cookies = new Cookies();

class CookieService {
	has(key: Key): boolean {
		return this.get(key) !== null;
	}
	get(key: Key): Key | null {
		return cookies.get(key);
	}
	set(key: Key, value: Key, options?: CookieSetOptions) {
		return cookies.set(key, value, options);
	}
	remove(key: Key) {
		return cookies.remove(key);
	}
}

export default new CookieService();
