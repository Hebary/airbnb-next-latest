import { useRentModal } from "@/app/hooks";
import { Modal } from "."


const RentModal = () => {
    
    const rentModal = useRentModal();

    return (
        <Modal
            onClose = {rentModal.onClose}
            title={'Airbnb your home!'}
            isOpen={rentModal.isOpen}
            onSubmit={rentModal.onClose}
            actionLabel={'submit'}
            
        />

    )
}

export default RentModal

