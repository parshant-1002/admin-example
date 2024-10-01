import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS } from '../../../Shared/constants/constants';
import LOGOUT_POPUP_SECTION_CONTENT from './helpers/constant';
import { LogoutPopupFormData } from './helpers/transform';

function LogoutPopup() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});
  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.LOGOUT_POPUP]) {
      // Set initial form values
      const initialFormValues = content.data[CONTENT_ENUMS.LOGOUT_POPUP];
      setInitialValues(initialFormValues);
      // Extract and set socialConnectContent values
    }
  }, [content]);
  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as LogoutPopupFormData;

    const payload = {
      [CONTENT_ENUMS.LOGOUT_POPUP]: formData,
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
        formData={LOGOUT_POPUP_SECTION_CONTENT}
        id="LogoutPopup-form"
        onSubmit={onSubmit}
        className="row"
        defaultValues={initialValues}
        submitText="Update Place Order Popup Content"
      />
    </CustomCardWrapper>
  );
}

export default LogoutPopup;
