import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS, STRINGS } from '../../../Shared/constants/index';
import PROFILE_PAGE_FORM_SCHEMA from './helpers/constants';
import {
  ProfilePageFormData,
  transAPIRequestDataToFormProfilePage,
  transformAPIRequestDataProfilePage,
} from './helpers/transform';

function ProfilePage() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});

  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.PROFILE_PAGE]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormProfilePage(
        content.data[CONTENT_ENUMS.PROFILE_PAGE]
      );
      setInitialValues(initialFormValues);
    }
  }, [content]);

  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as ProfilePageFormData;
    const payload = {
      [CONTENT_ENUMS.PROFILE_PAGE]:
        transformAPIRequestDataProfilePage(formData),
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
        formData={PROFILE_PAGE_FORM_SCHEMA}
        className="row"
        id="ProfilePage-form"
        onSubmit={onSubmit}
        defaultValues={initialValues}
        submitText={STRINGS.UPDATE_PROFILE_PAGE}
      />
    </CustomCardWrapper>
  );
}

export default ProfilePage;
