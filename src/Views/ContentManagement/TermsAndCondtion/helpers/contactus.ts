import { INPUT_TYPES } from "../../../../Shared/constants/index";
import FORM_VALIDATION_MESSAGES from "../../../../Shared/constants/validationMessages";

export const TERMS_AND_CONDITIONS_FORM_SCHEMA = {
    title: {
        type: INPUT_TYPES.TEXT,
        label: 'Title',
        className: 'col-md-12',
        placeholder: 'Title',
        schema: {
            required: FORM_VALIDATION_MESSAGES().REQUIRED,
            minLength: {
                value: 3,
                message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH
            }
        }
    },
    description: {
        type: INPUT_TYPES.TEXT,
        label: 'Description',
        className: 'col-md-12',
        placeholder: 'Terms and Conditions Description',
        schema: {
            required: FORM_VALIDATION_MESSAGES().REQUIRED,
            minLength: {
                value: 3,
                message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH
            }
        },
        addHorizontalLine: true,
    },
    moreInormationTitle: {
        type: INPUT_TYPES.TEXT,
        label: 'Terms and Conditions more Inormation Title',
        className: 'col-md-12',
        placeholder: 'Terms and Conditions more Inormation Title',
        schema: {
            required: FORM_VALIDATION_MESSAGES().REQUIRED,
            minLength: {
                value: 3,
                message: FORM_VALIDATION_MESSAGES(3).MIN_LENGTH
            }
        },
        addHorizontalLine: true,
    },
};
