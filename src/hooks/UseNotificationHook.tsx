import { toast, ToastOptions } from "react-toastify";
import CustomError from "@components/common/CustomError";

export type NotificationParams = {
  message: string;
  status?: number;
  code?: string;
  options?: ToastOptions;
};

export const useNotification = () => {
  const defaultOptions: any = {
    theme: "dark",
    hideProgressBar: true,
    position: "top-right",
  };
  const showSuccess = ({ message, options }: NotificationParams) => {
    toast.success(message, { ...defaultOptions, ...options });
  };

  const showError = ({
    message,
    status,
    code,
    options,
  }: NotificationParams) => {
    toast.error(<CustomError status={status} code={code} message={message} />, {
      ...defaultOptions,
      ...options,
    });
  };

  const showInfo = ({ message, options }: NotificationParams) => {
    toast.info(message, { ...defaultOptions, ...options });
  };

  const showWarning = ({ message, options }: NotificationParams) => {
    toast.warning(message, { ...defaultOptions, ...options });
  };

  return { showSuccess, showError, showInfo, showWarning };
};
