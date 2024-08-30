// libs
import { SyntheticEvent, useMemo, useState } from 'react';

// components
import { useDispatch, useSelector } from 'react-redux';
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

import { useFileDeleteMutation } from '../../Services/Api/module/file';
import { useGetProductsQuery } from '../../Services/Api/module/products';
import { CustomModal } from '../../Shared/components';
import { addBaseUrl } from '../../Shared/utils/functions';
import { RootState } from '../../Store';
import {
  deletedImages,
  updateUploadedImages,
} from '../../Store/UploadedImages';
import { PRODUCT_AVAILABILITY_STATUS } from '../Products/helpers/constants';
import { AuctionResponsePayload } from './helpers/model';

interface ProductFormTypes {
  initialData: AuctionResponsePayload | null;
  isEdit: boolean;
  onAdd?: () => void;
  onEdit?: () => void;
  title: string;
  show: boolean;
  onClose: () => void;
}
type OptionType = { value: string; label: string };
type AuctionFormFieldType = number | string | OptionType | unknown;
// component
export default function AuctionForm({
  isEdit = false,
  initialData = {},
  onEdit = () => {},
  onAdd = () => {},
  title = '',
  show = false,
  onClose = () => {},
}: ProductFormTypes) {
  // hooks
  const dispatch = useDispatch();
  const [addAuction] = useAddAuctionMutation();
  const [editAuction] = useEditAuctionMutation();
  const [selectedProductDetails, setSelectedProductDetails] = useState({
    _id: '',
  });
  const { data: categoryList } = useGetCategorysQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const { data: productList } = useGetProductsQuery(
    {
      params: { status: PRODUCT_AVAILABILITY_STATUS.AVAILABLE },
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
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
  const [fileDelete] = useFileDeleteMutation();
  const deletedFiles = useSelector(
    (state: RootState) => state?.UploadedImages?.deletedIds
  );
  const uploadedFiles = useSelector(
    (state: RootState) => state?.UploadedImages?.images
  );

  const deleteFiles = async () => {
    const fileIds = (deletedFiles || [])?.map(
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
  //   const dispatch = useDispatch();
  const onSuccess = (res: { message: string }) => {
    toast.success(res?.message);
    onAdd();
    dispatch(updateUploadedImages([]));
    deleteFiles();
  };

  const onSubmit = async (
    data: Record<string, unknown>,
    event: SyntheticEvent,
    reset: () => void
  ) => {
    event.preventDefault();
    console.log({ data });

    try {
      const auctionData = data as unknown as AuctionPayload;
      const payload = {
        description: data.description,
        productPrice: data.productPrice,
        bidDuration: data.bidDuration,
        prizeClaimDays: data.prizeClaimDays,
        reservePrice: data.reservePrice,
        title: data.title,
        preAuctionUsersCount: data.preAuctionUsersCount,
        enabledSocialMediaPlatforms: data.enabledSocialMediaPlatforms,
        socialMediaShareReward: data.socialMediaShareReward,
        // currentBidPrice: data.currentBidPrice,
        images: auctionData?.images?.map((image) => ({
          url: addBaseUrl(image?.fileURL || image?.url),
          title: image?.fileName || image?.title,
          fileId: image?.fileId || image?._id,
          assigned: image?.assigned,
        })),
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
        setValue('images', productDetails?.images);
        setSelectedProductDetails(productDetails);
      }
    }
  };
  const handleClose = () => {
    dispatch(
      updateUploadedImages([...(uploadedFiles || []), ...(deletedFiles || [])])
    );
    dispatch(deletedImages(null));
    onClose();
  };
  return (
    <CustomModal title={title} show={show} onClose={handleClose}>
      <CustomForm
        id="products"
        className="row"
        formData={AUCTION_ADD_FORM_SCHEMA(
          cateroryOptions,
          productOptions,
          initialData,
          isEdit,
          selectedProductDetails
        )}
        handleStateDataChange={handleStateChange}
        onSubmit={onSubmit}
        defaultValues={
          initialData as unknown as Record<string, unknown> | undefined
        }
        submitText={isEdit ? BUTTON_LABELS.EDIT : BUTTON_LABELS.ADD}
      />
    </CustomModal>
  );
}
