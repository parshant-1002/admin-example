import { SyntheticEvent, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useVerifyOtpMutation } from '../../../Services/Api/module/auth';
import Button from '../../../Shared/components/form/Button';
import CustomForm from '../../../Shared/components/form/CustomForm';
import { ROUTES } from '../../../Shared/constants/constants';
import ERROR_MESSAGES from '../../../Shared/constants/messages';
import {
  updateAuthTokenRedux,
  updateUserDataRedux,
} from '../../../Store/Common';
import { Copy, auction } from '../../../assets';
import './OtpForm.scss';
import OTP_CODE_TYPE from './helpers/constants';
import OTP_FORM_SCHEMA from './helpers/otpSchema';
import QrCode from '../qrCode/QrCode';
import { RootState } from '../../../Store';
import { removeEmptyValues } from '../../../Shared/utils/functions';

interface LoginResponse {
  token: string;
  message: string;
  account: {
    _id: string;
    email: string;
    userName: string;
    isTwoFactorAuthVerified: boolean;
    recoveryCodes: string[];
  };
}

interface LoginResponseData {
  recoveryCodes: string[];
  showRecoveryCode: boolean;
  data: LoginResponse | null;
}
function OtpForm() {
  const [verifyOtp] = useVerifyOtpMutation();
  const registrationToken = useSelector(
    (state: RootState) => state?.common?.deviceToken
  );
  const navigate = useNavigate();
  const [recoveryCopied, setRecoveryCopied] = useState(false);

  const [authenticationType, setAuthenticationType] = useState(
    OTP_CODE_TYPE.OTP
  );
  const [responseData, setResponseData] = useState<LoginResponseData>({
    recoveryCodes: [''],
    showRecoveryCode: false,
    data: null,
  });
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location ?? {};

  const handleClickSubmitCopiedCode = (data: LoginResponse | null) => {
    dispatch(updateAuthTokenRedux({ token: data?.token }));
    dispatch(updateUserDataRedux({ userData: data?.account }));
    navigate(ROUTES.HOMEPAGE);
  };

  const onSuccess = (res: LoginResponse) => {
    toast.success(res.message);
    if (res?.account?.recoveryCodes) {
      setResponseData({
        recoveryCodes: res?.account?.recoveryCodes,
        showRecoveryCode: true,
        data: res,
      });
    } else {
      handleClickSubmitCopiedCode(res);
    }
  };

  const handleCopy = () => {
    const button = document.getElementById('recovery_code_copy');
    if (button) {
      toast.success('Copied!');
      setRecoveryCopied(true);
    }
  };

  const onSubmit = async (
    data: Record<string, unknown>,
    event: SyntheticEvent,
    reset: () => void
  ) => {
    event.preventDefault();
    try {
      const payload = {
        ...data,
        email: state?.email,
        otpType: authenticationType,
        registrationToken,
      };
      await verifyOtp({
        payload: removeEmptyValues(payload),
        onSuccess,
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
  const onSecondaryClick = () => {
    if (authenticationType === OTP_CODE_TYPE.OTP) {
      setAuthenticationType(OTP_CODE_TYPE.RECOVERY_CODE);
    } else {
      setAuthenticationType(OTP_CODE_TYPE.OTP);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100 form_front min-vh-100">
      <div className="logo_login">
        <img
          src={auction}
          alt="Drag Racing"
          width="150"
          className="img-fluid"
        />
      </div>
      <div className="form_card text-start d-flex row ">
        <div className="login_secn">
          {!responseData?.showRecoveryCode ? (
            <>
              <div className="text-center title_group row justify-content-center pb-3">
                <span className="text-white fw-medium cnfTitle">
                  Confirmation
                </span>
                {state?.qrCode ? <QrCode qrCode={state?.qrCode} /> : null}
              </div>
              <div className="form-content">
                <p className="p text-center w-100 form-disc">
                  Enter Confirmation code sent on your authenticator app.
                </p>
                <CustomForm
                  className="otpSec"
                  id="otp"
                  formData={OTP_FORM_SCHEMA(authenticationType)}
                  onSubmit={onSubmit}
                  submitText="Submit"
                  secondaryBtnClassName="btn-md text-captialize w-100 border"
                  secondaryBtnText={
                    authenticationType === OTP_CODE_TYPE.OTP
                      ? 'Use Recovery Code'
                      : 'Use Authenticator Code'
                  }
                  isShowSecondaryBtn
                  handleSecondaryButtonClick={onSecondaryClick}
                />{' '}
              </div>
            </>
          ) : (
            <div className="recoveryCode-content">
              <div style={{ position: 'relative' }}>
                <div className="text-center title_group row justify-content-center pb-3">
                  <span className="text-white fw-medium">
                    Please Copy Recovery Code
                  </span>
                </div>
              </div>
              <div className="recoveryCodesContainer">
                <ul className="recoveryCodesList">
                  {(responseData?.recoveryCodes ?? [])?.map((val: string) => (
                    <li
                      key={val}
                      className="recoveryCodeItem d-flex justify-content-center align-items-center"
                    >
                      {val}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-danger note text-center">
                Please do not Refresh the page before copying this code
              </div>
              <div className="form-content">
                <div className="d-flex w-100 justify-content-center btn_groups">
                  <CopyToClipboard
                    text={responseData?.recoveryCodes?.join('\n')}
                    onCopy={handleCopy}
                  >
                    <button
                      type="button"
                      id="recovery_code_copy"
                      className="btn copyButton ms-0 mb-2"
                    >
                      <span>Copy recovery code</span>
                      <img src={Copy} alt="copy" width={20} />
                    </button>
                  </CopyToClipboard>
                  <Button
                    className="w-100"
                    disabled={!recoveryCopied}
                    onClick={() =>
                      handleClickSubmitCopiedCode(responseData?.data)
                    }
                  >
                    I have saved the code
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OtpForm;
