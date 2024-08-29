import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS, STRINGS } from '../../../Shared/constants/index';
import WALLET_SECTION_FORM_SCHEMA from './helpers/constants';
import {
  WalletSectionFormData,
  transAPIRequestDataToFormWalletSection,
  transformAPIRequestDataWalletSection,
} from './helpers/transform';

function WalletSection() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});

  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.WALLET_SECTION]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormWalletSection(
        content.data[CONTENT_ENUMS.WALLET_SECTION]
      );
      setInitialValues(initialFormValues);
    }
  }, [content]);

  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as WalletSectionFormData;
    const payload = {
      [CONTENT_ENUMS.WALLET_SECTION]:
        transformAPIRequestDataWalletSection(formData),
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
        formData={WALLET_SECTION_FORM_SCHEMA}
        className="row"
        id="WalletSection-form"
        onSubmit={onSubmit}
        defaultValues={initialValues}
        submitText={STRINGS.UPDATE_WALLET_SECTION}
      />
    </CustomCardWrapper>
  );
}

export default WalletSection;
