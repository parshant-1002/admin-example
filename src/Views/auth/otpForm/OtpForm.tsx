import { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';
import { useVerifyOtpMutation } from '../../../Services/Api/module/auth';
import CustomForm from '../../../Shared/components/form/CustomForm';
import { updateAuthTokenRedux } from '../../../Store/Common';
import QrCode from '../qrCode';
import OTP_FORM_SCHEMA from './helpers/otpSchema';

function OtpForm() {
  const [verifyOtp] = useVerifyOtpMutation();
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location || {};
  const onSuccess = (res: { token: string; message: string }) => {
    toast.success(res.message);
    dispatch(updateAuthTokenRedux({ token: res?.token }));
  };
  const onFailure = () => {};

  const onSubmit = async (
    data: Record<string, unknown>,
    event: SyntheticEvent,
    reset: () => void
  ) => {
    event.preventDefault();
    try {
      const payload = { ...data, email: state?.email };
      await verifyOtp({ payload, onSuccess, onFailure });
      reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };
  return (
    <div className="front-screen">
      <div className="front-form m-auto d-flex align-items-center justify-content-center">
        <div className="w-100 bg-white p-4 rounded border">
          <div className="text-center title_group row justify-content-center pb-3">
            <h2 className="h3">Confirmation</h2>
            {state?.qrCode ? <QrCode qrCode={state?.qrCode} /> : null}
            <p className="p col-10">
              Enter Confirmation code sent on your authenticator app.
            </p>
          </div>
          <CustomForm
            id="otp"
            formData={OTP_FORM_SCHEMA}
            onSubmit={onSubmit}
            submitText="Submit"
          />
        </div>
      </div>
    </div>
  );
}

export default OtpForm;
