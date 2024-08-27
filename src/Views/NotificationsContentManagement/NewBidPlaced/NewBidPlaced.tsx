import { SyntheticEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CustomForm } from '../../../Shared/components';
import NEW_BID_PLACED_FORM_SCHEMA from './helpers/newBidPlaced';

import {
  useGetNotificationContentQuery,
  useUpdateNotificationContentMutation,
} from '../../../Services/Api/module/notificationsContent';
import CustomCardWrapper from '../../../Shared/components/CustomCardWrapper';
import { NOTIFICATION_TYPE, STRINGS } from '../../../Shared/constants';
import {
  TransformedData,
  transformAPIData,
  transformAPIRequestData,
} from './helpers/transform';

function NewBidPlaced() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetNotificationContentQuery(
    {
      params: {
        type: NOTIFICATION_TYPE.NEW_BID_PLACED,
      },
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [updateContent] = useUpdateNotificationContentMutation({});

  useEffect(() => {
    if (content?.data) {
      setInitialValues(transformAPIData(content?.data));
    }
  }, [content]);

  const onSubmit = async (
    data: Record<string, unknown>,
    event: SyntheticEvent<Element, Event>
  ) => {
    event.preventDefault();
    const payload = transformAPIRequestData(
      data as unknown as TransformedData,
      NOTIFICATION_TYPE.NEW_BID_PLACED
    );

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
        id={String(NOTIFICATION_TYPE.NEW_BID_PLACED)}
        formData={NEW_BID_PLACED_FORM_SCHEMA}
        onSubmit={onSubmit}
        className="row"
        defaultValues={initialValues}
        submitText={STRINGS.UPDATE_NOTIFICATION_CONTENT}
      />
    </CustomCardWrapper>
  );
}

export default NewBidPlaced;
