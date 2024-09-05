import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS } from '../../../Shared/constants/index';
import AUCTION_WON_SECTION_CONTENT from './helpers/constant';
import {
  AuctionWonFormData,
  transAPIRequestDataToFormAuctionWon,
  transformAPIRequestDataAuctionWon,
} from './helpers/transform';

function AuctionWon() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});
  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.AUCTION_WON_CONTENT]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormAuctionWon(
        content.data[CONTENT_ENUMS.AUCTION_WON_CONTENT]
      );
      setInitialValues(initialFormValues);
      // Extract and set socialConnectContent values
    }
  }, [content]);
  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as AuctionWonFormData;

    const payload = {
      [CONTENT_ENUMS.AUCTION_WON_CONTENT]:
        transformAPIRequestDataAuctionWon(formData),
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
        formData={AUCTION_WON_SECTION_CONTENT}
        id="AuctionWon-form"
        onSubmit={onSubmit}
        className="row"
        defaultValues={initialValues}
        submitText="Update Auction Won Content"
      />
    </CustomCardWrapper>
  );
}

export default AuctionWon;
