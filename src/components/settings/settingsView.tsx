import { useState } from "react";
import { Modal, Button, Group } from '@mantine/core';

interface SettingsViewProps {
    showSettingsModal: boolean;
    setShowSettingsModal: any;
}


export function SettingsModal( {showSettingsModal, setShowSettingsModal}: SettingsViewProps) {
    return (
        <>
            <Modal
                opened={showSettingsModal}
                onClose={setShowSettingsModal}
                closeOnClickOutside={true}
                closeOnEscape={true}
                title="Settings"
            >
                Modal without header, press escape or click on overlay to close
            </Modal>
        </>
    )
};