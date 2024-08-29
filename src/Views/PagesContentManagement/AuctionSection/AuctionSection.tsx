import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS, STRINGS } from '../../../Shared/constants/index';
import AUCTION_SECTION_FORM_SCHEMA from './helpers/constants';
import {
  AuctionSectionFormData,
  transAPIRequestDataToFormAuctionSection,
  transformAPIRequestDataAuctionSection,
} from './helpers/transform';

function AuctionSection() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});

  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.AUCTION_SECTION]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormAuctionSection(
        content.data[CONTENT_ENUMS.AUCTION_SECTION]
      );
      setInitialValues(initialFormValues);
    }
  }, [content]);

  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as AuctionSectionFormData;
    const payload = {
      [CONTENT_ENUMS.AUCTION_SECTION]:
        transformAPIRequestDataAuctionSection(formData),
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
        formData={AUCTION_SECTION_FORM_SCHEMA}
        className="row"
        id="AuctionSection-form"
        onSubmit={onSubmit}
        defaultValues={initialValues}
        submitText={STRINGS.UPDATE_AUCTION_SECTION}
      />
    </CustomCardWrapper>
  );
}

export default AuctionSection;
