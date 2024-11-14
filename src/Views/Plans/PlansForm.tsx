// libs
import { SyntheticEvent } from 'react';

// components
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import CustomForm from '../../Shared/components/form/CustomForm';

// consts
import { useFileDeleteMutation } from '../../Services/Api/module/file';
import { CustomModal } from '../../Shared/components';
import { BUTTON_LABELS, STRINGS } from '../../Shared/constants/constants';
import ERROR_MESSAGES from '../../Shared/constants/messages';
import { RootState } from '../../Store';
import {
  deletedImages,
  updateUploadedImages,
} from '../../Store/UploadedImages';
import { PLANS_FORM_SCHEMA } from './helpers/constants';
import { PlanPayload } from './helpers/model';
import {
  useAddPlanMutation,
  useEditPlanMutation,
} from '../../Services/Api/module/plans';

interface PlansFormTypes {
  initialData: { _id?: string } | null;
  isEdit: boolean;
  onAdd?: () => void;
  onEdit?: () => void;
  // categoryOptions: SelectOption[];
  title: string;
  show: boolean;
  onClose: () => void;
}
// component
export default function PlansForm({
  isEdit = false,
  initialData = {},
  onEdit = () => {},
  onAdd = () => {},
  title = STRINGS.EMPTY_STRING,
  show = false,
  onClose = () => {},
}: Readonly<PlansFormTypes>) {
  // hooks
  const dispatch = useDispatch();
  const [addPlan] = useAddPlanMutation();
  const [editPlan] = useEditPlanMutation();
  const [fileDelete] = useFileDeleteMutation();
  const deletedFiles = useSelector(
    (state: RootState) => state?.UploadedImages?.deletedIds
  );
  const uploadedFiles = useSelector(
    (state: RootState) => state?.UploadedImages?.images
  );

  const deleteFiles = async () => {
    const fileIds = (deletedFiles ?? [])?.map(
      (file: { _id: string }) => file?._id
    );
    if (fileIds?.length) {
      await fileDelete({
        payload: { fileId: fileIds },

        onSuccess: () => {
          dispatch(deletedImages(null));
        },
      });
    }
  };
  const onSuccess = (res: { message: string }) => {
    toast.success(res?.message);
    onAdd();
    deleteFiles();
    dispatch(updateUploadedImages([]));
  };
  const onSubmit = async (
    data: Record<string, unknown>,
    event: SyntheticEvent,
    reset: () => void
  ) => {
    event.preventDefault();
    try {
      const planData = data as unknown as PlanPayload;
      if (isEdit) {
        const editPayload = { ...planData, id: data?._id };
        await editPlan({
          payload: editPayload,
          onSuccess: (res: { message: string }) => {
            onSuccess(res);
            onEdit();
            reset();
          },
        });
        return;
      }
      await addPlan({
        payload: planData,
        onSuccess,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(ERROR_MESSAGES().SOMETHING_WENT_WRONG);
      }
    }
  };
  const handleClose = () => {
    dispatch(
      updateUploadedImages([...(uploadedFiles ?? []), ...(deletedFiles ?? [])])
    );
    dispatch(deletedImages(null));
    onClose();
  };
  return (
    <CustomModal title={title} show={show} onClose={handleClose}>
      <CustomForm
        id="Plans"
        className="row"
        formData={PLANS_FORM_SCHEMA()}
        onSubmit={onSubmit}
        defaultValues={
          initialData as unknown as Record<string, unknown> | undefined
        }
        submitText={isEdit ? BUTTON_LABELS.EDIT : BUTTON_LABELS.ADD}
      />
    </CustomModal>
  );
}
