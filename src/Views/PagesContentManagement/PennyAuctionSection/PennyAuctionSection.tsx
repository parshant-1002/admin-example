import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS, STRINGS } from '../../../Shared/constants/index';
import PENNY_AUCTION_SECTION_FORM_SCHEMA from './helpers/constants';
import {
  PennyAuctionSectionFormData,
  transAPIRequestDataToFormPennyAuctionSection,
  transformAPIRequestDataPennyAuctionSection,
} from './helpers/transform';

function PennyAuctionSection() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});

  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.PENNY_AUCTION_SECTION]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormPennyAuctionSection(
        content.data[CONTENT_ENUMS.PENNY_AUCTION_SECTION]
      );
      setInitialValues(initialFormValues);
    }
  }, [content]);

  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as PennyAuctionSectionFormData;
    const payload = {
      [CONTENT_ENUMS.PENNY_AUCTION_SECTION]:
        transformAPIRequestDataPennyAuctionSection(formData),
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
        formData={PENNY_AUCTION_SECTION_FORM_SCHEMA}
        className="row"
        id="PennyAuctionSection-form"
        onSubmit={onSubmit}
        defaultValues={initialValues}
        submitText={STRINGS.UPDATE_PENNY_AUCTION_SECTION}
      />
    </CustomCardWrapper>
  );
}

export default PennyAuctionSection;
