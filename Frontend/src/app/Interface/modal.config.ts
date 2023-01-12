

export interface ModalProperties {
    modalTitle?: string
    modalHeader?:string
    dismissButtonLabel?: string
    deleteButtonLabel?: string
    addButtonLabel?: string
    updateButtonLabel?: string
    closeButtonLabel?: string 
    cancelButtonLabel?: string
    backdrop?: boolean|'static';
    centered?: boolean;
    scrollable?: boolean;
    size?: string;
    animation?:boolean;
}
