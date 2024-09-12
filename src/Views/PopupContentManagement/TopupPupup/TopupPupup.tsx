import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS } from '../../../Shared/constants/constants';
import TOPUP_POPUP_SECTION_CONTENT from './helpers/constant';
import {
  TopupPupupFormData,
  transAPIRequestDataToFormTopupPupup,
  transformAPIRequestDataTopupPupup,
} from './helpers/transform';

function TopupPupup() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});
  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.TOPUP_POPUP]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormTopupPupup(
        content.data[CONTENT_ENUMS.TOPUP_POPUP]
      );
      setInitialValues(initialFormValues);
      // Extract and set socialConnectContent values
    }
  }, [content]);
  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as TopupPupupFormData;

    const payload = {
      [CONTENT_ENUMS.TOPUP_POPUP]: transformAPIRequestDataTopupPupup(formData),
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
        formData={TOPUP_POPUP_SECTION_CONTENT}
        id="TopupPupup-form"
        onSubmit={onSubmit}
        className="row"
        defaultValues={initialValues}
        submitText="Update Place Order Popup Content"
      />
    </CustomCardWrapper>
  );
}

export default TopupPupup;
