import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS, STRINGS } from '../../../Shared/constants/index';
import CURRENT_BIDS_SEECTION_FORM_SCHEMA from './helpers/constants';
import {
  CurrentBidsSectionFormData,
  transAPIRequestDataToFormCurrentBidsSection,
  transformAPIRequestDataCurrentBidsSection,
} from './helpers/transform';

function CurrentBidsSection() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});

  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.CURRENT_BIDS_SECTION]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormCurrentBidsSection(
        content.data[CONTENT_ENUMS.CURRENT_BIDS_SECTION]
      );
      setInitialValues(initialFormValues);
    }
  }, [content]);

  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as CurrentBidsSectionFormData;
    const payload = {
      [CONTENT_ENUMS.CURRENT_BIDS_SECTION]:
        transformAPIRequestDataCurrentBidsSection(formData),
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
        formData={CURRENT_BIDS_SEECTION_FORM_SCHEMA}
        className="row"
        id="CurrentBidsSection-form"
        onSubmit={onSubmit}
        defaultValues={initialValues}
        submitText={STRINGS.UPDATE_CURRENT_BIDS_SECTION}
      />
    </CustomCardWrapper>
  );
}

export default CurrentBidsSection;
