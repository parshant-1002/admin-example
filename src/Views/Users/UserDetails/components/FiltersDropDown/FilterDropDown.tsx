import CustomFilterIcons from '../../../../../Shared/components/CustomFilterIcons';

// interface FiltersDropDownProps {
//   handleEdit: (row: ProductResponsePayload) => void; // Replace `ProductResponsePayload` with the appropriate type for `row`
//   handleDelete: (row: ProductResponsePayload) => void; // Replace `any` with the appropriate type for `row`
// }

function FiltersDropDown() {
  const submenu = [
    {
      buttonLabel: 'Date Range',
      buttonAction: () => {},
    },
  ];

  return <CustomFilterIcons submenu={submenu} />;
}

export default FiltersDropDown;
