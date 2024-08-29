import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  useGetContentQuery,
  useUpdateContentMutation,
} from '../../../Services/Api/module/pagescontent/index';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper/CustomCardWrapper';
import { CustomForm } from '../../../Shared/components/index';
import { CONTENT_ENUMS, STRINGS } from '../../../Shared/constants/index';
import PROFILE_OVERVIEW_FORM_SCHEMA from './helpers/constants';
import {
  ProfileOverviewFormData,
  transAPIRequestDataToFormProfileOverview,
  transformAPIRequestDataProfileOverview,
} from './helpers/transform';

function ProfileOverview() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetContentQuery({});
  const [updateContent] = useUpdateContentMutation({});

  useEffect(() => {
    if (content?.data?.[CONTENT_ENUMS.PROFILE_OVERVIEW]) {
      // Set initial form values
      const initialFormValues = transAPIRequestDataToFormProfileOverview(
        content.data[CONTENT_ENUMS.PROFILE_OVERVIEW]
      );
      setInitialValues(initialFormValues);
    }
  }, [content]);

  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = data as unknown as ProfileOverviewFormData;
    const payload = {
      [CONTENT_ENUMS.PROFILE_OVERVIEW]:
        transformAPIRequestDataProfileOverview(formData),
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
        formData={PROFILE_OVERVIEW_FORM_SCHEMA}
        className="row"
        id="ProfileOverview-form"
        onSubmit={onSubmit}
        defaultValues={initialValues}
        submitText={STRINGS.UPDATE_PROFILE_OVERVIEW}
      />
    </CustomCardWrapper>
  );
}

export default ProfileOverview;
