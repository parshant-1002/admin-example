import CustomDropDown from '../../../../Shared/components/CustomDropDown';
import { Delete, actions, block, view } from '../../../../assets';
import { UsersResponsePayload } from '../../helpers/model';
import './style.scss';

interface ActionsDropdownProps {
  row: UsersResponsePayload; // Replace `any` with the appropriate type for `row`
  handleDelete: (row: UsersResponsePayload) => void; // Replace `any` with the appropriate type for `row`
  handleBlock: (row: UsersResponsePayload) => void; // Replace `any` with the appropriate type for `row`
  handleView: (row: UsersResponsePayload) => void;
}

function ActionsDropdown({
  row,
  handleDelete,
  handleBlock,
  handleView,
}: ActionsDropdownProps) {
  const submenu = [
    {
      buttonLabel: 'View',
      buttonAction: () => handleView(row),
      className: 'btn44 btn btn-primary',
      icon: view,
    },
    {
      buttonLabel: row?.isBlocked ? 'UnBlock' : 'Block',
      buttonAction: () => handleBlock(row),
      className: row?.isBlocked
        ? 'btn44 btn btn-danger'
        : 'btn44 btn btn-primary',
      icon: block,
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
