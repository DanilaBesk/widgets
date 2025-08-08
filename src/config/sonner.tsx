import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { type ToasterProps, Toaster as SonnerToaster } from 'sonner';

const toastConfig: ToasterProps['toastOptions'] = {
  unstyled: false,
  closeButton: true,
  classNames: {
    error: 'notification-error',
    success: 'notification-success',
    warning: 'notification-warning',
    info: 'notification-info',
    icon: 'icon',
    closeButton: 'notification-close-button',
  },
};

const toastIcons: ToasterProps['icons'] = {
  success: <CheckCircle fontSize="32px" />,
  info: <Info fontSize="32px" />,
  warning: <AlertTriangle fontSize="32px" />,
  error: <AlertCircle fontSize="32px" />,
  close: <X fontSize="20px" />,
};

export const Toaster = () => {
  return (
    <SonnerToaster
      position="top-right"
      expand={true}
      richColors
      toastOptions={toastConfig}
      icons={toastIcons}
    />
  );
};
