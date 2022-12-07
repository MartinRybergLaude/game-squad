import { useState } from "react";
import { Modal, Button, Group } from '@mantine/core';

interface SettingsModalViewProps {
  opened: boolean;
  onClose: () => void;
}

export default function SettingsModalView({ opened, onClose }: SettingsModalViewProps) {
  
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        closeOnClickOutside={true}
        closeOnEscape={true}
        title="Settings"
      >
        Modal without header, press escape or click on overlay to close
      </Modal>
    </>
  )
};