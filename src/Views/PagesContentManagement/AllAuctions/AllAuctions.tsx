import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS } from '../../../Shared/constants/index';
import MY_AUCTIONS_SECTION_CONTENT from './helpers/constant';
import {
  AllAuctionsFormData,
  transAPIRequestDataToFormAllAuctions,
  transformAPIRequestDataAllAuctions,
} from './helpers/transform';

function AllAuctions() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});
  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.ALL_AUCTIONS_DATA]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormAllAuctions(
        content.data[CONTENT_ENUMS.ALL_AUCTIONS_DATA]
      );
      setInitialValues(initialFormValues);
      // Extract and set socialConnectContent values
    }
  }, [content]);
  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as AllAuctionsFormData;

    const payload = {
      [CONTENT_ENUMS.ALL_AUCTIONS_DATA]:
        transformAPIRequestDataAllAuctions(formData),
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
        formData={MY_AUCTIONS_SECTION_CONTENT}
        id="AllAuctions-form"
        onSubmit={onSubmit}
        className="row"
        defaultValues={initialValues}
        submitText="Update All Auctions Content"
      />
    </CustomCardWrapper>
  );
}

export default AllAuctions;
