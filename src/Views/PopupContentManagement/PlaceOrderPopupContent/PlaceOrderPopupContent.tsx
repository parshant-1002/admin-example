import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS } from '../../../Shared/constants/constants';
import PLACE_ORDER_POPUP_SECTION_CONTENT from './helpers/constant';
import {
  PlaceOrderPopupContentFormData,
  transAPIRequestDataToFormPlaceOrderPopupContent,
  transformAPIRequestDataPlaceOrderPopupContent,
} from './helpers/transform';

function PlaceOrderPopupContent() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});
  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.PLACE_ORDER_POPUP]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormPlaceOrderPopupContent(
        content.data[CONTENT_ENUMS.PLACE_ORDER_POPUP]
      );
      setInitialValues(initialFormValues);
      // Extract and set socialConnectContent values
    }
  }, [content]);
  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as PlaceOrderPopupContentFormData;

    const payload = {
      [CONTENT_ENUMS.PLACE_ORDER_POPUP]:
        transformAPIRequestDataPlaceOrderPopupContent(formData),
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
        formData={PLACE_ORDER_POPUP_SECTION_CONTENT}
        id="PlaceOrderPopupContent-form"
        onSubmit={onSubmit}
        className="row"
        defaultValues={initialValues}
        submitText="Update Place Order Popup Content"
      />
    </CustomCardWrapper>
  );
}

export default PlaceOrderPopupContent;
