// libs
import { SyntheticEvent, useMemo } from 'react';

// components
import { toast } from 'react-toastify';
import CustomForm from '../../Shared/components/form/CustomForm';

// consts
import { useGetCategorysQuery } from '../../Services/Api/module/category';
import { BUTTON_LABELS } from '../../Shared/constants';
import ERROR_MESSAGES from '../../Shared/constants/messages';
// import { addBaseUrl } from '../../Shared/utils/functions';

import { Category } from '../Products/helpers/model';
import {
  AUCTION_ADD_FORM_SCHEMA,
  AuctionPayload,
  Product,
} from './helpers/constants';

import {
  useAddAuctionMutation,
  useEditAuctionMutation,
} from '../../Services/Api/module/auction';

import { useGetProductsQuery } from '../../Services/Api/module/products';
import { AuctionResponsePayload } from './helpers/model';

interface ProductFormTypes {
  initialData: AuctionResponsePayload | null;
  isEdit: boolean;
  onAdd?: () => void;
  onEdit?: () => void;
}
type OptionType = { value: string; label: string };
type AuctionFormFieldType = number | string | OptionType | unknown;
// component
export default function AuctionForm({
  isEdit = false,
  initialData = {},
  onEdit = () => {},
  onAdd = () => {},
}: ProductFormTypes) {
  // hooks
  const [addAuction] = useAddAuctionMutation();
  const [editAuction] = useEditAuctionMutation();
  const { data: categoryList } = useGetCategorysQuery({ skip: 0 });
  const { data: productList } = useGetProductsQuery({ skip: 0 });

  const helperCatergoryMap = (data: []) => {
    return data.map((category: Category) => ({
      value: category?._id,
      label: category?.name,
    }));
  };
  const cateroryOptions = useMemo(
    () =>
      categoryList?.data?.map((category: Category) => ({
        value: category?._id,
        label: category?.name,
      })),
    [categoryList?.data]
  );
  const productOptions = useMemo(
    () =>
      productList?.data?.map((category: Product) => ({
        value: category?._id,
        label: category?.title,
      })),
    [productList?.data]
  );
  //   const dispatch = useDispatch();
  const onSuccess = (res: { message: string }) => {
    toast.success(res?.message);
    onAdd();
  };

  const onSubmit = async (
    data: Record<string, unknown>,
    event: SyntheticEvent,
    reset: () => void
  ) => {
    event.preventDefault();
    try {
      const auctionData = data as unknown as AuctionPayload;
      const payload = {
        description: data.description,
        productPrice: data.productPrice,
        turnTimer: data.turnTimer,
        prizeClaimDays: data.prizeClaimDays,
        reservePrice: data.reservePrice,
        title: data.title,
        preAuctionUsersCount: data.preAuctionUsersCount,
        // currentBidPrice: data.currentBidPrice,
        // images: auctionData?.images?.map((image) => ({
        //   url: addBaseUrl(image?.fileURL || image?.url),
        //   title: image?.fileName || image?.title,
        // })),
        // status: productData?.status?.value,
        categoryIds: auctionData?.categoryIds?.map(
          (category) => category?.value
        ),
        reserveWaitingEndDate: data.reserveWaitingEndDate,
        bidStartDate: data?.bidStartDate,
        status: 1,

        productId: auctionData?.productId.value,
      };
      if (isEdit) {
        const editPayload = { ...payload, auctionId: data?._id };
        await editAuction({
          payload: editPayload,
          onSuccess: (res: { message: string }) => {
            onSuccess(res);
            onEdit();
            reset();
          },
        });
        return;
      }
      await addAuction({
        payload,
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

  const handleStateChange = ({
    name,
    value,
    setValue,
  }: {
    name: string;
    value: AuctionFormFieldType;
    type: string;
    setValue: (name: string, value: unknown) => void;
    values?: Record<string, unknown>;
  }) => {
    if (name === 'productId') {
      const data = value as OptionType; // Type assertion
      const productDetails = productList.data.find(
        (element: Category) => element._id === data.value
      );
      if (productDetails) {
        setValue('categoryIds', helperCatergoryMap(productDetails.categories));
        setValue('description', productDetails.description);
        setValue('productPrice', productDetails.price);
      }
    }
  };

  return (
    <CustomForm
      id="products"
      className="row"
      formData={AUCTION_ADD_FORM_SCHEMA(
        cateroryOptions,
        productOptions,
        initialData
      )}
      handleStateDataChange={handleStateChange}
      onSubmit={onSubmit}
      defaultValues={
        initialData as unknown as Record<string, unknown> | undefined
      }
      submitText={isEdit ? BUTTON_LABELS.EDIT : BUTTON_LABELS.ADD}
    />
  );
}
