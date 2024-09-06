import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS } from '../../../Shared/constants/index';
import LOGIN_SECTION_CONTENT from './helpers/constant';
import {
  LoginContentFormData,
  transAPIRequestDataToFormLoginContent,
  transformAPIRequestDataLoginContent,
} from './helpers/transform';

function LoginContent() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});
  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.LOGIN_CONTENT]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormLoginContent(
        content.data[CONTENT_ENUMS.LOGIN_CONTENT]
      );
      setInitialValues(initialFormValues);
      // Extract and set socialConnectContent values
    }
  }, [content]);
  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as LoginContentFormData;

    const payload = {
      [CONTENT_ENUMS.LOGIN_CONTENT]:
        transformAPIRequestDataLoginContent(formData),
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
        formData={LOGIN_SECTION_CONTENT}
        id="LoginContent-form"
        onSubmit={onSubmit}
        className="row"
        defaultValues={initialValues}
        submitText="Update Login Content"
      />
    </CustomCardWrapper>
  );
}

export default LoginContent;
