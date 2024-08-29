import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS, STRINGS } from '../../../Shared/constants/index';
import AUCTION_PAGE_FORM_SCHEMA from './helpers/constants';
import {
  AuctionPageFormData,
  transAPIRequestDataToFormAuctionPage,
  transformAPIRequestDataAuctionPage,
} from './helpers/transform';

function AuctionPage() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});

  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.AUCTION_PAGE]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormAuctionPage(
        content.data[CONTENT_ENUMS.AUCTION_PAGE]
      );
      setInitialValues(initialFormValues);
    }
  }, [content]);

  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as AuctionPageFormData;
    const payload = {
      [CONTENT_ENUMS.AUCTION_PAGE]:
        transformAPIRequestDataAuctionPage(formData),
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
        formData={AUCTION_PAGE_FORM_SCHEMA}
        className="row"
        id="auctionPage-form"
        onSubmit={onSubmit}
        defaultValues={initialValues}
        submitText={STRINGS.UPDATE_AUCTION_PAGE}
      />
    </CustomCardWrapper>
  );
}

export default AuctionPage;
