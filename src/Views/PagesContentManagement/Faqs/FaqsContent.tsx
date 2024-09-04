import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import AddContentForm from '../../../Shared/components/form/AddContentForm/AddContentForm';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS, INPUT_TYPES } from '../../../Shared/constants/index';
import { isErrors } from '../../../Shared/utils/functions';
import {
  FAQ_SUB_ENUM,
  FormData,
  transAPIRequestDataToFormFaq,
  transformAPIRequestDataFaq,
} from './helpers/transform';
import { AddContentFormItem } from '../../../Models/common';
import FAQ_CONTENT_FORM_SCHEMA from './helpers/faqs';

const initialState: AddContentFormItem = {
  title: '',
  content: '',
  errors: {},
};

const fieldTypes = {
  title: INPUT_TYPES.TEXT,
  content: INPUT_TYPES.TEXT,
};

const labels: { title?: string; content?: string } = {
  title: 'Title',
  content: 'Content',
};

function FaqsContent() {
  const [faqCard, setFaqCard] = useState<AddContentFormItem[]>([initialState]);
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});

  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.FAQS_SECTION]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormFaq(
        content.data[CONTENT_ENUMS.FAQS_SECTION]
      );
      setInitialValues(initialFormValues);

      // Extract and set faqCard values
      const formGetData = content.data[CONTENT_ENUMS.FAQS_SECTION][
        FAQ_SUB_ENUM.FAQ
      ]?.map(({ question, answer }: { question: string; answer: string }) => ({
        title: String(question),
        content: String(answer),
      }));

      setFaqCard(formGetData);
    }
  }, [content]);

  const onSubmit = async (data: Record<string, unknown>) => {
    if (isErrors(faqCard, setFaqCard, labels)) return;
    const formData = data as unknown as FormData;

    const mappedRoadMap = faqCard.map((item) => ({
      question: item.title || '',
      answer: item.content || '',
    }));

    const payload = {
      [CONTENT_ENUMS.FAQS_SECTION]: transformAPIRequestDataFaq(
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
        id="faqs-form"
        onSubmit={onSubmit}
        defaultValues={initialValues}
        submitText="Update Faqs Content"
        preSubmitElement={
          <AddContentForm
            content={faqCard || []}
            setContent={setFaqCard}
            types={fieldTypes}
            title="Faq Card"
            labels={labels}
            initialState={initialState}
          />
        }
      />
    </CustomCardWrapper>
  );
}

export default FaqsContent;
