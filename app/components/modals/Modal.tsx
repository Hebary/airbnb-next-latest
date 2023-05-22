'use client';


import { FC, useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { Button } from '../'


interface Props {
    isOpen               : boolean;
    onClose              : () => void;
    onSubmit             : () => void;
    title?               : string;
    body?                : React.ReactElement;
    footer?              : React.ReactElement; 
    actionLabel          : string;
    disabled?            : boolean;
    secondaryActionLabel?: string;
    secondaryAction?     : () => void;
}

const Modal: FC<Props> = ({ isOpen, onClose, onSubmit, title, body, footer, actionLabel, disabled, secondaryActionLabel, secondaryAction }) => {

    const [showModal, setShowModal] = useState(isOpen)
    
    useEffect(() => {
        setShowModal(isOpen)
    },[isOpen])

    const handleClose = useCallback(() => {
        if(disabled) return;

        //this is for the animation full apreciation
        setShowModal(false)
        setTimeout(() =>  onClose(), 300)
    },[disabled, onClose])

    
    const handleSubmit = useCallback(() => {
        if(disabled) return;
        onSubmit();
    },[disabled, onSubmit])

    
    
    const handleSecondaryAction = useCallback(() => {
        if(disabled || !secondaryAction) return;
        secondaryAction();

    },[disabled, secondaryAction])

    if(!isOpen) return null;
    

    return (
        <>
            <div className='flex justify-center md:py-5 items-center overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 backdrop-blur-sm'>
                <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 mx-auto h-full lg:h-auto md:h-auto scale-90'>
                    <div className={` translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'} `}>
                        <div className='translate h-auto rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                            {/* HEADER */}
                            <div className='flex items-center p-6 rounded-t justify-center relative border-b-[1px]'>
                                <button
                                    onClick = {handleClose}                                   
                                    className='p-1 border-0 rounded-full hover:bg-gray-200  hover:opacity-70 transition absolute left-9'>
                                    <IoMdClose size={18}/>
                                </button>

                                <div className='text-lg font-semibold'>
                                    { title }
                                </div>
                            </div>
                            {/* BODY */}
                            <div className='relative flex-auto p-6'>
                                { body }
                            </div>
                            {/* FOOTER */}
                            <div className='flex flex-col p-6 gap-2 '>
                                <div className='flex flex-row items-center gap-4 w-full'>
                                    { secondaryAction && secondaryActionLabel &&
                                        <Button 
                                            label={ secondaryActionLabel }
                                            disabled={ disabled }
                                            onClick={ handleSubmit }
                                            outline	
                                        />
                                    }
                                    <Button 
                                        label={ actionLabel }
                                        disabled={ disabled }
                                        onClick={ handleSubmit }	
                                    />
                                </div>
                                { footer }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal