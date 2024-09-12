import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS } from '../../../Shared/constants/constants';
import REFERRAL_POPUP_SECTION_CONTENT from './helpers/constant';
import {
  ReferralPopupFormData,
  transAPIRequestDataToFormReferralPopup,
  transformAPIRequestDataReferralPopup,
} from './helpers/transform';

function ReferralPopup() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});
  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.REFERRAL_POPUP]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormReferralPopup(
        content.data[CONTENT_ENUMS.REFERRAL_POPUP]
      );
      setInitialValues(initialFormValues);
      // Extract and set socialConnectContent values
    }
  }, [content]);
  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as ReferralPopupFormData;

    const payload = {
      [CONTENT_ENUMS.REFERRAL_POPUP]:
        transformAPIRequestDataReferralPopup(formData),
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
        formData={REFERRAL_POPUP_SECTION_CONTENT}
        id="ReferralPopup-form"
        onSubmit={onSubmit}
        className="row"
        defaultValues={initialValues}
        submitText="Update Place Order Popup Content"
      />
    </CustomCardWrapper>
  );
}

export default ReferralPopup;
