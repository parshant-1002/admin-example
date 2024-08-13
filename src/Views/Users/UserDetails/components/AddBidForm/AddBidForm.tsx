// libs
import { SyntheticEvent } from 'react';

// components
import { toast } from 'react-toastify';
import CustomForm from '../../../../../Shared/components/form/CustomForm';

// consts
import { ErrorResponse } from '../../../../../Models/Apis/Error';
import { useAddUserBidsMutation } from '../../../../../Services/Api/module/users';
import { BUTTON_LABELS } from '../../../../../Shared/constants';
import ERROR_MESSAGES from '../../../../../Shared/constants/messages';
import { ADD_BIDS_FORM_SCHEMA } from '../../helpers/constants';

interface AddBidFormTypes {
  initialData: object | null;
  onAdd?: () => void;
}
// component
export default function AddBidForm({
  initialData = {},
  onAdd = () => {},
}: AddBidFormTypes) {
  // hooks
  const [addBidForUser] = useAddUserBidsMutation();
  const onSuccess = (res: { message: string }) => {
    toast.success(res?.message);
    onAdd();
  };

  const onFailure = (error: ErrorResponse) => {
    toast.error(error?.data?.message);
  };

  const onSubmit = async (
    data: Record<string, unknown>,
    event: SyntheticEvent
  ) => {
    event.preventDefault();
    try {
      const productData = data;
      const payload = {
        userId: productData?.userId,
        bids: productData?.bids,
      };
      await addBidForUser({
        payload,
        onSuccess,
        onFailure,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(ERROR_MESSAGES().SOMETHING_WENT_WRONG);
      }
    }
  };
  return (
    <CustomForm
      id="products"
      className="row"
      formData={ADD_BIDS_FORM_SCHEMA}
      onSubmit={onSubmit}
      defaultValues={
        initialData as unknown as Record<string, unknown> | undefined
      }
      submitText={BUTTON_LABELS.ADD}
    />
  );
}
