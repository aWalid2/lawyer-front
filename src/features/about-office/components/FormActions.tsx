import { CLASSES } from "../index";

const FormActions = () => {
    return (
        <div className="flex justify-start">
            <button
                type="submit"
                className={CLASSES.submitButton}
                style={{
                    background: "linear-gradient(135deg, #E3C086 0%, #CBA462 100%)",
                }}
            >
                <span className="relative z-10"> حفظ التعديلات</span>
                <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity bg-black"></div>
            </button>
        </div>
    );
};

export default FormActions;