import CustomModal from '../../../../Shared/components/CustomModal';
import { REFERRAL_PACK_SCHEMA } from '../../helpers/constants';
import CustomForm from '../../../../Shared/components/form/CustomForm';
import { POPUPTYPES, STRINGS } from '../../../../Shared/constants';

function AddEditReferralPack({
  open = false,
  onClose = () => {},
  type,
  initialValues = {},
  handleSubmit = () => {},
}: {
  open: boolean;
  onClose: () => void;
  type: POPUPTYPES;
  initialValues?: Record<string, unknown> | null;
  handleSubmit?: (data: Record<string, unknown>) => void;
}) {
  const onSubmit = (data: Record<string, unknown>) => {
    handleSubmit(data);
  };

  return (
    <CustomModal
      title={
        type === POPUPTYPES.EDIT
          ? STRINGS.EDIT_REFERRAL_PACK
          : STRINGS.ADD_REFERRAL_PACK
      }
      show={open}
      onClose={onClose}
    >
      <CustomForm
        id="referralPack"
        className="row p-4"
        formData={REFERRAL_PACK_SCHEMA}
        onSubmit={onSubmit}
        defaultValues={
          initialValues
            ? (initialValues as unknown as Record<string, unknown> | undefined)
            : {}
        }
        submitText={type === POPUPTYPES.EDIT ? STRINGS.UPDATE : STRINGS.ADD}
      />
    </CustomModal>
  );
}

export default AddEditReferralPack;
