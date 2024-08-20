// import { Logo } from '../../../assets';
import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { ErrorResponse } from '../../../Models/Apis/Error';
import { useLoginMutation } from '../../../Services/Api/module/auth';
import CustomForm from '../../../Shared/components/form/CustomForm';
import { ROUTES } from '../../../Shared/constants';
import './style.scss';
import ERROR_MESSAGES from '../../../Shared/constants/messages';
import LOGIN_FORM_SCHEMA from './helpers/loginSchema';

interface LoginResponse {
  message: string;
  qrCodeURL: string;
}
function LoginPage() {
  const [loginRequest] = useLoginMutation();

  const navigate = useNavigate();
  const onSuccessLogin = (data: LoginResponse, emailData: string) => {
    toast.success(data?.message);
    navigate(ROUTES.OTP_FORM, {
      state: { qrCode: data?.qrCodeURL, email: emailData },
    });
  };
  const onErrorLogin = (error: ErrorResponse) => {
    toast.error(error.data.message || error.error);
  };
  const onSubmit = async (
    data: Record<string, unknown>,
    event: SyntheticEvent,
    reset: () => void
  ) => {
    event.preventDefault();
    try {
      const emailData = data?.email as unknown as string;
      await loginRequest({
        payload: data,
        onSuccess: (res: LoginResponse) => onSuccessLogin(res, emailData),
        onFailure: onErrorLogin,
      });
      reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(ERROR_MESSAGES().SOMETHING_WENT_WRONG);
      }
    }
  };

  return (
    <div className="front-screen">
      <div className="front-form m-auto d-flex align-items-center justify-content-center">
        <div className="w-100 bg-white p-4 rounded border">
          <div className="text-center title_group">
            <h2 className="h3">Login</h2>
          </div>
          <CustomForm
            id="login"
            formData={LOGIN_FORM_SCHEMA}
            onSubmit={onSubmit}
            submitText="Login"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
