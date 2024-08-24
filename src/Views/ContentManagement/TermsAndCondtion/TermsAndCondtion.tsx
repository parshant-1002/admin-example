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
import TERMS_AND_CONDITIONS_FORM_SCHEMA from './helpers/constants';
import {
  TermsAndConditionsFormData,
  transAPIRequestDataToFormTermsAndConditions,
  transformAPIRequestDataTermsAndConditions,
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
  content: 'Terms And Condition Section Content',
};

function TermsAndCondtion() {
  const [termsAndConditionSection, setTermAndConditionSection] = useState<
    AddContentFormItem[]
  >([initialState]);
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});

  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.TERMS_AND_CONDITIONS]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormTermsAndConditions(
        content.data[CONTENT_ENUMS.TERMS_AND_CONDITIONS]
      );
      setInitialValues(initialFormValues);

      // Extract and set termsAndConditionSection values
      const formGetData = content.data[
        CONTENT_ENUMS.TERMS_AND_CONDITIONS
      ]?.sections.map((section: string) => ({
        content: section,
      }));

      setTermAndConditionSection(formGetData || []);
    }
  }, [content]);

  const onSubmit = async (data: Record<string, unknown>) => {
    if (isErrors(termsAndConditionSection, setTermAndConditionSection, labels))
      return;
    const formData = data as unknown as TermsAndConditionsFormData;

    const mappedRoadMap = termsAndConditionSection.map((item) => ({
      content: item.content || '',
    }));

    const payload = {
      [CONTENT_ENUMS.TERMS_AND_CONDITIONS]:
        transformAPIRequestDataTermsAndConditions(formData, mappedRoadMap),
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
        formData={TERMS_AND_CONDITIONS_FORM_SCHEMA}
        id="termsAndCondition-form"
        onSubmit={onSubmit}
        defaultValues={initialValues}
        submitText={STRINGS.UPDATE_TERMS_AND_CNDTN}
        preSubmitElement={
          <AddContentForm
            content={termsAndConditionSection || []}
            setContent={setTermAndConditionSection}
            title="terms an conditions section"
            types={fieldTypes}
            labels={labels}
            initialState={initialState}
          />
        }
      />
    </CustomCardWrapper>
  );
}

export default TermsAndCondtion;
