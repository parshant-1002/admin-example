import CustomDropDown from '../../../../Shared/components/CustomDropDown';
import { actions } from '../../../../assets';
import { ProductResponsePayload } from '../../helpers/model';

interface ActionsDropdownProps {
  row: ProductResponsePayload; // Replace `any` with the appropriate type for `row`
  handleEdit: (row: ProductResponsePayload) => void; // Replace `ProductResponsePayload` with the appropriate type for `row`
  handleDelete: (row: ProductResponsePayload) => void; // Replace `any` with the appropriate type for `row`
}

function ActionsDropdown({
  row,
  handleEdit,
  handleDelete,
}: ActionsDropdownProps) {
  const submenu = [
    { buttonLabel: 'Edit', buttonAction: () => handleEdit(row) },
    {
      buttonLabel: 'Delete',
      buttonAction: () => handleDelete(row),
      className: 'text-danger',
    },
  ];

  return <CustomDropDown toggleImage={actions} submenu={submenu} />;
}

export default ActionsDropdown;
