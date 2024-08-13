import { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useVerifyOtpMutation } from '../../../Services/Api/module/auth';
import CustomForm from '../../../Shared/components/form/CustomForm';
import {
  updateAuthTokenRedux,
  updateUserDataRedux,
} from '../../../Store/Common';
import QrCode from '../qrCode';
import OTP_FORM_SCHEMA from './helpers/otpSchema';
import OTP_CODE_TYPE from './helpers/constants';
import { ErrorResponse } from '../../../Models/Apis/Error';
import './OtpForm.scss';
import Button from '../../../Shared/components/form/Button';
import { Copy } from '../../../assets';
import ERROR_MESSAGES from '../../../Shared/constants/messages';

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
  const { state } = location || {};
  const onSuccess = (res: LoginResponse) => {
    toast.success(res.message);
    if (res?.account?.recoveryCodes) {
      setResponseData({
        recoveryCodes: res?.account?.recoveryCodes,
        showRecoveryCode: true,
        data: res,
      });
    } else {
      dispatch(updateAuthTokenRedux({ token: res?.token }));
      dispatch(updateUserDataRedux({ userData: res?.account }));
    }
  };
  const onFailure = (error: ErrorResponse) => {
    toast.error(error.data.message);
  };
  const handleCopy = () => {
    const button = document.getElementById('recovery_code_copy');
    if (button) {
      // const rect = button.getBoundingClientRect();
      // console.log(rect);

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
      };
      await verifyOtp({ payload, onSuccess, onFailure });
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
  const handleClickSubmitCopiedCode = () => {
    dispatch(updateAuthTokenRedux({ token: responseData?.data?.token }));
    dispatch(updateUserDataRedux({ userData: responseData?.data?.account }));
  };
  return (
    <div className="front-screen">
      <div className="front-form m-auto d-flex align-items-center justify-content-center">
        <div className="w-100 bg-white p-4 rounded border">
          {!responseData?.showRecoveryCode ? (
            <>
              <div className="text-center title_group row justify-content-center pb-3">
                <h2 className="h3">Confirmation</h2>
                {state?.qrCode ? <QrCode qrCode={state?.qrCode} /> : null}
                <p className="p col-10">
                  Enter Confirmation code sent on your authenticator app.
                </p>
              </div>
              <CustomForm
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
            </>
          ) : (
            <>
              <div style={{ position: 'relative', marginBottom: '10px' }}>
                <div className="copyText ">Please Copy Recovery Code</div>
                <CopyToClipboard
                  text={responseData?.recoveryCodes?.join('\n')}
                  onCopy={handleCopy}
                >
                  <button
                    type="button"
                    id="recovery_code_copy"
                    className="btn copyButton"
                  >
                    <img src={Copy} alt="copy" width={20} />
                  </button>
                </CopyToClipboard>
              </div>
              <div className="text-danger">
                Please do not Refresh the page before copying this code
              </div>
              <div className="recoveryCodesContainer">
                <ul className="recoveryCodesList">
                  {(responseData?.recoveryCodes || [])?.map((val: string) => (
                    <li key={val} className="recoveryCodeItem">
                      {val}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="d-flex w-100 justify-content-center">
                <Button
                  disabled={!recoveryCopied}
                  onClick={handleClickSubmitCopiedCode}
                >
                  I have Saved The Code
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default OtpForm;
