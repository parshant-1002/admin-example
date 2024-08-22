import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useGetContentQuery, useUpdateContentMutation } from '../../../Services/Api/module/content/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import AddContentForm from '../../../Shared/components/form/AddContentForm/AddContentForm';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS, INPUT_TYPES } from '../../../Shared/constants/index';
import { TERMS_AND_CONDITIONS_FORM_SCHEMA } from './helpers/contactus';
import {  RoadMapItem, TermsAndConditionsFormData, transAPIRequestDataToFormTermsAndConditions, transformAPIRequestDataTermsAndConditions } from './helpers/transform';

const initialState: RoadMapItem = {
  title: '',
  content: '',
  companyLogo: '',
  moreInormationTitle:'',
  errors: {}
};

const fieldTypes = {
  content: INPUT_TYPES.TEXT,
};

const labels = {
  content: 'Add Terms And Condition Section Content',
};

const TermsAndCondtion = () => {
  const [roadMap, setRoadMap] = useState<RoadMapItem[]>([initialState]);
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});

  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.TERMS_AND_CONDITIONS]) {
        // Set initial form values
        const initialFormValues = transAPIRequestDataToFormTermsAndConditions(content.data[CONTENT_ENUMS.TERMS_AND_CONDITIONS]);
        setInitialValues(initialFormValues);

        // Extract and set roadMap values
        const formGetData = content.data[CONTENT_ENUMS.TERMS_AND_CONDITIONS]
            ?.sections.map((section: string) => ({
                content: section
            }));
        
        setRoadMap(formGetData || []);
    }
}, [content]);
  

  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as TermsAndConditionsFormData;

    const mappedRoadMap = roadMap.map(item => ({
        content: item.content || ''
    }));
  
    const payload = {
        [CONTENT_ENUMS.TERMS_AND_CONDITIONS]: transformAPIRequestDataTermsAndConditions(formData, mappedRoadMap),
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
        id={'termsAndCondition-form'}
        onSubmit={onSubmit}
        defaultValues={initialValues}
        submitText="Update Terms And Condtion Content"
        preSubmitElement={
          <AddContentForm
            roadMap={roadMap || []}
            setRoadMap={setRoadMap}
            types={fieldTypes}
            labels={labels}
            initialState={initialState}
          />
        }
      />
    </CustomCardWrapper>
  );
};

export default TermsAndCondtion;
