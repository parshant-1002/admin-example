import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CustomForm } from '../../../Shared/components';
import HEADER_CONTENT_FORM_SCHEMA from './helpers/headerSchema';

import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper';
import { CONTENT_ENUMS } from '../../../Shared/constants';
import {
  APIData,
  transformAPIData,
  transformAPIRequestData,
} from './helpers/transform';

function HeaderContent() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});

  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.HEADER]) {
      setInitialValues(
        transformAPIRequestData(content?.data?.[CONTENT_ENUMS.HEADER])
      );
    }
  }, [content]);

  const onSubmit = async (data: Record<string, unknown>) => {
    const payload = {
      [CONTENT_ENUMS.HEADER]: transformAPIData(data as unknown as APIData),
    };
    await updateContent({
      payload,
      onSuccess: (res: { message: string }) => {
        toast.success(res?.message);
        refetch();
      },
    });
  };

  return (
    <CustomCardWrapper>
      <CustomForm
        id="headers-content"
        formData={HEADER_CONTENT_FORM_SCHEMA}
        onSubmit={onSubmit}
        className="row"
        defaultValues={initialValues}
        submitText="Update Header Content"
      />
    </CustomCardWrapper>
  );
}

export default HeaderContent;
