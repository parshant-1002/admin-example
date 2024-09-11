import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS } from '../../../Shared/constants/index';
import AUCTION_WON_DETAILS_SECTION_CONTENT from './helpers/constant';
import {
  AuctionWonDetailsFormData,
  transAPIRequestDataToFormAuctionWonDetails,
  transformAPIRequestDataAuctionWonDetails,
} from './helpers/transform';

function AuctionWonDetails() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});
  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.AUCTION_WON_DETAILS_CONTENT]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormAuctionWonDetails(
        content.data[CONTENT_ENUMS.AUCTION_WON_DETAILS_CONTENT]
      );
      setInitialValues(initialFormValues);
      // Extract and set socialConnectContent values
    }
  }, [content]);
  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as AuctionWonDetailsFormData;

    const payload = {
      [CONTENT_ENUMS.AUCTION_WON_DETAILS_CONTENT]:
        transformAPIRequestDataAuctionWonDetails(formData),
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
        formData={AUCTION_WON_DETAILS_SECTION_CONTENT}
        id="AuctionWonDetails-form"
        onSubmit={onSubmit}
        className="row"
        defaultValues={initialValues}
        submitText="Update Auction Won Details Content"
      />
    </CustomCardWrapper>
  );
}

export default AuctionWonDetails;
