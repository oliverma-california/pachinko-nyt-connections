import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";

function BaseModal({
  title = "title",
  trigger = undefined,
  initiallyOpen = true,
  footerElements,
  children,
  actionButtonText = "Continue",
  showActionButton = true,
}) {
  const [isOpen, setIsOpen] = React.useState(initiallyOpen);

  React.useEffect(() => {
    setIsOpen(initiallyOpen);
  }, [initiallyOpen]);

  function handleCloseEvent() {
    setIsOpen(false);
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {!!trigger && <AlertDialogTrigger>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent
        className="border-transparent bg-[url('https://t4.ftcdn.net/jpg/01/84/26/95/360_F_184269531_YBEiKECRlGl0Y6Gnwhb2pB1lLhCD0cVO.jpg')]"
        handleMouseDownOnOverlay={handleCloseEvent}
        onEscapeKeyDown={handleCloseEvent}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="font-sedan-sc text-amber-900 text-2xl">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-amber-950 font-playfair">{children}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {footerElements}
          {showActionButton && (
            <AlertDialogAction onClick={() => setIsOpen(false)}>
              {actionButtonText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default BaseModal;
