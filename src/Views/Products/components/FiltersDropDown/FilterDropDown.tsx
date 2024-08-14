import CustomDropDown from '../../../../Shared/components/CustomDropDown';
import { Filter } from '../../../../assets';

// interface FiltersDropDownProps {
//   handleEdit: (row: ProductResponsePayload) => void; // Replace `ProductResponsePayload` with the appropriate type for `row`
//   handleDelete: (row: ProductResponsePayload) => void; // Replace `any` with the appropriate type for `row`
// }

function FiltersDropDown() {
  const submenu = [
    { buttonLabel: 'Category', buttonAction: () => {} },
    {
      buttonLabel: 'Date Range',
      buttonAction: () => {},
    },
  ];

  return <CustomDropDown toggleImage={Filter} submenu={submenu} />;
}

export default FiltersDropDown;
