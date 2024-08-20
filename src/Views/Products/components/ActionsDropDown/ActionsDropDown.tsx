import CustomFilterIcons from '../../../../Shared/components/CustomFilterIcons';
import { Delete, edit } from '../../../../assets';
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
    {
      buttonLabel: 'Edit',
      buttonAction: () => handleEdit(row),
      icon: edit,
      className: 'btn44 btn btn-primary',
    },
    {
      buttonLabel: 'Delete',
      buttonAction: () => handleDelete(row),
      icon: Delete,
      className: 'btn44 btn btn-danger',
    },
  ];

  return <CustomFilterIcons submenu={submenu} />;
}

export default ActionsDropdown;
