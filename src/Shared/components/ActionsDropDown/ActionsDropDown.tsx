import CustomDropDown from '../CustomDropDown';
import { Delete, actions, edit, view } from '../../../assets';

interface ActionsDropdownProps<T> {
  row: T;
  handleEdit: (row: T) => void;
  handleDelete: (row: T) => void;
  handleView: (row: T) => void;
}

function ActionsDropdown<T>({
  row,
  handleEdit,
  handleDelete,
  handleView,
}: ActionsDropdownProps<T>) {
  const submenu = [
    {
      buttonLabel: 'View',
      buttonAction: () => handleView(row),
      className: 'btn44 btn btn-primary',
      icon: view,
    },
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

  return <CustomDropDown toggleImage={actions} submenu={submenu} />;
}

export default ActionsDropdown;
