import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CustomForm } from '../../../Shared/components';
import BID_PACK_CONTENT_FORM_SCHEMA from './helpers/bidPackSchema';

import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper';
import { CONTENT_ENUMS } from '../../../Shared/constants';

function BidPackSection() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});

  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.BID_PACK_CONTENT]) {
      setInitialValues(content?.data?.[CONTENT_ENUMS.BID_PACK_CONTENT]);
    }
  }, [content]);

  const onSubmit = async (data: unknown) => {
    const payload = {
      [CONTENT_ENUMS.BID_PACK_CONTENT]: data,
    };
    await updateContent({
      payload,
      onSuccess: (res: { message: string }) => {
        toast.success(res?.message);
        refetch();
      },
    });
  };

  return (
    <CustomCardWrapper>
      <CustomForm
        id="headers-content"
        formData={BID_PACK_CONTENT_FORM_SCHEMA}
        onSubmit={onSubmit}
        defaultValues={initialValues}
        submitText="Update Bids Pack Content"
      />
    </CustomCardWrapper>
  );
}

export default BidPackSection;
