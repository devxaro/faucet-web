import { toast } from "react-toastify";
import CustomError from "@components/common/CustomError";

export const showErrorToast = (
  message: string,
  status?: number,
  code?: string,
) => {
  toast.error(<CustomError status={status} code={code} message={message} />);
};
