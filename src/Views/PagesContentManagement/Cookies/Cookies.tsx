import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import AddContentForm from '../../../Shared/components/form/AddContentForm/AddContentForm';
import { CustomForm } from '../../../Shared/components/index';
import {
  CONTENT_ENUMS,
  INPUT_TYPES,
  STRINGS,
} from '../../../Shared/constants/index';
import COOKIES_FORM_SCHEMA from './helpers/constants';
import {
  CookiesFormData,
  transAPIRequestDataToFormCookies,
  transformAPIRequestDataCookies,
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
  content: 'Cookies Section Content',
};

function Cookies() {
  const [cookiesSection, setCookiesSection] = useState<AddContentFormItem[]>([
    initialState,
  ]);
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});

  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.COOKIES]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormCookies(
        content.data[CONTENT_ENUMS.COOKIES]
      );
      setInitialValues(initialFormValues);

      // Extract and set cookiesSection values
      const formGetData = content.data[CONTENT_ENUMS.COOKIES]?.sections.map(
        (section: string) => ({
          content: section,
        })
      );

      setCookiesSection(formGetData || []);
    }
  }, [content]);

  const onSubmit = async (data: Record<string, unknown>) => {
    if (isErrors(cookiesSection, setCookiesSection, labels)) return;
    const formData = data as unknown as CookiesFormData;

    const mappedRoadMap = cookiesSection.map((item) => ({
      content: item.content || '',
    }));

    const payload = {
      [CONTENT_ENUMS.COOKIES]: transformAPIRequestDataCookies(
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
        formData={COOKIES_FORM_SCHEMA}
        id="cookies-form"
        onSubmit={onSubmit}
        defaultValues={initialValues}
        submitText={STRINGS.UPDATE_COOKIES}
        preSubmitElement={
          <AddContentForm
            content={cookiesSection || []}
            setContent={setCookiesSection}
            title="Cookies section"
            types={fieldTypes}
            labels={labels}
            initialState={initialState}
          />
        }
      />
    </CustomCardWrapper>
  );
}

export default Cookies;
