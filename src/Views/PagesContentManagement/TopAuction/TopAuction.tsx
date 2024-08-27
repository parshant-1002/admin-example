import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS } from '../../../Shared/constants/index';
import CONTACT_US_FORM_SCHEMA from './helpers/constant';
import {
  TopAuctionFormData,
  transAPIRequestDataToFormTopAuction,
  transformAPIRequestDataTopAuction,
} from './helpers/transform';

function TopAuction() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});
  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.TOP_AUCTION_CONTENT]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormTopAuction(
        content.data[CONTENT_ENUMS.TOP_AUCTION_CONTENT]
      );
      setInitialValues(initialFormValues);
      // Extract and set socialConnectContent values
    }
  }, [content]);
  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as TopAuctionFormData;

    const payload = {
      [CONTENT_ENUMS.TOP_AUCTION_CONTENT]:
        transformAPIRequestDataTopAuction(formData),
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
        formData={CONTACT_US_FORM_SCHEMA}
        id="TopAuction-form"
        onSubmit={onSubmit}
        className="row"
        defaultValues={initialValues}
        submitText="Update TopAuction Content"
      />
    </CustomCardWrapper>
  );
}

export default TopAuction;
