import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS } from '../../../Shared/constants/index';
import REFRESH_POPUP_SECTION_CONTENT from './helpers/constant';
import {
  RefreshPopupFormData,
  transAPIRequestDataToFormRefreshPopup,
  transformAPIRequestDataRefreshPopup,
} from './helpers/transform';

function RefreshPopup() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});
  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.REFRESH_POPUP]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormRefreshPopup(
        content.data[CONTENT_ENUMS.REFRESH_POPUP]
      );
      setInitialValues(initialFormValues);
      // Extract and set socialConnectContent values
    }
  }, [content]);
  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as RefreshPopupFormData;

    const payload = {
      [CONTENT_ENUMS.REFRESH_POPUP]:
        transformAPIRequestDataRefreshPopup(formData),
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
        formData={REFRESH_POPUP_SECTION_CONTENT}
        id="RefreshPopup-form"
        onSubmit={onSubmit}
        className="row"
        defaultValues={initialValues}
        submitText="Update Refresh Popup Content"
      />
    </CustomCardWrapper>
  );
}

export default RefreshPopup;
