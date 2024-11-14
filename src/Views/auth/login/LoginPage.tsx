import { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../../Services/Api/module/auth';
import CustomForm from '../../../Shared/components/form/CustomForm';
import { ROUTES } from '../../../Shared/constants/constants';
import ERROR_MESSAGES from '../../../Shared/constants/messages';
import { updateAuthTokenRedux } from '../../../Store/Common';
import { auction } from '../../../assets';
import LOGIN_FORM_SCHEMA from './helpers/loginSchema';
import './style.scss';

interface LoginResponse {
  message: string;
  token: string;
}
function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginRequest] = useLoginMutation();

  const onSuccessLogin = (data: LoginResponse) => {
    toast.success(data?.message);
    dispatch(updateAuthTokenRedux({ token: data?.token }));
    navigate(ROUTES.HOMEPAGE);
  };
  const onSubmit = async (
    data: Record<string, unknown>,
    event: SyntheticEvent,
    reset: () => void
  ) => {
    event.preventDefault();

    try {
      await loginRequest({
        payload: { ...data, isAdmin: true },
        onSuccess: (res: LoginResponse) => onSuccessLogin(res),
      });
      // dispatch(updateAuthTokenRedux({ token: true }));

      // navigate(ROUTES.HOMEPAGE);
      reset();
    } catch (error: unknown) {
      toast.error(ERROR_MESSAGES().SOMETHING_WENT_WRONG);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100 form_front min-vh-100">
      <div className="logo_login d-flex align-items-center justify-content-center">
        <img
          src={auction}
          alt="Drag Racing"
          width="150"
          className="img-fluid"
        />
      </div>
      <div className="form_card text-start">
        <div className="col-md-12 login_secn">
          <div className="text-center title_group">
            <span className="text-white fw-medium">Login</span>
          </div>
          <div className="form-content">
            <p className="p text-center w-100 form-disc">
              Enter email address for log in
            </p>
            <CustomForm
              id="login"
              formData={LOGIN_FORM_SCHEMA}
              onSubmit={onSubmit}
              submitText="Login"
              className="main-form"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
