import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/content/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import AddContentForm from '../../../Shared/components/form/AddContentForm/AddContentForm';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS, INPUT_TYPES } from '../../../Shared/constants/index';
import { FAQ_CONTENT_FORM_SCHEMA } from './helpers/faqs';
import {
  FormData,
  RoadMapItem,
  transAPIRequestDataToFormFaq,
  transformAPIRequestDataFaq,
} from './helpers/transform';

const initialState: RoadMapItem = {
  title: '',
  content: '',
  companyLogo: '',
  errors: {},
};

const fieldTypes = {
  title: INPUT_TYPES.TEXT,
  content: INPUT_TYPES.TEXT,
};

const labels = {
  title: 'Add Faq Title',
  content: 'Add Faq Content',
};

const FaqsContent = () => {
  const [roadMap, setRoadMap] = useState<RoadMapItem[]>([initialState]);
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});

  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.LANDING_PAGE]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormFaq(
        content.data[CONTENT_ENUMS.LANDING_PAGE]
      );
      setInitialValues(initialFormValues);

      // Extract and set roadMap values
      const formGetData = content.data[CONTENT_ENUMS.LANDING_PAGE][CONTENT_ENUMS.FAQS]
        ?.map(({ question, answer }: { question: string, answer: string }) => ({
          title: String(question),
          content: String(answer)
        }));
        
      setRoadMap(formGetData);
    }
  }, [content]);

  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as FormData;

    const mappedRoadMap = roadMap.map((item) => ({
      question: item.title || '',
      answer: item.content || '',
    }));

    const payload = {
      [CONTENT_ENUMS.LANDING_PAGE]: transformAPIRequestDataFaq(
        formData,
        mappedRoadMap
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
        formData={FAQ_CONTENT_FORM_SCHEMA}
        id={'faqs-form'}
        onSubmit={onSubmit}
        defaultValues={initialValues}
        submitText="Update Faqs Content"
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

export default FaqsContent;
