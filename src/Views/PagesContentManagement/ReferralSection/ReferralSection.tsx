import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import {
  CONTENT_ENUMS,
  INPUT_TYPES,
  STRINGS,
} from '../../../Shared/constants/index';
import REFERRAL_SECTION_FORM_SCHEMA from './helpers/constants';
import {
  ReferralSectionFormData,
  transAPIRequestDataToFormReferralSection,
  transformAPIRequestDataReferralSection,
} from './helpers/transform';
import { AddContentFormItem } from '../../../Models/common';
import AddContentForm from '../../../Shared/components/form/AddContentForm/AddContentForm';
import { isErrors } from '../../../Shared/utils/functions';

const fieldTypes = {
  file: INPUT_TYPES.FILE_UPLOAD,
  title: INPUT_TYPES.TEXT,
};
const initialState: AddContentFormItem = {
  file: [{ fileURL: '', fileId: '' }],
  title: '',
  errors: {},
};
const labels = {
  file: ' icon',
  title: ' URL',
};
function ReferralSection() {
  const [socialConnectContent, setSocialConnectContent] = useState<
    AddContentFormItem[]
  >([initialState]);
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});

  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.REFERRAL_SECTION]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormReferralSection(
        content.data[CONTENT_ENUMS.REFERRAL_SECTION]
      );
      setInitialValues(initialFormValues);
      const formGetData = content.data[CONTENT_ENUMS.REFERRAL_SECTION][
        CONTENT_ENUMS.SOCIAL_CONNECT
      ]?.map(
        ({
          imageURL,
          url,
          fileId,
        }: {
          imageURL: string;
          url: string;
          fileId: string;
        }) => ({
          title: String(url),
          file: [{ fileURL: String(imageURL), fileId }],
        })
      );
      setSocialConnectContent(formGetData);
    }
  }, [content]);

  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      if (isErrors(socialConnectContent, setSocialConnectContent, labels))
        return;
      const formData = data as unknown as ReferralSectionFormData;
      const payload = {
        [CONTENT_ENUMS.REFERRAL_SECTION]:
          transformAPIRequestDataReferralSection(
            formData,
            socialConnectContent
          ),
      };

      await updateContent({
        payload,
        onSuccess: (res: { message: string }) => {
          toast.success(res.message);
          refetch();
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CustomCardWrapper>
      <CustomForm
        formData={REFERRAL_SECTION_FORM_SCHEMA}
        className="row"
        id="ReferralSection-form"
        onSubmit={onSubmit}
        defaultValues={initialValues}
        submitText={STRINGS.UPDATE_REFERRAL_SECTION}
        preSubmitElement={
          <AddContentForm
            content={socialConnectContent || []}
            setContent={setSocialConnectContent}
            types={fieldTypes}
            labels={labels}
            initialState={initialState}
            title="social contact"
          />
        }
      />
    </CustomCardWrapper>
  );
}

export default ReferralSection;
