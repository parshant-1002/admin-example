import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS, STRINGS } from '../../../Shared/constants/index';
import USER_PROFILE_SECTION_FORM_SCHEMA from './helpers/constants';
import {
  UserProfileSectionFormData,
  transAPIRequestDataToFormUserProfileSection,
  transformAPIRequestDataUserProfileSection,
} from './helpers/transform';

function UserProfileSection() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});

  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.USER_PROFILE_SECTION]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormUserProfileSection(
        content.data[CONTENT_ENUMS.USER_PROFILE_SECTION]
      );
      setInitialValues(initialFormValues);
    }
  }, [content]);

  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as UserProfileSectionFormData;
    const payload = {
      [CONTENT_ENUMS.USER_PROFILE_SECTION]:
        transformAPIRequestDataUserProfileSection(formData),
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
        formData={USER_PROFILE_SECTION_FORM_SCHEMA}
        className="row"
        id="UserProfileSection-form"
        onSubmit={onSubmit}
        defaultValues={initialValues}
        submitText={STRINGS.UPDATE_USER_PROFILE_SECTION}
      />
    </CustomCardWrapper>
  );
}

export default UserProfileSection;
