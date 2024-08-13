// libs
import { SyntheticEvent } from 'react';

// components
import { toast } from 'react-toastify';
import CustomForm from '../../Shared/components/form/CustomForm';

// consts
import { ErrorResponse } from '../../Models/Apis/Error';
import { BUTTON_LABELS } from '../../Shared/constants';
import ERROR_MESSAGES from '../../Shared/constants/messages';
import { CATEGORIES_FORM_SCHEMA } from './helpers/constants';
import { CategoryPayload } from './helpers/model';
import {
  useAddCategoriesMutation,
  useEditCategoriesMutation,
} from '../../Services/Api/module/catgories';

interface CategoryFormTypes {
  initialData: object | null;
  isEdit: boolean;
  onAdd?: () => void;
  onEdit?: () => void;
}
// component
export default function CategoryForm({
  isEdit = false,
  initialData = {},
  onEdit = () => {},
  onAdd = () => {},
}: CategoryFormTypes) {
  // hooks
  const [addCategories] = useAddCategoriesMutation();
  const [editCategories] = useEditCategoriesMutation();

  //   const dispatch = useDispatch();
  const onSuccess = (res: { message: string }) => {
    toast.success(res?.message);
    onAdd();
  };
  const onFailure = (error: ErrorResponse) => {
    toast.success(error?.data?.message);
  };
  const onSubmit = async (
    data: Record<string, unknown>,
    event: SyntheticEvent,
    reset: () => void
  ) => {
    event.preventDefault();
    try {
      const categoryData = data as unknown as CategoryPayload;
      const payload = {
        name: categoryData?.name,
      };
      if (isEdit) {
        // payload.id = initialData?._id;
        const editPayload = { ...payload, categoryId: data?._id };
        await editCategories({
          payload: editPayload,
          onSuccess: (res: { message: string }) => {
            onSuccess(res);
            onEdit();
            reset();
          },
          onFailure,
        });
        return;
      }
      await addCategories({
        payload,
        onSuccess,
        onFailure,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(ERROR_MESSAGES().SOMETHING_WENT_WRONG);
      }
    }
  };
  return (
    <CustomForm
      id="categories"
      className="row"
      formData={CATEGORIES_FORM_SCHEMA}
      onSubmit={onSubmit}
      defaultValues={
        initialData as unknown as Record<string, unknown> | undefined
      }
      submitText={isEdit ? BUTTON_LABELS.EDIT : BUTTON_LABELS.ADD}
    />
  );
}
