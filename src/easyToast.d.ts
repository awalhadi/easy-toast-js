// easyToast.d.ts

declare function toast(
  message: string,
  type?: "success" | "error" | "warning" | "info",
  duration?: number,
): void;

declare namespace toast {
  function success(message: string, duration?: number): void;
  function error(message: string, duration?: number): void;
  function warning(message: string, duration?: number): void;
  function info(message: string, duration?: number): void;
}

export default toast;
