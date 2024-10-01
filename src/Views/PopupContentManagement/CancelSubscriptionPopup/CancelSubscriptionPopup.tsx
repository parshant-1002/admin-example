import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS } from '../../../Shared/constants/constants';
import CANCEL_SUBSCRIPTION_SECTION_CONTENT from './helpers/constant';
import { CancelSubscriptionPopupFormData } from './helpers/transform';

function CancelSubscriptionPopup() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});
  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.CANCEL_SUBSCRIPTION]) {
      // Set initial form values
      const initialFormValues = content.data[CONTENT_ENUMS.CANCEL_SUBSCRIPTION];
      setInitialValues(initialFormValues);
      // Extract and set socialConnectContent values
    }
  }, [content]);
  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as CancelSubscriptionPopupFormData;

    const payload = {
      [CONTENT_ENUMS.CANCEL_SUBSCRIPTION]: formData,
    };
    await updateContent({
      payload,
      onSuccess: (res: { message: string }) => {
        toast.success(res.message);
        refetch();
      },
    });
  };

  return (
    <CustomCardWrapper>
      <CustomForm
        formData={CANCEL_SUBSCRIPTION_SECTION_CONTENT}
        id="CancelSubscriptionPopup-form"
        onSubmit={onSubmit}
        className="row"
        defaultValues={initialValues}
        submitText="Update Place Order Popup Content"
      />
    </CustomCardWrapper>
  );
}

export default CancelSubscriptionPopup;
