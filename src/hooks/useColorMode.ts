import type { UseColorModeReturn } from "@/interfaces";
import type { ColorMode } from "@/types";
import { useTheme } from "next-themes";

export function useColorMode(): UseColorModeReturn {
	const { resolvedTheme, setTheme, forcedTheme } = useTheme();
	const colorMode = forcedTheme || resolvedTheme;
	const toggleColorMode = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	};
	return {
		colorMode: colorMode as ColorMode,
		setColorMode: setTheme,
		toggleColorMode,
	};
}
