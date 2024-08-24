import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/content/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import AddContentForm from '../../../Shared/components/form/AddContentForm/AddContentForm';
import { CustomForm } from '../../../Shared/components/index';
import {
  CONTENT_ENUMS,
  INPUT_TYPES,
  STRINGS,
} from '../../../Shared/constants/index';
import PRIVACY_POLICY_FORM_SCHEMA from './helpers/constant';
import {
  PrivacyPolicyData,
  transAPIRequestDataToFormPrivacyPolicy,
  transformAPIRequestDataPrivacyAndPolicy,
} from './helpers/transform';
import { AddContentFormItem } from '../../../Models/common';
import { isErrors } from '../../../Shared/utils/functions';

const initialState: AddContentFormItem = {
  title: '',
  content: '',
  moreInormationTitle: '',
  errors: {},
};

const fieldTypes = {
  content: INPUT_TYPES.TEXT,
};

const labels = {
  content: 'Privacy Policy Section Content',
};

function PrivacyPolicy() {
  const [privacyAndPolicySection, setPrivacyAndPolicy] = useState<
    AddContentFormItem[]
  >([initialState]);
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});

  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.PRIVACY_POLICY]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormPrivacyPolicy(
        content.data[CONTENT_ENUMS.PRIVACY_POLICY]
      );
      setInitialValues(initialFormValues);

      // Extract and set privacyAndPolicySection values
      const formGetData = content.data[
        CONTENT_ENUMS.PRIVACY_POLICY
      ]?.sections.map((section: string) => ({
        content: section,
      }));

      setPrivacyAndPolicy(formGetData || []);
    }
  }, [content]);

  const onSubmit = async (data: Record<string, unknown>) => {
    if (isErrors(privacyAndPolicySection, setPrivacyAndPolicy, labels)) return;
    const formData = data as unknown as PrivacyPolicyData;

    const mappedPrivacyAndPolicySection = privacyAndPolicySection.map(
      (item) => ({
        content: item.content || '',
      })
    );

    const payload = {
      [CONTENT_ENUMS.PRIVACY_POLICY]: transformAPIRequestDataPrivacyAndPolicy(
        formData,
        mappedPrivacyAndPolicySection
      ),
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
        formData={PRIVACY_POLICY_FORM_SCHEMA}
        id="privacy-policy-form"
        onSubmit={onSubmit}
        defaultValues={initialValues}
        submitText={STRINGS.UPDATE_PRIVACY_AND_POLICY}
        preSubmitElement={
          <AddContentForm
            content={privacyAndPolicySection || []}
            setContent={setPrivacyAndPolicy}
            types={fieldTypes}
            title="Privacy policy section"
            labels={labels}
            initialState={initialState}
          />
        }
      />
    </CustomCardWrapper>
  );
}

export default PrivacyPolicy;
