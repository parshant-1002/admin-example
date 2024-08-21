// import { Logo } from '../../../assets';
import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../../Services/Api/module/auth';
import CustomForm from '../../../Shared/components/form/CustomForm';
import { ROUTES } from '../../../Shared/constants';
import ERROR_MESSAGES from '../../../Shared/constants/messages';
import { auction } from '../../../assets';
import LOGIN_FORM_SCHEMA from './helpers/loginSchema';
import './style.scss';

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
    <div className="d-flex flex-column align-items-center justify-content-center w-100 form_front min-vh-100">
      <div className="form_card text-start d-flex row ">
        <div className="col-md-8 login_secn">
          <div className="text-center title_group">
            <h2 className="h3 text-white">Login</h2>
          </div>
          <CustomForm
            id="login"
            formData={LOGIN_FORM_SCHEMA}
            onSubmit={onSubmit}
            submitText="Login"
          />
        </div>
        <div className="logo_login col-md-4 d-flex align-items-center justify-content-center">
          <img
            src={auction}
            alt="Drag Racing"
            width="150"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
