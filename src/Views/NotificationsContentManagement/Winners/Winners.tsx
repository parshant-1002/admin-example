import { SyntheticEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CustomForm } from '../../../Shared/components';
import WINNER_FORM_SCHEMA from './helpers/Winners';

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

function Winners() {
  const [initialValues, setInitialValues] = useState({});
  const { data: content, refetch } = useGetNotificationContentQuery(
    {
      params: {
        type: NOTIFICATION_TYPE.WINNER,
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
      NOTIFICATION_TYPE.WINNER
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
        id={String(NOTIFICATION_TYPE.WINNER)}
        className="row"
        formData={WINNER_FORM_SCHEMA}
        onSubmit={onSubmit}
        defaultValues={initialValues}
        submitText={STRINGS.UPDATE_NOTIFICATION_CONTENT}
      />
    </CustomCardWrapper>
  );
}

export default Winners;
